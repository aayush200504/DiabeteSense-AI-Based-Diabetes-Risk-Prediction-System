import React, { useState } from 'react';
import { BookOpen, Target, Search, Microscope, CheckCircle2, BarChart2, AlertCircle, AlertTriangle, RefreshCw, Star } from 'lucide-react';
import { researchPapers } from '../data/mockData';

export default function LiteratureSurvey() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const methods = ['All', 'Random Forest', 'SVM', 'Deep Learning', 'Statistical', 'Logistic Reg.'];

  const filtered = researchPapers.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()) ||
      p.method.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || p.method.toLowerCase().includes(filter.toLowerCase());
    return matchSearch && matchFilter;
  });

  return (
    <div className="animate-fade-in" style={{ padding: '20px 0' }}>
      <div className="mb-32" style={{ textAlign: 'left' }}>
        <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Literature <span style={{ color: 'var(--accent-primary)' }}>Corpus</span>
        </h2>
        <p className="section-subtitle" style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Meta-analysis and systematic review of 30+ peer-reviewed papers on prognostic ML logic
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {[
          { label: 'Papers Analyzed', value: '30+', color: 'var(--accent-primary)' },
          { label: 'Discrete Methods', value: '14', color: 'var(--accent-success)' },
          { label: 'Temporal Scope', value: '2017–24', color: 'var(--accent-warning)' },
          { label: 'Auth. Journals', value: 'Nature/JAMA', color: 'var(--accent-secondary)' },
        ].map((s, i) => (
          <div key={i} className="card glass-morphism shadow-glow" style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: s.color, letterSpacing: '-0.02em', marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Research Gap */}
      <div className="card shadow-glow mb-32" style={{ background: 'var(--grad-primary)', border: 'none', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1, transform: 'rotate(15deg)' }}>
          <Target size={200} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, padding: '32px' }}>
          <div className="card-title" style={{ fontSize: '18px', color: 'white', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Target size={24} /> Synthesis & Research Gap
          </div>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, maxWidth: '85%' }}>
            Existing literature emphasizes isolated biomarkers, leaving a critical <strong style={{ color: 'white' }}>logical bridge unbuilt</strong>. Most studies focus on single-modality clinical data. Our framework creates a <strong style={{ color: 'white' }}>unified prognostic engine</strong> by fusing NHANES metabolic profiles with lifestyle-active variables (BMI/Insulin/OGTT), specifically targeting comorbidity clusters that previous research often overlooks.
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search papers, authors, or algorithms..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '48px', height: '48px', borderRadius: '12px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {methods.map(m => (
            <button key={m}
              onClick={() => setFilter(m)}
              className={`tab-btn ${filter === m ? 'active' : ''}`}
              style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '100px' }}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="card glass-morphism mb-32">
        <div className="card-header" style={{ marginBottom: '24px' }}>
          <div className="card-title" style={{ fontSize: '18px' }}>Empirical Matrix ({filtered.length})</div>
          <div className="badge badge-primary">Structured Review v2.1</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Research Title</th>
                <th>Author(s)</th>
                <th>Metric</th>
                <th>Algorithm</th>
                <th>Core Inference</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>{p.sno}</td>
                  <td style={{ maxWidth: '300px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>{p.title}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{p.author}</td>
                  <td><span className="badge badge-info">{p.year}</span></td>
                  <td><span className="badge badge-primary" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(99,102,241,0.2)' }}>{p.method}</span></td>
                  <td style={{ fontSize: '11px', color: 'var(--text-muted)', maxWidth: '250px', lineHeight: 1.5 }}>{p.finding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <Search size={40} style={{ opacity: 0.2, marginBottom: '16px' }} />
            <div>No matching literature identified for the current query.</div>
          </div>
        )}
      </div>

      {/* Logic Summaries */}
      <div className="grid-2">
        <div className="card glass-morphism">
          <div className="card-title mb-24" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Microscope size={20} className="text-secondary" /> Consensus Observations
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { point: 'Ensemble methods (RF/XGBoost) show 12% higher AUC across 18/30 papers.', color: 'var(--accent-success)' },
              { point: 'Insulin sensitivity indices (HOMA-IR) are the most cited novel feature.', color: 'var(--accent-primary)' },
              { point: 'Deep Learning requires N>50k for significant margin over Random Forest.', color: 'var(--accent-warning)' },
            ].map((o, i) => (
              <div key={i} className="glass-morphism" style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', borderLeft: `4px solid ${o.color}` }}>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{o.point}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass-morphism">
          <div className="card-title mb-24" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RefreshCw size={20} className="text-secondary" /> Methodological Shifts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { point: 'Transition from single-marker to multi-modal (Bio+Physio) risk scoring.', color: 'var(--accent-secondary)' },
              { point: 'Universal adoption of SMOTE for minority class (Pre-diabetic) enrichment.', color: 'var(--accent-danger)' },
              { point: 'Increased focus on explainability (SHAP/LIME) in clinical diagnostics.', color: 'var(--accent-info)' },
            ].map((o, i) => (
              <div key={i} className="glass-morphism" style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', borderLeft: `4px solid ${o.color}` }}>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{o.point}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
