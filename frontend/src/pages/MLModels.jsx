import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend, LineChart, Line } from 'recharts';
import { Cpu, Trophy, Zap, Leaf, TrendingUp, CheckCircle2, ShieldCheck, Activity, Target, Filter, ChevronRight } from 'lucide-react';
import { modelAccuracy, confusionMatrix } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass-morphism" style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 16px', boxShadow: 'var(--shadow-lg)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: '14px', fontWeight: 800 }}>{p.name}: {p.value}%</p>
        ))}
      </div>
    );
  }
  return null;
};

const rocData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.02, tpr: 0.45 },
  { fpr: 0.05, tpr: 0.72 },
  { fpr: 0.1,  tpr: 0.85 },
  { fpr: 0.15, tpr: 0.90 },
  { fpr: 0.2,  tpr: 0.93 },
  { fpr: 0.3,  tpr: 0.96 },
  { fpr: 0.5,  tpr: 0.97 },
  { fpr: 0.7,  tpr: 0.98 },
  { fpr: 1,    tpr: 1     },
];

const hyperparams = [
  { model: 'Random Forest', params: 'n_estimators=500, max_depth=15, min_samples_split=5, max_features="sqrt", class_weight="balanced"', tuned: 'Grid Search CV (5-fold)' },
  { model: 'Decision Tree',  params: 'max_depth=10, criterion="gini", min_samples_leaf=10, class_weight="balanced"',                    tuned: 'Grid Search CV (5-fold)' },
  { model: 'Logistic Reg.',  params: 'C=0.1, penalty="l2", solver="lbfgs", max_iter=1000, class_weight="balanced"',                    tuned: 'Randomized Search' },
  { model: 'SVM',            params: 'C=10, kernel="rbf", gamma=0.01, class_weight="balanced"',                                        tuned: 'Randomized Search CV' },
];

const learningCurve = [
  { size: '10%', rf: 88.2, svm: 83.1 },
  { size: '20%', rf: 90.1, svm: 85.4 },
  { size: '40%', rf: 92.3, svm: 87.8 },
  { size: '60%', rf: 93.5, svm: 89.2 },
  { size: '80%', rf: 94.2, svm: 90.6 },
  { size: '100%', rf: 94.7, svm: 91.2 },
];

