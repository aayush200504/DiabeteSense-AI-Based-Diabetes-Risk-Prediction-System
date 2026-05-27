import { 
  LayoutDashboard, Activity, Database, BarChart3, PieChart, 
  Settings, BookOpen, Clock, Layers, Stethoscope, Search, Bell
} from 'lucide-react';

const SidebarIcon = ({ name }) => {
  const iconProps = { size: 18, strokeWidth: 1.8 };
  const icons = {
    dashboard: <LayoutDashboard {...iconProps} />,
    predict: <Stethoscope {...iconProps} />,
    dataset: <Database {...iconProps} />,
    stats: <BarChart3 {...iconProps} />,
    viz: <PieChart {...iconProps} />,
    models: <Activity {...iconProps} />,
    design: <Layers {...iconProps} />,
    literature: <BookOpen {...iconProps} />,
    gantt: <Clock {...iconProps} />,
    settings: <Settings {...iconProps} />,
  };
  return icons[name] || null;
};

const navItems = [
  { id: 'dashboard',   label: 'Overview',          icon: 'dashboard',   section: 'MAIN' },
  { id: 'predict',     label: 'Risk Predictor',     icon: 'predict',     section: 'MAIN' },
  { id: 'dataset',     label: 'Dataset & Preprocessing', icon: 'dataset', section: 'ANALYSIS' },
  { id: 'stats',       label: 'Statistical Analysis',icon: 'stats',      section: 'ANALYSIS' },
  { id: 'viz',         label: 'Data Visualizations',icon: 'viz',         section: 'ANALYSIS' },
  { id: 'models',      label: 'ML Models',          icon: 'models',      section: 'ML' },
  { id: 'design',      label: 'System Design',      icon: 'design',      section: 'ML' },
  { id: 'literature',  label: 'Literature Survey',  icon: 'literature',  section: 'DOCS' },
  { id: 'gantt',       label: 'Project Timeline',   icon: 'gantt',       section: 'DOCS' },
];

export default function Sidebar({ active, onNav }) {
  const sections = [...new Set(navItems.map(n => n.section))];

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Stethoscope size={22} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <div className="logo-text">DiabetesSense</div>
          <div className="logo-sub">AI Risk Prediction</div>
        </div>
      </div>

      <div className="sidebar-nav">
        {sections.map(section => (
          <div key={section}>
            <div className="nav-section-label">{section}</div>
            {navItems.filter(n => n.section === section).map(item => (
              <div
                key={item.id}
                className={`nav-item ${active === item.id ? 'active' : ''}`}
                onClick={() => onNav(item.id)}
              >
                <span className="nav-icon"><SidebarIcon name={item.icon} /></span>
                {item.label}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="status-badge">
          <div className="status-dot" />
          <div>
            <div style={{ fontWeight: 600 }}>Models Online</div>
            <div style={{ fontSize: 10, opacity: 0.7 }}>RF Accuracy: 94.7%</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
