import React from 'react';
import { Calendar, AlertTriangle, Target, Lightbulb, Heart, Activity, Search, BarChart2, CheckCircle2, Clock, List, ShieldCheck } from 'lucide-react';
import { ganttData } from '../data/mockData';

const TOTAL_WEEKS = 20;

const riskItems = [
  { risk: 'Dataset Availability', impact: 'High', prob: 'Low', mitigation: 'NHANES is publicly available online — no access issues', status: 'Mitigated' },
  { risk: 'Class Imbalance', impact: 'High', prob: 'High', mitigation: 'SMOTE oversampling + class_weight="balanced" in all models', status: 'Mitigated' },
  { risk: 'Model Overfitting', impact: 'Medium', prob: 'Medium', mitigation: 'Cross-validation, regularization, early stopping, dropout', status: 'Monitored' },
  { risk: 'Processing Time', impact: 'Low', prob: 'Low', mitigation: 'Random Forest with n_jobs=-1 for parallel execution', status: 'Mitigated' },
  { risk: 'Feature Leakage', impact: 'High', prob: 'Medium', mitigation: 'Strict train/test split before any preprocessing steps', status: 'Mitigated' },
  { risk: 'Privacy Concerns', impact: 'High', prob: 'Low', mitigation: 'NHANES data is anonymized and de-identified by CDC', status: 'Mitigated' },
];

const outcomes = [
  { title: 'Primary Outcome', desc: 'A trained Random Forest model achieving ≥90% accuracy for Type-2 diabetes risk classification', done: true },
  { title: 'Secondary Outcome', desc: 'Comparative analysis of 4 ML algorithms with comprehensive performance metrics', done: true },
  { title: 'Dashboard Outcome', desc: 'Interactive web dashboard for real-time diabetes risk prediction from patient data input', done: true },
  { title: 'CVD Outcome', desc: 'Cardiovascular comorbidity detection alongside diabetes risk prediction', done: true },
  { title: 'Documentation', desc: 'Complete literature survey (30 papers), system design, and project report', done: true },
  { title: 'Innovation', desc: 'Integrated lifestyle+biochemical dataset with SMOTE balancing for improved minority class recall', done: true },
];

const innovationPoints = [
  { title: 'Lifestyle Integration', desc: 'Combines lifestyle factors (activity, diet, sleep, smoking) with biochemical markers — most studies use only clinical data', icon: <Lightbulb size={20} /> },
  { title: 'CVD Comorbidity', desc: 'Explicitly models Type-2 diabetes + Cardiovascular Disease as comorbidity — novel in this dataset context', icon: <Heart size={20} /> },
  { title: 'Ensemble Approach', desc: 'Voting ensemble of 4 diverse algorithms reduces individual model bias and improves generalization', icon: <Target size={20} /> },
  { title: 'Explainability', desc: 'SHAP values for feature attribution — move beyond "black box" to interpretable clinical insights', icon: <Search size={20} /> },
  { title: 'Interactive Dashboard', desc: 'Real-time prediction UI built with React + FastAPI — bridges ML research and clinical usability', icon: <BarChart2 size={20} /> },
];

