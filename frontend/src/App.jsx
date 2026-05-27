import React, { useState } from 'react';
import { Search, Bell, Database, Cpu, Trophy, Sparkles } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RiskPredictor from './pages/RiskPredictor';
import DatasetPage from './pages/DatasetPage';
import StatisticalAnalysis from './pages/StatisticalAnalysis';
import Visualizations from './pages/Visualizations';
import MLModels from './pages/MLModels';
import SystemDesign from './pages/SystemDesign';
import LiteratureSurvey from './pages/LiteratureSurvey';
import ProjectTimeline from './pages/ProjectTimeline';

const pageMap = {
  dashboard:  { component: Dashboard,          title: 'Project Overview',          sub: 'Diabetes Risk Prediction — NHANES Dataset Analysis' },
  predict:    { component: RiskPredictor,      title: 'Risk Predictor',             sub: 'Enter patient data for real-time ML-based prediction' },
  dataset:    { component: DatasetPage,        title: 'Dataset & Preprocessing',    sub: 'NHANES dataset analysis and 7-stage preprocessing pipeline' },
  stats:      { component: StatisticalAnalysis,title: 'Statistical Analysis',       sub: 'Descriptive statistics, correlation matrix, and variance analysis' },
  viz:        { component: Visualizations,     title: 'Data Visualizations',        sub: 'Histograms, bar charts, heatmaps, scatter plots, radar charts' },
  models:     { component: MLModels,           title: 'ML Models',                  sub: 'LR · DT · RF · SVM — Accuracy, AUC-ROC, Confusion Matrix' },
  design:     { component: SystemDesign,       title: 'System Design',              sub: 'Block diagram, DFD Level 0–3, Sequence diagram' },
  literature: { component: LiteratureSurvey,   title: 'Literature Survey',          sub: '30 research papers on diabetes ML prediction' },
  gantt:      { component: ProjectTimeline,    title: 'Project Timeline',           sub: 'Gantt chart, risks, feasibility, and expected outcomes' },
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const { component: PageComponent, title, sub } = pageMap[activePage] || pageMap.dashboard;

  return (
    <div className="app-layout">
      <Sidebar active={activePage} onNav={setActivePage} />

      <div className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-left">
            <h1>{title}</h1>
            <p>{sub}</p>
          </div>
          <div className="header-right">
            <div className="header-btn">
              <Search size={14} />
              Search
            </div>
            <div className="header-btn">
              <Bell size={14} />
              Alerts
            </div>
            <div className="avatar" title="Student Profile">AL</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-container" key={activePage}>
          <PageComponent />
        </main>

        {/* Footer */}
        <footer style={{
          padding: '16px 28px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          color: '#475569',
          background: 'var(--bg-secondary)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} className="text-accent" />
            <strong style={{ color: '#94a3b8' }}>DiabetesSense AI</strong> — Diabetes Risk Prediction Framework ·
            Mini Project Review-1 · 2025–26
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Database size={12} /> <span>NHANES (CDC)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Cpu size={12} /> <span>RF | SVM | DT | LR</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981' }}>
              <Trophy size={14} /> <strong>94.7% Accuracy</strong>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
