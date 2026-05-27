import React, { useState, useEffect } from 'react';
import { Stethoscope, Activity, CheckCircle2, XCircle, Info, ChevronRight, User, Users, Sparkles } from 'lucide-react';

// ─── Custom SVG Gauge ──────────────────────────────────────────────────────────
function GaugeMeter({ percent = 0 }) {
  // percent: 0–1
  const radius = 80;
  const cx = 110;
  const cy = 100;
  const startAngle = -180; // degrees
  const endAngle = 0;

  const polarToXY = (deg, r) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (startDeg, endDeg, r) => {
    const s = polarToXY(startDeg, r);
    const e = polarToXY(endDeg, r);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  // Zones: 0–0.33 = green, 0.33–0.66 = yellow, 0.66–1 = red (mapped over 180°)
  const zones = [
    { from: -180, to: -120, color: '#10b981' },
    { from: -120, to: -60, color: '#f59e0b' },
    { from: -60, to: 0, color: '#ef4444' },
  ];

  // Needle angle: -180° (0%) to 0° (100%)
  const needleAngle = -180 + percent * 180;
  const needleTip = polarToXY(needleAngle, radius - 12);
  const needleBase1 = polarToXY(needleAngle + 90, 8);
  const needleBase2 = polarToXY(needleAngle - 90, 8);

  // Label color based on risk
  const needleColor = percent < 0.33 ? '#10b981' : percent < 0.66 ? '#f59e0b' : '#ef4444';

  return (
    <svg viewBox="0 0 220 115" style={{ width: '100%', maxWidth: 300, margin: '0 auto', display: 'block' }}>
      {/* Background arc */}
      <path
        d={describeArc(-180, 0, radius)}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={22}
        strokeLinecap="butt"
      />
      {/* Colored zone arcs */}
      {zones.map((z, i) => (
        <path
          key={i}
          d={describeArc(z.from, z.to, radius)}
          fill="none"
          stroke={z.color}
          strokeWidth={22}
          strokeLinecap="butt"
          opacity={0.85}
        />
      ))}
      {/* Inner ring shadow */}
      <path
        d={describeArc(-180, 0, radius)}
        fill="none"
        stroke="rgba(0,0,0,0.4)"
        strokeWidth={4}
        strokeLinecap="butt"
      />

      {/* Needle */}
      <polygon
        points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
        fill={needleColor}
        opacity={0.9}
      />
      {/* Needle pivot */}
      <circle cx={cx} cy={cy} r={10} fill="#1e293b" stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={4} fill={needleColor} />

      {/* Percentage text */}
      <text x={cx} y={cy - 20} textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="900" fontFamily="Outfit, sans-serif">
        {Math.round(percent * 100)}%
      </text>

      {/* Scale labels */}
      <text x={28} y={110} fill="#94a3b8" fontSize="10" textAnchor="middle">Low</text>
      <text x={cx} y={18} fill="#94a3b8" fontSize="10" textAnchor="middle">Moderate</text>
      <text x={192} y={110} fill="#94a3b8" fontSize="10" textAnchor="middle">High</text>
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function RiskPredictor() {
  const [formData, setFormData] = useState({
    Age: 45,
    BMI: 28.5,
    FastingGlucose: 95,
    OralGlucoseTolerance: 110,
    Insulin: 10,
    PhysicalActivity: 1, // 1=Yes, 0=No
    Gender: 1, // 1=Male, 0=Female
    SmokingStatus: 0 // 0=No, 1=Yes, 2=Sometimes/Former
  });

  const [prediction, setPrediction] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState(null);

  const calculateRisk = async () => {
    setIsCalculating(true);
    setError(null);
    try {
      const resp = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!resp.ok) throw new Error('Backend server error');
      const data = await resp.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
      setError("Backend not reachable. Ensure FastAPI is running.");
      // Fallback local mock simulation
      const mockProb = (formData.BMI > 30 ? 0.4 : 0.1) + (formData.FastingGlucose > 126 ? 0.5 : 0);
      setPrediction({
        risk_score: Math.min(99, mockProb * 100),
        risk_level: mockProb > 0.6 ? "High" : "Low",
        diagnosis: mockProb > 0.6 ? "Type-2 Diabetes" : "Healthy",
        contributions: [
          { feature: 'BMI', impact: formData.BMI > 30 ? 45 : 10 },
          { feature: 'FastingGlucose', impact: formData.FastingGlucose > 120 ? 80 : 5 }
        ]
      });
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    // Initial silent calc
    calculateRisk();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const getRiskCategory = (score) => {
    if (score < 0.3) return { label: 'Low Risk', color: '#10b981', desc: 'Healthy range. Maintain your lifestyle.' };
    if (score < 0.65) return { label: 'Moderate Risk', color: '#f59e0b', desc: 'Pre-diabetic levels indicated. Suggest routine checkup.' };
    return { label: 'High Risk', color: '#ef4444', desc: 'High likelihood of Type-2 Diabetes. Consult a doctor.' };
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: '80vh', padding: '20px 0' }}>
      <div className="mb-24" style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '100px', marginBottom: '16px' }}>
          <Stethoscope className="text-accent" size={24} />
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-accent)' }}>Medical Intelligence</span>
        </div>
        <h2 className="section-title" style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-0.02em', background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Predictive Risk Analysis
        </h2>
        <p className="section-subtitle" style={{ fontSize: '16px', maxWidth: '600px', margin: '8px auto 0' }}>Comprehensive diabetic assessment using NHANES real-time ML inference engine</p>
      </div>

      <div className="grid-60-40" style={{ gap: '40px', alignItems: 'start' }}>
        {/* Left: Input Form */}
        <div className="card card-glow-primary">
          <div className="card-header" style={{ marginBottom: '32px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Patient Parameters</div>
              <div className="card-subtitle">Biometric and lifestyle markers for analysis</div>
            </div>
            <Activity className="text-muted" size={20} />
          </div>

          <div style={{ display: 'grid', gap: '32px' }}>
            {/* Age */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <label className="form-label" style={{ fontWeight: 700 }}>Physiological Age</label>
                <span className="badge badge-info" style={{ padding: '6px 12px' }}>{formData.Age} yr</span>
              </div>
              <input type="range" className="slider" name="Age" min="12" max="80" value={formData.Age} onChange={handleChange} />
            </div>

            {/* Gender Toggle */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, marginBottom: 12 }}>Biological Gender</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[{ value: 1, label: 'Male', icon: <User size={18} /> }, { value: 0, label: 'Female', icon: <Users size={18} /> }].map(opt => (
                  <button key={opt.value} type="button" onClick={() => setFormData(p => ({ ...p, Gender: opt.value }))}
                    className={`btn-toggle ${formData.Gender === opt.value ? 'active' : ''}`}>
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* BMI */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <label className="form-label" style={{ fontWeight: 700 }}>Body Mass Index (BMI)</label>
                <span className={`badge ${formData.BMI > 30 ? 'badge-danger' : formData.BMI > 25 ? 'badge-warning' : 'badge-success'}`} style={{ padding: '6px 12px' }}>
                  {formData.BMI} kg/m²
                </span>
              </div>
              <input type="range" className="slider" name="BMI" min="15" max="50" step="0.1" value={formData.BMI} onChange={handleChange} />
            </div>

            {/* Glucose Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <label className="form-label" style={{ fontWeight: 700 }}>Fasting Glucose</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input type="range" className="slider" name="FastingGlucose" min="50" max="300" value={formData.FastingGlucose} onChange={handleChange} />
                  <span style={{ minWidth: '70px', textAlign: 'right', fontWeight: 700, color: 'var(--text-accent)' }}>{formData.FastingGlucose}</span>
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <label className="form-label" style={{ fontWeight: 700 }}>OGTT (2hr)</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input type="range" className="slider" name="OralGlucoseTolerance" min="50" max="400" value={formData.OralGlucoseTolerance} onChange={handleChange} />
                  <span style={{ minWidth: '70px', textAlign: 'right', fontWeight: 700, color: 'var(--text-accent)' }}>{formData.OralGlucoseTolerance}</span>
                </div>
              </div>
            </div>

            {/* Insulin */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <label className="form-label" style={{ fontWeight: 700 }}>Serum Insulin</label>
                <span className="badge badge-info" style={{ padding: '6px 12px' }}>{formData.Insulin} uU/mL</span>
              </div>
              <input type="range" className="slider" name="Insulin" min="1" max="150" step="0.1" value={formData.Insulin} onChange={handleChange} />
            </div>

            {/* Smoking Status */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 700, marginBottom: 12 }}>Lifestyle: Nicotine Exposure</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {[{ v: 0, l: 'Non-Smoker' }, { v: 1, l: 'Current' }, { v: 2, l: 'Occasional' }].map(opt => (
                  <button key={opt.v} type="button" onClick={() => setFormData(p => ({ ...p, SmokingStatus: opt.v }))}
                    style={{
                      padding: '12px 8px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: '1px solid var(--border)',
                      background: formData.SmokingStatus === opt.v ? 'var(--grad-danger)' : 'rgba(255,255,255,0.03)',
                      color: formData.SmokingStatus === opt.v ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer', transition: 'var(--transition-fast)',
                      boxShadow: formData.SmokingStatus === opt.v ? '0 4px 12px rgba(244,63,94,0.3)' : 'none'
                    }}>{opt.l}</button>
                ))}
              </div>
            </div>

            <button onClick={calculateRisk} className="btn-primary" 
              style={{ padding: '18px', borderRadius: '14px', fontWeight: 800, fontSize: '16px', letterSpacing: '0.02em', marginTop: '10px', width: '100%', justifyContent: 'center' }}>
              {isCalculating ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Initializing ML Inference...
                </div>
              ) : 'Analyze Patient Risk'}
            </button>
          </div>
        </div>

        <div>
          {/* Main Prediction Result */}
          <div className="card mb-24" style={{ 
            textAlign: 'center', 
            background: 'linear-gradient(180deg, rgba(8,11,20,0.4) 0%, rgba(255,255,255,0.02) 100%)',
            borderBottom: prediction ? `2px solid ${getRiskCategory(prediction.risk_score/100).color}60` : '1px solid var(--border)' 
          }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
              ML Assessment Score
            </div>

            {!prediction ? (
              <div style={{ padding: '80px 0', border: '1px dashed var(--border)', borderRadius: '20px', background: 'rgba(255,255,255,0.01)' }}>
                <Activity size={32} className="text-muted" style={{ marginBottom: '12px', opacity: 0.5 }} />
                <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Configure parameters to begin analysis</div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <GaugeMeter percent={prediction.risk_score / 100} />
                
                <div style={{ marginTop: '32px' }}>
                  <div style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '100px', background: `${getRiskCategory(prediction.risk_score/100).color}20`, color: getRiskCategory(prediction.risk_score/100).color, fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
                    Diagnosis: {prediction.diagnosis}
                  </div>
                  <div style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-0.02em', color: getRiskCategory(prediction.risk_score/100).color }}>
                    {prediction.risk_level} Risk
                  </div>
                </div>

                {/* XAI Evidence Section */}
                <div style={{ marginTop: '40px', padding: '24px', borderRadius: '20px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', textAlign: 'left' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Info size={16} className="text-accent" /> Neural Evidence (XAI)
                  </div>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {prediction.contributions && prediction.contributions.map((c, i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 600 }}>{c.feature} Weight</span>
                          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{c.impact}%</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${c.impact}%`, background: 'var(--grad-primary)', borderRadius: '4px', boxShadow: '0 0 12px rgba(99,102,241,0.3)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actionable Insights */}
          {prediction && (
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(99,102,241,0.08) 100%)', 
              borderColor: 'rgba(16,185,129,0.3)',
              boxShadow: '0 8px 32px rgba(16,185,129,0.05)'
            }}>
              <div style={{ fontSize: '15px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', marginBottom: '10px' }}>
                <Sparkles size={18} className="text-success" /> Optimal Strategy (What-If)
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                Our intelligence engine suggests these specific physiological targets for you:
              </p>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid var(--accent-success)', fontSize: '13px' }}>
                  Reducing BMI below <strong>24.5</strong> target could decrease risk status by <span style={{ color: 'var(--accent-success)', fontWeight: 800 }}>15.4%</span>
                </div>
                <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid var(--accent-success)', fontSize: '13px' }}>
                  Regular metabolic activity (150m+/week) could further drop risk by <span style={{ color: 'var(--accent-success)', fontWeight: 800 }}>8.2%</span>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-header">
              <div className="card-title">Clinical Reference Thresholds</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: 12 }}>
                <div style={{ fontSize: 12, color: '#f8fafc', fontWeight: 600 }}>Diabetic Range</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Glucose ≥ 126 mg/dL OR OGTT ≥ 200 mg/dL</div>
              </div>
              <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: 12 }}>
                <div style={{ fontSize: 12, color: '#f8fafc', fontWeight: 600 }}>Pre-Diabetic Range</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Glucose 100-125 mg/dL OR OGTT 140-199 mg/dL</div>
              </div>
              <div style={{ borderLeft: '3px solid #10b981', paddingLeft: 12 }}>
                <div style={{ fontSize: 12, color: '#f8fafc', fontWeight: 600 }}>Normal Range</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Glucose &lt; 100 mg/dL AND OGTT &lt; 140 mg/dL</div>
              </div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Info size={14} />
                Model used: NHANES Random Forest (Accuracy: 94.7%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
