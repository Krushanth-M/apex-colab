import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Download, FileText, PieChart, Activity, Zap, Clock, CheckCircle } from 'lucide-react';
import { CURRENT_USER, CONTRIBUTION_HEATMAP } from '../mockData';

export default function Analytics() {
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = (type) => {
    setExportSuccess(type);
    setTimeout(() => {
      setExportSuccess(false);
    }, 3000);
  };

  const DEPT_STATS = [
    { name: 'Computer Science', value: 92 },
    { name: 'Artificial Intelligence / ML', value: 88 },
    { name: 'Design & Interaction', value: 76 },
    { name: 'Business Management', value: 68 },
    { name: 'Finance & Economics', value: 61 },
    { name: 'Mechanical & Robotics', value: 44 }
  ];

  const STAGE_DIST = [
    { label: 'Idea Stage', pct: '35%', color: 'var(--violet)' },
    { label: 'Prototype Stage', pct: '28%', color: 'var(--cyan)' },
    { label: 'MVP Launched', pct: '22%', color: 'var(--green)' },
    { label: 'Seed Funded', pct: '15%', color: '#f59e0b' }
  ];

  return (
    <div className="fade-in" style={{ padding: '40px 48px', width: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="fade-up d1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Analytics & Faculty Reports</h1>
          <p style={{ color: 'var(--text-2)' }}>Comprehensive tracking of campus startup velocities, student contributions, and academic metrics.</p>
        </div>
        <button onClick={() => handleExport('Global Platform')} className="btn btn-ghost">
          <Download size={16} /> Export Consolidated Report
        </button>
      </div>

      {exportSuccess && (
        <div className="toast toast-success" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
          <CheckCircle size={20} style={{ color: '#10b981' }} />
          <div>
            <div style={{ fontWeight: '700' }}>Report Exported!</div>
            <div style={{ fontSize: '12px' }}>"{exportSuccess}" PDF generation successfully compiled and downloaded.</div>
          </div>
        </div>
      )}

      {/* KPI Cards Row */}
      <div className="fade-up d2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="card highlight-box" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: '700', textTransform: 'uppercase' }}>Campus Users</span>
            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: '800' }}>
              <TrendingUp size={12} /> +18% MoM
            </span>
          </div>
          <div className="stat-number" style={{ fontSize: '28px' }}>12,847</div>
          {/* Mini chart */}
          <div style={{ display: 'flex', gap: '3px', alignItems: 'end', height: '24px', marginTop: '16px' }}>
            {[10, 15, 8, 22, 17, 30, 25, 40].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--violet)', borderRadius: '1px' }}></div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: '700', textTransform: 'uppercase' }}>Active Teams</span>
            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: '800' }}>
              <TrendingUp size={12} /> +8%
            </span>
          </div>
          <div className="stat-number" style={{ fontSize: '28px' }}>1,204</div>
          <div style={{ display: 'flex', gap: '3px', alignItems: 'end', height: '24px', marginTop: '16px' }}>
            {[20, 25, 18, 30, 22, 28, 35, 45].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--cyan)', borderRadius: '1px' }}></div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: '700', textTransform: 'uppercase' }}>Incubated Startups</span>
            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: '800' }}>
              <TrendingUp size={12} /> +31%
            </span>
          </div>
          <div className="stat-number" style={{ fontSize: '28px' }}>342</div>
          <div style={{ display: 'flex', gap: '3px', alignItems: 'end', height: '24px', marginTop: '16px' }}>
            {[5, 12, 10, 18, 25, 20, 32, 50].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--violet)', borderRadius: '1px' }}></div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: '700', textTransform: 'uppercase' }}>Mentor Sessions</span>
            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: '800' }}>
              <TrendingUp size={12} /> +12%
            </span>
          </div>
          <div className="stat-number" style={{ fontSize: '28px' }}>8,910</div>
          <div style={{ display: 'flex', gap: '3px', alignItems: 'end', height: '24px', marginTop: '16px' }}>
            {[12, 18, 15, 24, 30, 28, 42, 55].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--cyan)', borderRadius: '1px' }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Charts grid */}
      <div className="fade-up d3" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '28px', marginBottom: '32px' }}>
        {/* Department Innovation Stats */}
        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Department-wise Innovation Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {DEPT_STATS.map((dept, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '600' }}>{dept.name}</span>
                  <span style={{ color: 'var(--violet)', fontWeight: '700' }}>{dept.value}% Velocity</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill progress-violet" style={{ width: `${dept.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Startup Stage Distribution */}
        <div className="card highlight-box" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Startup Stage Distribution</h3>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            {/* CSS Conic Gradient Donut */}
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'conic-gradient(var(--violet) 0% 35%, var(--cyan) 35% 63%, var(--green) 63% 85%, #f59e0b 85% 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(212,175,55,0.1)'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'var(--bg-2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--text)' }}>342</span>
                <span style={{ fontSize: '9px', color: 'var(--text-3)', textTransform: 'uppercase' }}>Active Projects</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: 'auto' }}>
            {STAGE_DIST.map((stage, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: stage.color }}></span>
                <span style={{ color: 'var(--text-2)' }}>{stage.label} ({stage.pct})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contribution Heatmap */}
      <div className="card fade-up d4" style={{ padding: '32px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Global Contribution Index</h3>
        <p style={{ color: 'var(--text-2)', fontSize: '12px', marginBottom: '24px' }}>Real-time team collaboration score mapped from git repositories and milestone completion timelines.</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '100%', overflowX: 'auto', paddingBottom: '12px' }}>
          {CONTRIBUTION_HEATMAP.map((week, wIdx) => (
            <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  className="heatmap-cell"
                  style={{
                    background: day === 0 ? 'rgba(255,255,255,0.02)' :
                                day === 1 ? 'rgba(212, 175, 55, 0.15)' :
                                day === 2 ? 'rgba(212, 175, 55, 0.4)' :
                                day === 3 ? 'rgba(170, 124, 17, 0.7)' :
                                            'rgba(212, 175, 55, 0.95)',
                    border: '1px solid rgba(0,0,0,0.5)'
                  }}
                  title={`Level ${day} Contribution`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Export Reports */}
      <div className="fade-up d5">
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Export Special Reports</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div className="icon-box icon-box-violet" style={{ width: '40px', height: '40px' }}>
                <FileText size={20} />
              </div>
              <div>
                <h4 style={{ fontWeight: '700', fontSize: '15px' }}>Faculty Innovation Report</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>Dean overview and grading metrics</p>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-2)', marginBottom: '20px' }}>
              Summarizes student performance, hackathon wins, milestone completion, and cross-college engagements for official credits.
            </p>
            <button onClick={() => handleExport('Faculty Innovation')} className="btn btn-sm btn-violet" style={{ marginTop: 'auto' }}>
              <Download size={12} /> Export PDF Report
            </button>
          </div>

          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div className="icon-box icon-box-cyan" style={{ width: '40px', height: '40px' }}>
                <FileText size={20} />
              </div>
              <div>
                <h4 style={{ fontWeight: '700', fontSize: '15px' }}>Corporate Sponsor Deck</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>For hackathon partners & patrons</p>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-2)', marginBottom: '20px' }}>
              Features ecosystem metrics, user statistics, talent directories, and project visibility reports for corporate sponsor review.
            </p>
            <button onClick={() => handleExport('Corporate Sponsor')} className="btn btn-sm btn-violet" style={{ marginTop: 'auto' }}>
              <Download size={12} /> Export PDF Deck
            </button>
          </div>

          <div className="card highlight-box" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div className="icon-box icon-box-amber" style={{ width: '40px', height: '40px' }}>
                <FileText size={20} />
              </div>
              <div>
                <h4 style={{ fontWeight: '700', fontSize: '15px' }}>Investor Pitch Brief</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>Milestone tracker & feasibility</p>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-2)', marginBottom: '20px' }}>
              Compiles startup ideas validation scores, community feedback metrics, MRR progress, and smart feasibility ratings.
            </p>
            <button onClick={() => handleExport('Investor Pitch Briefing')} className="btn btn-sm btn-violet" style={{ marginTop: 'auto' }}>
              <Download size={12} /> Export Briefing PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