export default function MLModels() {
  const [selModel, setSelModel] = useState(2); // RF

  const m = modelAccuracy[selModel];
  const cm = confusionMatrix;
  const { tp, fp, fn, tn } = cm;
  const total = tp + fp + fn + tn;

  return (
    <div className="animate-fade-in" style={{ padding: '20px 0' }}>
      <div className="mb-32" style={{ textAlign: 'left' }}>
        <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Model <span style={{ color: 'var(--accent-primary)' }}>Benchmarking</span>
        </h2>
        <p className="section-subtitle" style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Comparative evaluation of non-linear classifiers and kernel machines on diabetic indices
        </p>
      </div>

      {/* Model selector */}
      <div className="tab-list mb-32">
        {modelAccuracy.map((m, i) => (
          <button key={i} className={`tab-btn ${selModel === i ? 'active' : ''}`} onClick={() => setSelModel(i)}>
            {m.name}
          </button>
        ))}
      </div>

      {/* Selected Model Detail */}
      <div className="card shadow-glow mb-32" style={{ padding: '32px', borderBottom: `4px solid ${m.color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
          <div className="glass-morphism" style={{ width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${m.color}15`, color: m.color, border: `1px solid ${m.color}30` }}>
            {selModel === 0 && <TrendingUp size={40} />}
            {selModel === 1 && <Leaf size={40} />}
            {selModel === 2 && <Trophy size={40} />}
            {selModel === 3 && <Zap size={40} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{m.name}</h3>
              {selModel === 2 && <span className="badge badge-success" style={{ padding: '6px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 800 }}>Production Selected</span>}
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {selModel === 0 ? 'Baseline linear regularization — optimal for high-speed binary segregation.' :
               selModel === 1 ? 'Recursive partitioning — excellent for complex feature interaction capture.' :
               selModel === 2 ? 'High-density ensemble forest — top accuracy with minimal variance drift.' :
               'Hyper-plane kernel optimization — robust performance on non-linear disease boundaries.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {[
            { label: 'Accuracy Score', value: `${m.accuracy}%`, color: m.color },
            { label: 'Precision μ', value: `${m.precision}%`, color: 'var(--accent-primary)' },
            { label: 'Recall λ', value: `${m.recall}%`, color: 'var(--accent-warning)' },
            { label: 'F1 Harmonic', value: `${m.f1}%`, color: 'var(--accent-success)' },
            { label: 'AUC-ROC Index', value: m.auc, color: 'var(--accent-danger)' },
          ].map((metric, i) => (
            <div key={i} className="glass-morphism" style={{ borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{metric.label}</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: metric.color }}>{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Local Progress bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'Diagnostic Precision', value: m.precision, color: 'var(--accent-primary)' },
            { label: 'Symptomatic Recall', value: m.recall, color: 'var(--accent-warning)' },
          ].map((b, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                <span>{b.label}</span><span>{b.value}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${b.value}%`, background: b.color, borderRadius: '4px', boxShadow: `0 0 10px ${b.color}40` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-60-40 mb-32">
        {/* Confusion Matrix */}
        <div className="card shadow-glow">
          <div className="card-header" style={{ marginBottom: '32px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Confusion Matrix</div>
              <div className="card-subtitle">Inference validation on {total.toLocaleString()} hold-out samples</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
            <div />
            <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Predicted Stability</div>
            <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Predicted At-Risk</div>

            <div style={{ display: 'contents' }}>
              <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', textAlign: 'center', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Actual Stability</div>
              <div className="glass-morphism" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--accent-success)', background: 'rgba(16,185,129,0.1)', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent-success)' }}>{tn.toLocaleString()}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>True Negative</div>
              </div>
              <div className="glass-morphism" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-muted)' }}>{fp}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>False Positive</div>
              </div>
            </div>

            <div style={{ display: 'contents' }}>
              <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', textAlign: 'center', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Actual At-Risk</div>
              <div className="glass-morphism" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-muted)' }}>{fn}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>False Negative</div>
              </div>
              <div className="glass-morphism" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--accent-success)', background: 'rgba(16,185,129,0.1)', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent-success)' }}>{tp.toLocaleString()}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>True Positive</div>
              </div>
            </div>
          </div>
        </div>

        {/* ROC Curve */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '32px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Discrimination Index</div>
              <div className="card-subtitle">ROC Analysis: Probabilistic separator quality</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="fpr" stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="tpr" stroke="var(--accent-success)" strokeWidth={4} dot={false} />
              <Line type="step" dataKey="fpr" stroke="rgba(255,255,255,0.1)" strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(16,185,129,0.05)', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.1)', fontSize: '13px', fontWeight: 800, color: 'var(--accent-success)', marginTop: '16px' }}>
            AUC-ROC INDEX = 0.970 (Superior Performance)
          </div>
        </div>
      </div>

      {/* Comparison & Learning Curve */}
      <div className="grid-2 mb-32">
        <div className="card">
          <div className="card-header" style={{ marginBottom: '24px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Metric Radar</div>
              <div className="card-subtitle">Multi-dimensional algorithm comparison</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={[
              { metric: 'Accuracy', 'Logistic Reg': 82.4, 'Decision Tree': 87.6, 'Random Forest': 94.7, SVM: 91.2 },
              { metric: 'Precision', 'Logistic Reg': 80.1, 'Decision Tree': 85.3, 'Random Forest': 93.1, SVM: 89.5 },
              { metric: 'Recall', 'Logistic Reg': 78.9, 'Decision Tree': 86.2, 'Random Forest': 92.8, SVM: 88.7 },
              { metric: 'F1-Score', 'Logistic Reg': 79.5, 'Decision Tree': 85.7, 'Random Forest': 92.9, SVM: 89.1 },
            ]}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Radar name="Random Forest" dataKey="Random Forest" stroke="var(--accent-success)" fill="var(--accent-success)" fillOpacity={0.2} strokeWidth={3} />
              <Radar name="SVM" dataKey="SVM" stroke="var(--accent-primary)" fill="var(--accent-primary)" fillOpacity={0.1} strokeWidth={2} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header" style={{ marginBottom: '24px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Learning Stability</div>
              <div className="card-subtitle">Accuracy convergence vs training volume</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={learningCurve}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="size" stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
              <YAxis domain={[80, 100]} stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="rf" name="Random Forest" stroke="var(--accent-success)" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="svm" name="SVM" stroke="var(--accent-primary)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hyperparams */}
      <div className="card glass-morphism">
        <div className="card-header" style={{ marginBottom: '24px' }}>
          <div>
            <div className="card-title" style={{ fontSize: '18px' }}>Hyperparameter Architecture</div>
            <div className="card-subtitle">Grid-Search optimized final configurations</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {hyperparams.map((h, i) => (
            <div key={i} className="glass-morphism" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '15px' }}>{h.model}</span>
                <span className="badge badge-info" style={{ fontSize: '9px' }}>{h.tuned}</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <code style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'monospace', lineHeight: '1.5' }}>
                  {h.params}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
