import React, { useState } from 'react';
import { Layers, Play, HardDrive, Settings, HelpCircle, Activity, FlaskConical, CheckCircle2, StopCircle, User, Package, Monitor, Cpu, Code } from 'lucide-react';

const Box = ({ children, style, color }) => (
  <div style={{
    background: color ? `rgba(${color},0.08)` : 'rgba(99,102,241,0.08)',
    border: color ? `1px solid rgba(${color},0.25)` : '1px solid rgba(99,102,241,0.25)',
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 12,
    fontWeight: 600,
    color: '#f8fafc',
    textAlign: 'center',
    ...style,
  }}>
    {children}
  </div>
);

const Arrow = ({ label = '', dir = 'down' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
    {dir === 'down' && <div style={{ width: 2, height: 20, background: 'rgba(255,255,255,0.2)' }} />}
    {label && <div style={{ fontSize: 10, color: '#94a3b8', background: '#0D1121', padding: '0 6px', borderRadius: 4 }}>{label}</div>}
    {dir === 'down' && (
      <svg width="10" height="8" viewBox="0 0 10 8" fill="#94a3b8">
        <polygon points="5,8 0,0 10,0" />
      </svg>
    )}
  </div>
);

export default function SystemDesign() {
  const [activeTab, setActiveTab] = useState('flowchart');

  return (
    <div className="animate-fade-in" style={{ padding: '20px 0' }}>
      <div className="mb-32" style={{ textAlign: 'left' }}>
        <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          System <span style={{ color: 'var(--accent-primary)' }}>Architecture</span>
        </h2>
        <p className="section-subtitle" style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Technical blueprints, multi-level data flow diagrams, and logical component orchestration
        </p>
      </div>

      <div className="tab-list mb-32">
        {['flowchart', 'dfd', 'sequence', 'architecture'].map(t => (
          <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'flowchart' && (
        <div className="card shadow-glow">
          <div className="card-header" style={{ marginBottom: '32px' }}>
            <div>
              <div className="card-title" style={{ fontSize: '18px' }}>Operational Logic Engine</div>
              <div className="card-subtitle">End-to-end ML training and inference pipeline connectivity</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: 0, position: 'relative' }}>
            <Box style={{ borderRadius: '50px', padding: '12px 40px', minWidth: '150px', background: 'var(--grad-primary)', color: 'white', border: 'none', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
              <Play size={14} style={{ display: 'inline', marginRight: '8px' }} fill="white" /> INITIALIZE
            </Box>
            <Arrow />

            <Box style={{ minWidth: '240px', padding: '20px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)' }}>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <HardDrive size={16} /> Registry Ingestion
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>NHANES Clinical Observables (N=22k)</div>
            </Box>
            <Arrow />

            <Box style={{ minWidth: '260px', padding: '20px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)' }}>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <Settings size={16} /> Data Normalization Unit
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>Denoising · Imputation · Target Encoding</div>
            </Box>
            <Arrow />

            <div className="glass-morphism" style={{ padding: '20px 30px', borderRadius: '12px', border: '2px solid var(--accent-warning)', textAlign: 'center', minWidth: '200px', boxShadow: '0 0 20px rgba(245,158,11,0.2)' }}>
              <div style={{ fontWeight: 900, color: 'var(--accent-warning)', fontSize: '13px' }}>NULL VALUES PRESENT?</div>
            </div>
            
            <div style={{ display: 'flex', gap: '100px', marginTop: '10px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-danger)' }}>YES ⇠</div>
                <Arrow />
                <Box style={{ fontSize: '10px', padding: '10px', border: '1px dashed var(--accent-danger)', background: 'rgba(239,68,68,0.05)' }}>Apply Median Imputation</Box>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-success)' }}>⇢ NO</div>
                <Arrow />
                <Box style={{ minWidth: '160px', background: 'rgba(16,185,129,0.1)', border: '1px solid var(--accent-success)' }}>Feature Space Selection</Box>
              </div>
            </div>

            <Arrow />
            
            <Box style={{ minWidth: '280px', padding: '24px', background: 'var(--grad-primary)', color: 'white', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ fontWeight: 900, fontSize: '15px' }}>ENSEMBLE MACHINE TRAINING</div>
              <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>LR · DT · SVM · Random Forest CV</div>
            </Box>

            <Arrow />

            <div className="glass-morphism" style={{ padding: '20px 30px', borderRadius: '12px', border: '2px solid var(--accent-warning)', textAlign: 'center', minWidth: '200px' }}>
              <div style={{ fontWeight: 900, color: 'var(--accent-warning)', fontSize: '13px' }}>METRICS ≥ 0.90?</div>
            </div>

            <div style={{ display: 'flex', gap: '100px', marginTop: '10px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-danger)' }}>NO ⇠</div>
                <Arrow />
                <Box style={{ fontSize: '10px', padding: '10px' }}>Hyperparameter Tuning</Box>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-success)' }}>⇢ YES</div>
                <Arrow />
                <Box style={{ minWidth: '160px', background: 'var(--grad-success)', color: 'white', border: 'none' }}>DEPLOY INFERENCE</Box>
              </div>
            </div>

            <Arrow />
            <Box style={{ borderRadius: '50px', padding: '12px 40px', minWidth: '150px', background: 'var(--accent-danger)', color: 'white', border: 'none' }}>
              TERMINATE
            </Box>
          </div>
        </div>
      )}

      {activeTab === 'dfd' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card shadow-glow">
            <div className="card-header" style={{ marginBottom: '32px' }}>
              <div>
                <div className="card-title" style={{ fontSize: '18px' }}>DFD Level 0 — Contextual Analysis</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '40px 0', flexWrap: 'wrap' }}>
              <Box style={{ padding: '20px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <User size={24} /> Clinician /<br/>Patient
              </Box>
              <div style={{ fontSize: '24px', color: 'var(--text-muted)' }}>⟶</div>
              <Box style={{ padding: '30px 40px', background: 'var(--grad-primary)', border: 'none', boxShadow: '0 0 40px rgba(99,102,241,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Layers size={24} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 900 }}>DP SYSTEMS</div>
                  <div style={{ fontSize: '10px', opacity: 0.8 }}>CORE LOGIC</div>
                </div>
              </Box>
              <div style={{ fontSize: '24px', color: 'var(--text-muted)' }}>⟶</div>
              <Box style={{ padding: '20px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Activity size={24} /> Prognostic<br/>Indicators
              </Box>
            </div>
          </div>

          <div className="card">
            <div className="card-header" style={{ marginBottom: '24px' }}>
              <div className="card-title" style={{ fontSize: '18px' }}>DFD Level 1 — Modular Segmentation</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[
                { id: '1.0', label: 'Ingestion', desc: 'Clinical Data Stream', color: '6,182,212' },
                { id: '2.0', label: 'Synthesis', desc: 'Vectorization Logic', color: '139,92,246' },
                { id: '3.0', label: 'Inference', desc: 'Model Evaluation', color: '99,102,241' },
                { id: '4.0', label: 'Reporting', desc: 'UI Visualization', color: '16,185,129' },
              ].map((p, i) => (
                <div key={i}>
                  <Box color={p.color} style={{ padding: '20px', textAlign: 'left' }}>
                    <div style={{ fontSize: '22px', fontWeight: 900, marginBottom: '4px' }}>{p.id}</div>
                    <div style={{ fontSize: '14px', fontWeight: 800 }}>{p.label}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{p.desc}</div>
                  </Box>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sequence' && (
        <div className="card shadow-glow">
          <div className="card-header" style={{ marginBottom: '32px' }}>
            <div className="card-title" style={{ fontSize: '18px' }}>Control Flow Sequence</div>
          </div>
          <div style={{ overflowX: 'auto', paddingBottom: '40px' }}>
            <div style={{ position: 'relative', width: '1000px', margin: '0 auto', minHeight: '600px' }}>
              <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
                {['User', 'UI', 'Backend', 'Model', 'DB'].map((a, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px' }}>
                    <div style={{ background: 'var(--grad-primary)', borderRadius: '12px', padding: '10px', width: '100%', textAlign: 'center', fontWeight: 800, fontSize: '13px', zIndex: 10 }}>{a}</div>
                    <div style={{ width: '2px', height: '500px', background: 'rgba(255,255,255,0.05)', borderLeft: '1px dashed rgba(255,255,255,0.1)' }}></div>
                  </div>
                ))}
              </div>
              <div style={{ position: 'absolute', top: '80px', left: '0', width: '100%', fontSize: '11px', fontWeight: 700 }}>
                {[
                  { label: 'Submit Parameters', from: 0, to: 1, y: 0 },
                  { label: 'v1/predict (Request)', from: 1, to: 2, y: 40 },
                  { label: 'Fetch Constraints', from: 2, to: 4, y: 80 },
                  { label: 'Compute Indices', from: 2, to: 3, y: 120 },
                  { label: 'Log Results', from: 2, to: 4, y: 160 },
                  { label: 'Stream Payload', from: 2, to: 1, y: 200, reverse: true },
                  { label: 'Update Viewstate', from: 1, to: 0, y: 240, reverse: true },
                ].map((s, i) => {
                  const x1 = 150 + s.from * 200;
                  const x2 = 150 + s.to * 200;
                  return (
                    <div key={i} style={{ position: 'absolute', top: s.y, left: Math.min(x1, x2), width: Math.abs(x2 - x1), padding: '4px', textAlign: 'center', color: 'var(--accent-primary)', borderBottom: '2px solid var(--accent-primary)40' }}>
                      {s.label} {s.reverse ? '⇠' : '⇢'}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'architecture' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="grid-3">
            {[
              { title: 'Frontend Stack', icon: <Monitor />, list: ['React 18', 'Vite 7', 'Recharts', 'Lucide'] },
              { title: 'Backend Core', icon: <Settings />, list: ['FastAPI', 'Pandas', 'NumPy', 'REST'] },
              { title: 'ML Framework', icon: <Cpu />, list: ['scikit-learn', 'SMOTE', 'GridSearch', 'RF'] },
            ].map((layer, i) => (
              <div key={i} className="card shadow-glow" style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{layer.icon}</div>
                <div style={{ fontWeight: 900, color: 'var(--text-primary)', marginBottom: '12px' }}>{layer.title}</div>
                {layer.list.map((item, j) => (
                  <div key={j} style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{item}</div>
                ))}
              </div>
            ))}
          </div>

          <div className="card glass-morphism">
            <div className="card-header" style={{ marginBottom: '20px' }}>
              <div className="card-title" style={{ fontSize: '18px' }}>Technology Ecosystem</div>
            </div>
            <div className="grid-4">
              {['Python 3.11', 'FastAPI', 'React', 'scikit-learn', 'SMOTE', 'Pandas', 'Recharts', 'Vite'].map((tech, i) => (
                <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center', fontWeight: 800, fontSize: '13px', color: 'var(--text-primary)' }}>
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