export default function ProjectTimeline() {
  const today = 11; // Week 11 of 20 (approx mid-project)

  return (
    <div className="animate-fade-in" style={{ padding: '20px 0' }}>
      <div className="mb-32" style={{ textAlign: 'left' }}>
        <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em' }}>
          Strategic <span style={{ color: 'var(--accent-primary)' }}>Roadmap</span>
        </h2>
        <p className="section-subtitle" style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Chronological project execution pathway, technical viability, and outcome metrics
        </p>
      </div>

      {/* Gantt Chart */}
      <div className="card mb-32 card-glow-primary">
        <div className="card-header" style={{ marginBottom: '24px' }}>
          <div>
            <div className="card-title" style={{ fontSize: '18px' }}>Project Execution Cycle</div>
            <div className="card-subtitle">Detailed 20-week development and research trajectory</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-success" style={{ padding: '6px 12px' }}>Operational</span>
            <span className="badge badge-primary" style={{ padding: '6px 12px' }}>Q3/Q4 2024</span>
          </div>
        </div>

        {/* Week headers */}
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ minWidth: 700 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 8, marginBottom: 4 }}>
              <div style={{ fontSize: 11, color: '#475569' }}>Phase</div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${TOTAL_WEEKS}, 1fr)`, gap: 2 }}>
                {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
                  <div key={i} style={{ fontSize: 9, color: i + 1 === today ? '#818cf8' : '#475569', textAlign: 'center', fontWeight: i + 1 === today ? 800 : 400 }}>
                    W{i + 1}
                  </div>
                ))}
              </div>
            </div>

            {ganttData.map((task, i) => {
              const isComplete = task.start + task.duration <= today;
              const isActive = task.start < today && task.start + task.duration >= today;
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {isComplete ? <CheckCircle2 size={12} className="text-success" /> : isActive ? <Clock size={12} className="text-warning" /> : <List size={12} className="text-primary" />} {task.task}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${TOTAL_WEEKS}, 1fr)`, gap: 2, height: 22 }}>
                    {Array.from({ length: TOTAL_WEEKS }, (_, w) => {
                      const inTask = w >= task.start && w < task.start + task.duration;
                      const isFirst = w === task.start;
                      const isLast = w === task.start + task.duration - 1;
                      const past = w < today;
                      return (
                        <div key={w} style={{
                          height: '100%',
                          background: inTask ? (past || isComplete ? task.color : `${task.color}60`) : 'transparent',
                          borderRadius: `${isFirst ? 4 : 0}px ${isLast ? 4 : 0}px ${isLast ? 4 : 0}px ${isFirst ? 4 : 0}px`,
                          border: w === today - 1 ? '2px solid rgba(129,140,248,0.8)' : 'none',
                          boxShadow: inTask && (isComplete || past) ? `0 0 8px ${task.color}60` : 'none',
                        }} />
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Today marker */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 8, marginTop: 4 }}>
              <div />
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${TOTAL_WEEKS}, 1fr)`, gap: 2 }}>
                {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    {i + 1 === today && <div style={{ fontSize: 9, color: '#818cf8', fontWeight: 700 }}>▲ Now</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="card mb-24">
        <div className="card-header">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={18} className="text-danger" />
            Risk Assessment Matrix
          </div>
          <div className="card-subtitle">Identified risks, impact analysis, and mitigation strategies</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr><th>Risk</th><th>Impact</th><th>Probability</th><th>Mitigation Strategy</th><th>Status</th></tr>
            </thead>
            <tbody>
              {riskItems.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>{r.risk}</td>
                  <td>
                    <span className={`badge ${r.impact === 'High' ? 'badge-danger' : r.impact === 'Medium' ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: 10 }}>
                      {r.impact}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${r.prob === 'High' ? 'badge-danger' : r.prob === 'Medium' ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: 10 }}>
                      {r.prob}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: '#94a3b8', maxWidth: 250 }}>{r.mitigation}</td>
                  <td>
                    <span className={`badge ${r.status === 'Mitigated' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: 10 }}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expected Outcomes + Innovation */}
      <div className="grid-2 mb-24">
        <div className="card">
          <div className="card-title mb-16" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={18} className="text-secondary" />
            Expected Outcomes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {outcomes.map((o, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                <div style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>
                  {o.done ? <CheckCircle2 size={18} className="text-success" /> : <Clock size={18} className="text-warning" />}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc', marginBottom: 2 }}>{o.title}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{o.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title mb-16">🌟 Innovation & Uniqueness</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {innovationPoints.map((p, i) => (
              <div key={i} style={{ padding: '10px 14px', background: 'rgba(99,102,241,0.08)', borderRadius: 8, borderLeft: '3px solid #6366f1' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc', marginBottom: 2 }}>
                  {p.icon} {p.title}
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feasibility Analysis */}
      <div className="card card-glow-success">
        <div className="card-header" style={{ marginBottom: '32px' }}>
          <div>
            <div className="card-title" style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={24} className="text-success" /> Sustained Viability Engine
            </div>
            <div className="card-subtitle">Triple-constraint feasibility assessment scoring</div>
          </div>
        </div>
        <div className="grid-3" style={{ gap: '20px' }}>
          {[
            {
              type: 'Technical Foundation',
              score: 95,
              points: ['Python Scikit-Learn Ecosystem', 'NHANES High-Fidelity Dataset', 'Full-Stack React + FastAPI', 'Non-linear ML Classifiers'],
              color: 'var(--accent-success)',
            },
            {
              type: 'Economic Viability',
              score: 100,
              points: ['Zero-Cost Open Source Stack', 'Public Domain CDC Repository', 'Edge-Computing Low Overhead', 'Scalable Micro-Architecture'],
              color: 'var(--accent-primary)',
            },
            {
              type: 'Operational Impact',
              score: 88,
              points: ['Clinical Decision Support UI', 'Human-Centric Design Pattern', 'Automated Diagnostic Pipeline', 'Low-Latency Inference Engine'],
              color: 'var(--accent-warning)',
            },
          ].map((f, i) => (
            <div key={i} className="glass-morphism" style={{ borderRadius: '16px', padding: '24px', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', fontSize: '15px' }}>{f.type}</div>
              <div style={{ fontSize: '42px', fontWeight: 900, color: f.color, marginBottom: '16px', letterSpacing: '-0.03em' }}>{f.score}%</div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${f.score}%`, background: f.color, borderRadius: '4px', boxShadow: `0 0 15px ${f.color}40` }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {f.points.map((pt, j) => (
                  <div key={j} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={12} style={{ color: f.color }} /> {pt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
