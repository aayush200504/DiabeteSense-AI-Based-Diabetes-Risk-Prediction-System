import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Database, FileText, Hash, Ruler, Hospital, ClipboardList, Calendar, 
  CheckCircle2, Info, ChevronRight, Layout, Filter, ArrowUpRight, TrendingUp
} from 'lucide-react';
import { preprocessingSteps, NHANES_STATS, bmiDistribution, ageDistribution } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
        <p style={{ color: '#94a3b8', fontSize: 12 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || '#818cf8', fontSize: 13, fontWeight: 600 }}>{p.name}: {p.value?.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

const features = [
  { name: "RIDAGEYR", description: "Age in Years", type: "Continuous", range: "12–80", missing: "0.0%" },
  { name: "RIAGENDR", description: "Gender",        type: "Categorical", range: "Male/Female (1/2)", missing: "0.0%" },
  { name: "BMXBMI",   description: "Body Mass Index", type: "Continuous", range: "14.5–67.3", missing: "3.2%" },
  { name: "LBXGLU",   description: "Fasting Glucose (mg/dL)", type: "Continuous", range: "55–500", missing: "5.4%" },
  { name: "LBXGLT",   description: "Oral Glucose Tolerance (mg/dL)", type: "Continuous", range: "30–600", missing: "4.8%" },
  { name: "LBXIN",    description: "Insulin (uU/mL)", type: "Continuous", range: "0.1–200", missing: "6.2%" },
  { name: "PAQ605",   description: "Moderate Physical Activity", type: "Categorical", range: "1(Yes)/2(No)", missing: "0.1%" },
  { name: "DIQ010",   description: "Doctor Told Diabetes (Target)", type: "Categorical", range: "1/2/3", missing: "0.0%" },
];

export default function Dataset() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="animate-fade-in" style={{ padding: '20px 0' }}>
      <div className="mb-32" style={{ textAlign: 'left' }}>
        <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em' }}>
          Data Repository <span style={{ color: 'var(--accent-primary)' }}>& Pipeline</span>
        </h2>
        <p className="section-subtitle" style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Structured biometric ingestion from the NHANES clinical registry and preprocessing workflow
        </p>
      </div>

      <div className="tab-list">
        {['overview', 'features', 'preprocessing', 'splitting'].map(t => (
          <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
            {[
              { icon: <Database size={22} />, label: 'Registry Source', value: 'NHANES CDC', sub: 'Clinical Health Survey' },
              { icon: <Hash size={22} />, label: 'Metric Samples', value: NHANES_STATS.totalSamples.toLocaleString(), sub: 'Denoised Observables' },
              { icon: <Filter size={22} />, label: 'Feature Space', value: NHANES_STATS.features.toString(), sub: 'Core Predictor Set' },
              { icon: <TrendingUp size={22} />, label: 'Target Cases', value: NHANES_STATS.diabeticPatients.toString(), sub: 'Confirmed Diabetic' },
              { icon: <Layout size={22} />, label: 'Architecture', value: 'Tabular', sub: 'High-Density clinical' },
              { icon: <Calendar size={22} />, label: 'Temporal Cycle', value: '2013–2014', sub: 'Collection Period' },
            ].map((c, i) => (
              <div key={i} className="card glass-morphism" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '24px' }}>
                <div style={{ color: 'var(--accent-primary)', opacity: 0.9 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '2px' }}>{c.value}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Age Distribution</div>
                <div className="card-subtitle">Patients by age group</div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={ageDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="age" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count"    name="Total"    fill="#6366f1" radius={[4,4,0,0]} />
                  <Bar dataKey="diabetic" name="Diabetic" fill="#ef4444" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">BMI Distribution & Risk</div>
                <div className="card-subtitle">Per WHO classification</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                {bmiDistribution.map((b, i) => {
                  const max = Math.max(...bmiDistribution.map(x => x.count));
                  const colors = { 'Low': '#10b981', 'Moderate': '#f59e0b', 'High': '#f97316', 'Very High': '#ef4444', 'Extreme': '#dc2626' };
                  return (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: '#94a3b8' }}>{b.range}</span>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span className={`badge ${b.risk === 'Low' ? 'badge-success' : b.risk === 'Moderate' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: 10 }}>{b.risk}</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#f8fafc' }}>{b.count.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar-fill" style={{ width: `${(b.count / max) * 100}%`, background: colors[b.risk] || '#6366f1' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Feature Dictionary</div>
            <div className="card-subtitle">Explicit feature restrictions based on the reference dataset</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr><th>NHANES Code</th><th>Description</th><th>Type</th><th>Range</th><th>Missing %</th></tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#818cf8' }}>{f.name}</td>
                    <td>{f.description}</td>
                    <td>
                      <span className={`badge ${f.type === 'Continuous' ? 'badge-primary' : f.type === 'Binary' ? 'badge-danger' : 'badge-info'}`} style={{ fontSize: 10 }}>
                        {f.type}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{f.range}</td>
                    <td style={{ color: parseFloat(f.missing) > 3 ? '#ef4444' : '#10b981' }}>{f.missing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'preprocessing' && (
        <div>
          <div className="card mb-24">
            <div className="card-header">
              <div className="card-title">Preprocessing Pipeline</div>
              <div className="card-subtitle">Data preparation workflow specific to selected features</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {preprocessingSteps.map((s, i) => (
                <div key={i} className="card" style={{ padding: '16px 20px', transition: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, color: '#f8fafc', fontSize: 14 }}>{s.step}</span>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <span className="badge badge-info" style={{ fontSize: 10 }}>{s.samples}</span>
                          <span className="badge badge-success" style={{ fontSize: 10 }}>✓ Done</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: '#94a3b8' }}>{s.detail}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-title mb-16">Missing Value Treatment</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { feature: 'BMI (BMXBMI)', strategy: 'Median Imputation', pct: '3.2%' },
                  { feature: 'Glucose (LBXGLU)', strategy: 'Median Imputation', pct: '5.4%' },
                  { feature: 'Insulin (LBXIN)', strategy: 'KNN Imputation (k=5)', pct: '6.2%' },
                  { feature: 'OGTT (LBXGLT)', strategy: 'Median Imputation', pct: '4.8%' },
                  { feature: 'Activity (PAQ605)', strategy: 'Mode Imputation', pct: '0.1%' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc' }}>{m.feature}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{m.strategy}</div>
                    </div>
                    <span className="badge badge-warning">{m.pct} missing</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-title mb-16">Encoding & Scaling</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { type: 'Label Encoding', vars: 'Gender (RIAGENDR)', why: 'Binary categorical' },
                  { type: 'Label Encoding', vars: 'Activity (PAQ605)', why: 'Binary categorical' },
                  { type: 'Target Mapping', vars: 'Diabetes (DIQ010)', why: 'Maps 1=Yes, 2=No, 3=Borderline' },
                  { type: 'MinMax Scaling', vars: 'Continuous features', why: 'Range normalization [0,1]' },
                  { type: 'Standard Scaling', vars: 'For distance models', why: 'SVM compatibility' },
                ].map((e, i) => (
                  <div key={i} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#818cf8' }}>{e.type}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#f8fafc' }}>{e.vars}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{e.why}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'splitting' && (
        <div className="animate-fade-in">
          <div className="card mb-32 card-glow-primary">
            <div className="card-header" style={{ marginBottom: '32px' }}>
              <div>
                <div className="card-title" style={{ fontSize: '18px' }}>Dataset Stratification</div>
                <div className="card-subtitle">80/20 train-test split with synthetic minority oversampling</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
              {[
                { label: 'Training Corpus', pct: '80%', n: '1,822', color: 'var(--accent-primary)', use: 'Optimized via SMOTE Balancing' },
                { label: 'Unseen Test Set', pct: '20%', n: '456', color: 'var(--accent-success)', use: 'Hold-out evaluation environment' },
              ].map((s, i) => (
                <div key={i} className="glass-morphism" style={{ padding: '32px', borderRadius: '20px', border: `1px solid var(--border)`, textAlign: 'center' }}>
                  <div style={{ width: '90px', height: '90px', borderRadius: '50%', border: `4px solid ${s.color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: `0 0 30px ${s.color}20`, background: `${s.color}05` }}>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: s.color }}>{s.pct}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{s.label}</div>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)' }}>{s.n} Samples</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>{s.use}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card card-glow-success">
            <div className="card-title mb-12" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={18} className="text-success" />
              Class Balance after SMOTE
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { label: 'No Diabetes (2)', before: '2,199', after: '2,199', change: 'No change' },
                { label: 'Pre-Diabetes (3)', before: '58', after: '2,199', change: '+3691%' },
                { label: 'Type-2 Diabetes (1)', before: '21', after: '2,199', change: '+10371%' },
              ].map((c, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: 8 }}>{c.label}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>
                    <span>Before:</span><span>{c.before}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#10b981', fontWeight: 600 }}>
                    <span>After:</span><span>{c.after} <span style={{ fontSize: 11 }}>({c.change})</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
