import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Users, Activity, AlertTriangle, TrendingUp, TrendingDown, 
  Trophy, CheckCircle2, ChevronUp, ChevronDown 
} from 'lucide-react';
import { statsCards, monthlyTrend, riskDistribution, modelAccuracy, recentPredictions } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
        <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
            {p.name}: {typeof p.value === 'number' && p.value > 99 ? p.value.toLocaleString() : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RiskBadge = ({ risk }) => {
  const map = {
    High:     { cls: 'badge-danger',   label: 'High Risk' },
    Moderate: { cls: 'badge-warning',  label: 'Moderate' },
    Low:      { cls: 'badge-success',  label: 'Low Risk' },
  };
  const b = map[risk] || map.Low;
  return (
    <span className={`badge ${b.cls}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
      {b.label}
    </span>
  );
};

export default function Dashboard() {
  return (
    <div className="animate-fade-in" style={{ padding: '20px 0' }}>
      {/* Header */}
      <div className="mb-32" style={{ textAlign: 'left' }}>
        <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          System <span style={{ color: 'var(--accent-primary)' }}>Integrity</span> Dashboard
        </h2>
        <p className="section-subtitle" style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Real-time synthesis of clinical prediction telemetry and neural model performance
        </p>
      </div>

      {/* KPI Stat Cards */}
      <div className="stat-cards-grid mb-24" style={{ gap: '20px' }}>
        {statsCards.map((s, i) => (
          <div key={i} className={`card animate-fade-in stagger-${i + 1}`} style={{ padding: '24px', borderBottom: `2px solid var(--accent-${s.color === 'primary' ? 'primary' : s.color})` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div className={`stat-icon ${s.color}`} style={{ width: '48px', height: '48px', borderRadius: '14px', background: s.color === 'primary' ? 'rgba(99,102,241,0.1)' : `rgba(var(--accent-${s.color}), 0.1)` }}>
                {s.color === 'primary' && <Users size={22} color="var(--accent-primary)" />}
                {s.color === 'danger'  && <Activity size={22} color="var(--accent-danger)" />}
                {s.color === 'warning' && <AlertTriangle size={22} color="var(--accent-warning)" />}
                {s.color === 'success' && <TrendingUp size={22} color="var(--accent-success)" />}
              </div>
              <div className={`stat-change ${s.up ? 'up' : 'down'}`} style={{ fontSize: '12px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: s.up ? 'rgba(52,211,153,0.1)' : 'rgba(244,63,94,0.1)' }}>
                {s.up ? <ChevronUp size={14} /> : <ChevronDown size={14} />} 
                {s.change}
              </div>
            </div>
            <div className="stat-value" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</div>
            <div className="stat-label" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid-60-40 mb-24">
        {/* Trend Chart */}
        <div className="card shadow-glow">
          <div className="card-header" style={{ marginBottom: '32px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Prediction Trajectory</div>
              <div className="card-subtitle">Temporal analysis of high-risk vs normal outcomes</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-primary">Q1 2024</span>
              <span className="badge badge-success">Live Data</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="gradDiabetic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-danger)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent-danger)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gradNormal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-success)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent-success)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
              <Area type="monotone" dataKey="diabetic" name="Critical Risk" stroke="var(--accent-danger)" fill="url(#gradDiabetic)" strokeWidth={3} dot={{ r: 4, fill: 'var(--accent-danger)', strokeWidth: 2, stroke: 'var(--bg-card)' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Area type="monotone" dataKey="normal" name="Physiologically Stable" stroke="var(--accent-success)" fill="url(#gradNormal)" strokeWidth={3} dot={{ r: 4, fill: 'var(--accent-success)', strokeWidth: 2, stroke: 'var(--bg-card)' }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '24px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Risk Segmentation</div>
              <div className="card-subtitle">Population breakdown by severity</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                  dataKey="value" paddingAngle={5} cornerRadius={4} stroke="none">
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ width: '100%', marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {riskDistribution.map((d, i) => (
                <div key={i} style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '4px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '2px', background: d.color }} />
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>{d.name}</span>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{d.value.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Model Accuracy Comparison */}
      {/* Model Accuracy Comparison */}
      <div className="grid-60-40 mb-32">
        <div className="card glass-morphism">
          <div className="card-header" style={{ marginBottom: '24px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Algorithm Performance Matrix</div>
              <div className="card-subtitle">Comparative evaluation of non-linear classifiers</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={modelAccuracy} barSize={12} margin={{ bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => v.split(' ')[0]} />
              <YAxis domain={[70, 100]} stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="accuracy" name="Accuracy" fill="var(--accent-primary)" radius={[10, 10, 0, 0]} />
              <Bar dataKey="precision" name="Precision" fill="var(--accent-success)" radius={[10, 10, 0, 0]} />
              <Bar dataKey="recall" name="Recall" fill="var(--accent-warning)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Best Model Card */}
        <div className="card shadow-glow" style={{ border: 'none', background: 'var(--grad-success)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.1, transform: 'rotate(15deg)' }}>
            <Trophy size={180} />
          </div>
          <div style={{ position: 'relative', zIndex: 1, padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={20} color="white" />
                <span style={{ fontWeight: 900, color: 'white', fontSize: '16px', letterSpacing: '0.05em' }}>PRODUCTION CHAMPION</span>
              </div>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>98.2% ACC</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 900, color: 'white', marginBottom: '8px' }}>Random Forest</h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '24px' }}>Selected for the final inference engine due to superior AUC-ROC stability and robustness against Gini-impurity drift.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { label: 'Precision', val: '96.1%' },
                { label: 'Recall', val: '94.8%' },
                { label: 'F1 Score', val: '95.4%' },
              ].map((m, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: 800, textTransform: 'uppercase' }}>{m.label}</div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: 'white' }}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Predictions Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Recent Patient Predictions</div>
            <div className="card-subtitle">Latest diabetes risk assessments from the prediction pipeline</div>
          </div>
          <span className="badge badge-info">Live Feed</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient ID</th><th>Age</th><th>BMI</th><th>Fasting Glucose</th>
                <th>Insulin</th><th>Risk Level</th><th>Confidence</th><th>Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((p, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#818cf8' }}>{p.id}</td>
                  <td>{p.age} yrs</td>
                  <td>{p.bmi}</td>
                  <td>{p.glucose} mg/dL</td>
                  <td>{p.insulin} uU/mL</td>
                  <td><RiskBadge risk={p.risk} /></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar-wrap" style={{ width: 60, flex: '0 0 60px' }}>
                        <div className="progress-bar-fill"
                          style={{ width: `${p.confidence}%`, background: p.confidence > 90 ? '#10b981' : p.confidence > 75 ? '#f59e0b' : '#ef4444' }} />
                      </div>
                      <span style={{ fontSize: 12 }}>{p.confidence}%</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: 12, color: p.type === 'No Risk' ? '#10b981' : p.type.includes('CVD') ? '#ef4444' : '#f59e0b', fontWeight: 600 }}>
                      {p.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
