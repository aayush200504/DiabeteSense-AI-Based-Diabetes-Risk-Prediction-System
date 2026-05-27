import React, { useState } from 'react';
import {
  BarChart, Bar, AreaChart, Area, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, BarChart2, PieChart as PieIcon, Activity, Info, Trophy, Zap, Leaf } from 'lucide-react';
import { ageDistribution, bmiDistribution, featureImportance, correlationData, riskDistribution } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
        <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || '#818cf8', fontSize: 13, fontWeight: 600 }}>{p.name}: {typeof p.value === 'number' && p.value > 99 ? p.value.toLocaleString() : p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

// Glucose distribution (simulated histogram bins matching NHANES data)
const glucoseDist = [
  { range: '55–80',   count: 425  },
  { range: '80–100',  count: 1450 },
  { range: '100–125', count: 250  },
  { range: '126–160', count: 90   },
  { range: '160–200', count: 40   },
  { range: '200–300', count: 18   },
  { range: '300+',    count: 5    },
];

const insulinDist = [
  { range: '<5',      count: 280  },
  { range: '5–10',    count: 850  },
  { range: '10–15',   count: 520  },
  { range: '15–20',   count: 310  },
  { range: '20–30',   count: 190  },
  { range: '30–50',   count: 95   },
  { range: '>50',     count: 33   },
];

const radarData = [
  { subject: 'Inactive (PAQ605=2)',  Diabetic: 78, NonDiabetic: 32 },
  { subject: 'Obese (BMI>30)',       Diabetic: 84, NonDiabetic: 21 },
  { subject: 'High Fasting Glucose', Diabetic: 95, NonDiabetic: 5 },
  { subject: 'High OGTT Glucose',    Diabetic: 92, NonDiabetic: 12 },
  { subject: 'High Insulin',         Diabetic: 88, NonDiabetic: 27 },
  { subject: 'Age >50',              Diabetic: 75, NonDiabetic: 35 },
];

const RCOLORS = ['#ef4444','#f43f5e','#f97316','#f59e0b','#10b981','#06b6d4','#6366f1'];

export default function Visualizations() {
  const [activeChart, setActiveChart] = useState('all');

  return (
    <div className="animate-fade-in" style={{ padding: '20px 0' }}>
      <div className="mb-32" style={{ textAlign: 'left' }}>
        <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Exploratory <span style={{ color: 'var(--accent-primary)' }}>EDAs</span>
        </h2>
        <p className="section-subtitle" style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Visual deep-dive into the NHANES biometric feature space and target distribution
        </p>
      </div>

      {/* Age & Gender distribution */}
      {/* Age & Gender distribution */}
      <div className="grid-60-40 mb-32">
        <div className="card shadow-glow">
          <div className="card-header" style={{ marginBottom: '24px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Demographic Risk Gradient</div>
              <div className="card-subtitle">Age-stratified diabetic prevalence analysis (N=2,278)</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ageDistribution} barSize={14} margin={{ bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="age" stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" name="Total Baseline" fill="var(--grad-primary)" radius={[20, 20, 0, 0]} opacity={0.6} />
              <Bar dataKey="diabetic" name="Confirmed Risk" fill="var(--accent-danger)" radius={[20, 20, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card glass-morphism">
          <div className="card-header" style={{ marginBottom: '24px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Cohort Composition</div>
              <div className="card-subtitle">Relative distribution of risk categories</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                {riskDistribution.map((e, i) => (
                  <Cell key={i} fill={e.color} style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.2))' }} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ padding: '0 20px 20px' }}>
            {riskDistribution.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color }} /> {d.name}
                </span>
                <span style={{ fontWeight: 800 }}>{((d.value / 2278) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Histograms */}
      {/* Histograms */}
      <div className="grid-2 mb-32">
        <div className="card glass-morphism">
          <div className="card-header" style={{ marginBottom: '24px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Fasting Glucose Density</div>
              <div className="card-subtitle">Statistical distribution of LBXGLU (mg/dL)</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={glucoseDist} barSize={24}>
              <defs>
                <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-warning)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--accent-danger)" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="range" stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" fill="url(#glucoseGrad)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card glass-morphism">
          <div className="card-header" style={{ marginBottom: '24px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Insulin Marker Spread</div>
              <div className="card-subtitle">Distribution of serum insulin levels (LBXIN)</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={insulinDist} barSize={24}>
              <defs>
                <linearGradient id="insulinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="range" stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" fill="url(#insulinGrad)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Importance & Radar */}
      <div className="grid-60-40 mb-24">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Feature Importance (Random Forest)</div>
            <div className="card-subtitle">7 Selected Features ranked by Gini importance</div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={featureImportance} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" domain={[0, 0.45]} tickFormatter={v => `${(v*100).toFixed(0)}%`} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis dataKey="feature" type="category" width={150} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} formatter={v => [`${(v*100).toFixed(1)}%`, 'Importance']} />
              <Bar dataKey="importance" name="Importance" radius={[0,4,4,0]}>
                {featureImportance.map((e, i) => (
                  <Cell key={i} fill={RCOLORS[i % RCOLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 12, padding: '10px 14px', background: 'rgba(16,185,129,0.08)', borderRadius: 10, borderLeft: '3px solid #10b981', display: 'flex', alignItems: 'center', gap: 10 }}>
            <BarChart2 size={16} className="text-success" />
            <span style={{ fontSize: 12, color: '#e2e8f0' }}><strong style={{ color: '#f8fafc' }}>Insight:</strong> Fasting Glucose (LBXGLU) and Insulin (LBXIN) are the dominating predictive features in this subset.</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Risk Factor Radar Chart</div>
            <div className="card-subtitle">Diabetic vs Non-diabetic subset profiles</div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Radar name="Diabetic" dataKey="Diabetic" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} strokeWidth={2} />
              <Radar name="Non-Diabetic" dataKey="NonDiabetic" stroke="#10b981" fill="#10b981" fillOpacity={0.25} strokeWidth={2} />
              <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BMI Box-Plot Style Visualization */}
      <div className="card mb-24">
        <div className="card-header">
          <div className="card-title">BMI Category Distribution & Trend</div>
          <div className="card-subtitle">Obesity-diabetes relationship visualized across WHO BMI categories</div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 200, padding: '0 16px' }}>
          {bmiDistribution.map((b, i) => {
            const max = Math.max(...bmiDistribution.map(x => x.count));
            const h = (b.count / max) * 160;
            const colors = { 'Low': '#10b981', 'Moderate': '#f59e0b', 'High': '#f97316', 'Very High': '#ef4444', 'Extreme': '#dc2626' };
            const c = colors[b.risk] || '#6366f1';
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{b.count.toLocaleString()}</div>
                <div style={{ width: '100%', height: h, background: c, borderRadius: '6px 6px 0 0', opacity: 0.8, boxShadow: `0 0 12px ${c}50`, position: 'relative', transition: 'height 1s ease' }}>
                  <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: 'white', fontWeight: 700 }}>{b.risk}</div>
                </div>
                <div style={{ fontSize: 10, color: '#475569', textAlign: 'center' }}>{b.range.split('(')[1]?.replace(')', '') || b.range}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BMI vs Glucose Scatter */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">BMI vs Glucose Scatter Plot (Trend Analysis)</div>
          <div className="card-subtitle">Positive correlation: higher BMI → higher Glucose → higher diabetes risk</div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <ScatterChart margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="x" name="BMI" type="number" domain={[15, 50]} tick={{ fill: '#94a3b8', fontSize: 12 }} label={{ value: 'BMI', position: 'bottom', fill: '#94a3b8', fontSize: 13 }} />
            <YAxis dataKey="y" name="Glucose" type="number" domain={[50, 150]} tick={{ fill: '#94a3b8', fontSize: 12 }} label={{ value: 'Glucose mg/dL', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 13 }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Scatter data={correlationData} fill="#6366f1">
              {correlationData.map((e, i) => (
                <Cell key={i} fill={e.y >= 126 ? '#ef4444' : e.y >= 100 ? '#f59e0b' : '#10b981'} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          {[{ color: '#10b981', label: 'Normal Glucose (<100 mg/dL)' }, { color: '#f59e0b', label: 'Pre-Diabetic (100–125)' }, { color: '#ef4444', label: 'Diabetic (≥126)' }].map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a3b8' }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
