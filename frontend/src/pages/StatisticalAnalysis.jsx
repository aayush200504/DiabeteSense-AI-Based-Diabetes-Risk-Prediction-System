import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Ruler, TrendingUp, BarChart3, Search, AlertCircle, 
  CheckCircle, AlertTriangle, ShieldCheck, Activity, Info
} from 'lucide-react';
import { statsTable } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
        <p style={{ color: '#94a3b8', fontSize: 12 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.fill || '#818cf8', fontSize: 13, fontWeight: 600 }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const corrMatrix = [
  ['Feature',    'Diabetes','Glucose','Insulin','OGTT',  'BMI', 'Age', 'Activity'],
  ['Diabetes',   '1.00',    '0.82',   '0.74',   '0.68',  '0.54', '0.46', '-0.32'],
  ['Glucose',    '0.82',    '1.00',   '0.69',   '0.71',  '0.48', '0.44', '-0.25'],
  ['Insulin',    '0.74',    '0.69',   '1.00',   '0.64',  '0.55', '0.38', '-0.20'],
  ['OGTT',       '0.68',    '0.71',   '0.64',   '1.00',  '0.42', '0.36', '-0.22'],
  ['BMI',        '0.54',    '0.48',   '0.55',   '0.42',  '1.00', '0.22', '-0.38'],
  ['Age',        '0.46',    '0.44',   '0.38',   '0.36',  '0.22', '1.00', '-0.15'],
  ['Activity',   '-0.32',   '-0.25',  '-0.20',  '-0.22', '-0.38', '-0.15','1.00'],
];

const getCorrColor = (val) => {
  const v = parseFloat(val);
  if (isNaN(v)) return 'transparent';
  if (v >= 0.7) return 'rgba(239,68,68,0.7)';
  if (v >= 0.5) return 'rgba(245,158,11,0.6)';
  if (v >= 0.3) return 'rgba(99,102,241,0.5)';
  if (v >= 0)   return 'rgba(16,185,129,0.4)';
  return 'rgba(139,92,246,0.4)';
};

const varChart = statsTable.map(r => ({
  name: r.feature.length > 10 ? r.feature.slice(0, 10) + '…' : r.feature,
  mean: parseFloat(r.mean),
  std: parseFloat(r.std),
}));

export default function StatisticalAnalysis() {
  return (
    <div className="animate-fade-in" style={{ padding: '20px 0' }}>
      <div className="mb-24" style={{ textAlign: 'left' }}>
        <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em' }}>
          Statistical <span style={{ color: 'var(--accent-primary)' }}>Integrity</span>
        </h2>
        <p className="section-subtitle" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          Detailed descriptive analytics and feature interdependence matrix for the NHANES diabetic cohorts
        </p>
      </div>

      {/* Descriptive Stats Table */}
      <div className="card mb-24 card-glow-primary">
        <div className="card-header" style={{ marginBottom: '24px' }}>
          <div>
            <div className="card-title" style={{ fontSize: '18px' }}>Descriptive Profile</div>
            <div className="card-subtitle">Complete biometric measurement distribution metrics (N = 2,278)</div>
          </div>
          <Ruler className="text-muted" size={20} />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ background: 'transparent' }}>Biometric Parameter</th>
                <th style={{ background: 'transparent' }}>Mean μ</th>
                <th style={{ background: 'transparent' }}>Median</th>
                <th style={{ background: 'transparent' }}>Std Dev σ</th>
                <th style={{ background: 'transparent' }}>Min</th>
                <th style={{ background: 'transparent' }}>Max</th>
                <th style={{ background: 'transparent' }}>Skewness</th>
              </tr>
            </thead>
            <tbody>
              {statsTable.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.feature}</td>
                  <td style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{row.mean}</td>
                  <td>{row.median}</td>
                  <td style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>{row.std}</td>
                  <td>{row.min}</td>
                  <td>{row.max}</td>
                  <td style={{ color: Math.abs(parseFloat(row.skew)) > 1 ? 'var(--accent-danger)' : 'var(--accent-success)', fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {row.skew}
                      {Math.abs(parseFloat(row.skew)) > 1 ? (
                        <div style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(244,63,94,0.1)', fontSize: '9px', textTransform: 'uppercase' }}>Skewed</div>
                      ) : (
                        <div style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(52,211,153,0.1)', fontSize: '9px', textTransform: 'uppercase' }}>Normal</div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-60-40 mb-24">
        {/* Correlation Matrix Heatmap */}
        <div className="card shadow-glow">
          <div className="card-header" style={{ marginBottom: '24px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Correlation Matrix</div>
              <div className="card-subtitle">Pearson multi-variate interdependence heatmap</div>
            </div>
          </div>
          <div style={{ overflowX: 'auto', padding: '10px' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 6 }}>
              <tbody>
                {corrMatrix.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        background: i === 0 || j === 0 ? 'transparent' : getCorrColor(cell),
                        color: i === 0 || j === 0 ? 'var(--text-secondary)' : 'var(--text-primary)',
                        fontSize: i === 0 || j === 0 ? 10 : 13,
                        fontWeight: i === j ? 900 : 700,
                        padding: '12px 6px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        textTransform: i === 0 || j === 0 ? 'uppercase' : 'none',
                        letterSpacing: i === 0 || j === 0 ? '0.05em' : 'normal',
                        border: i === 0 || j === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                        transition: 'var(--transition-fast)',
                        boxShadow: i !== 0 && j !== 0 && i !== j ? 'inset 0 0 10px rgba(0,0,0,0.1)' : 'none'
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Variance / Std Dev Chart */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '24px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Measurement Spread</div>
              <div className="card-subtitle">Interquartile & variance analysis</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={varChart} layout="vertical" barSize={10} margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="mean" name="Population Mean" fill="var(--grad-primary)" radius={[0,10,10,0]} />
              <Bar dataKey="std"  name="Variation Range" fill="var(--accent-warning)" radius={[0,10,10,0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mode & Key Insights */}
      <div className="grid-2 mb-24">
        <div className="card">
          <div className="card-title mb-16" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart3 size={18} className="text-accent" />
            Mode Analysis
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { feature: 'Age (RIDAGEYR)', mode: '41 years', note: 'Most common age in dataset' },
              { feature: 'BMI (BMXBMI)', mode: '27.3',     note: 'Overweight majority' },
              { feature: 'Fasting Glucose (LBXGLU)', mode: '95 mg/dL', note: 'Near normal fasting level' },
              { feature: 'Insulin (LBXIN)', mode: '9.2 uU/mL', note: 'Typical healthy insulin range' },
              { feature: 'Activity (PAQ605)', mode: 'Inactive', note: 'Sedentary lifestyle mostly' },
              { feature: 'Gender (RIAGENDR)', mode: 'Female', note: 'Slightly higher proportion female' },
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc' }}>{m.feature}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{m.note}</div>
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#818cf8', fontFamily: 'Outfit, sans-serif' }}>{m.mode}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title mb-16" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Search size={18} className="text-secondary" />
            Key Statistical Observations
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: <AlertCircle size={16} />, text: 'Glucose (LBXGLU) and OGTT (LBXGLT) have high positive skewness (>1.5), indicating right-tailed distribution with severe diabetic outliers.', type: 'danger' },
              { icon: <AlertTriangle size={16} />, text: 'Strong positive correlation (r=0.82) between Fasting Glucose and Diabetes label — LBXGLU is the top predictor for this dataset.', type: 'warning' },
              { icon: <Activity size={16} />, text: 'BMI (BMXBMI) shows moderate correlation (r=0.54) with diabetes risk and high correlation with insulin resistance.', type: 'warning' },
              { icon: <ShieldCheck size={16} />, text: 'Physical Activity (PAQ605) shows negative correlation with diabetes risk — indicating physical activity is a major preventative factor.', type: 'success' },
              { icon: <Info size={16} />, text: 'Shapiro-Wilk test: Insulin & Glucose strongly reject normality (p<0.001) — Log transformation is highly advised for generalized linear models.', type: 'info' },
            ].map((o, i) => (
              <div key={i} style={{
                padding: '12px 14px', borderRadius: 8, borderLeft: '3px solid',
                background: o.type === 'danger' ? 'rgba(239,68,68,0.08)' : o.type === 'warning' ? 'rgba(245,158,11,0.08)' : o.type === 'success' ? 'rgba(16,185,129,0.08)' : 'rgba(99,102,241,0.08)',
                borderColor: o.type === 'danger' ? '#ef4444' : o.type === 'warning' ? '#f59e0b' : o.type === 'success' ? '#10b981' : '#6366f1',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ marginTop: 2 }}>{o.icon}</div>
                  <span style={{ fontSize: 12, color: '#e2e8f0', lineHeight: 1.5 }}>{o.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Variance Analysis */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Variance Analysis Summary</div>
          <div className="card-subtitle">Feature spread and variation metrics</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { metric: 'Highest Std Dev', feature: 'OGTT Glucose', value: '45.3', unit: 'mg/dL', color: '#f59e0b' },
            { metric: 'Most Skewed', feature: 'Insulin (LBXIN)', value: '2.11', unit: 'skewness', color: '#f97316' },
            { metric: 'Best Predictor', feature: 'Glucose (LBXGLU)', value: '0.82', unit: 'Pearson r', color: '#10b981' },
            { metric: 'Highest Protective', feature: 'Activity', value: '-0.32', unit: 'Pearson r', color: '#6366f1' },
          ].map((v, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>{v.metric}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: v.color, fontFamily: 'Outfit, sans-serif' }}>{v.value}</div>
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 4 }}>{v.unit}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#f8fafc' }}>{v.feature}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
