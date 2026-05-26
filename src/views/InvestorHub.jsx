import { useState } from 'react';
import { STARTUPS, CURRENT_USER } from '../mockData';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  FileText,
  Search,
  Filter,
  Check,
  Send,
  Zap,
  Star,
  Shield,
  Building,
  Target
} from 'lucide-react';

// Helper for stage colors
function getStageStyles(stage) {
  switch (stage) {
    case 'Seed':
      return { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.4)', color: '#22c55e' };
    case 'MVP':
      return { bg: 'rgba(124, 58, 237, 0.15)', border: 'rgba(124, 58, 237, 0.4)', color: '#a78bfa' };
    case 'Prototype':
      return { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', color: '#f59e0b' };
    default:
      return { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.4)', color: '#06b6d4' };
  }
}

// ─── 1. Investor Dashboard ───────────────────────────────────────────────────

export function InvestorDashboard({ setTab }) {
  const featuredStartup = STARTUPS.find(s => s.id === 1) || STARTUPS[0];

  return (
    <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Welcome Header */}
      <div>
        <h1 className="auth-title" style={{ fontSize: 32, fontWeight: 900, textAlign: 'left', margin: 0 }}>
          Investor Portal
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--text-secondary)' }}>
          Review high-feasibility campus startups, track deployments, and manage active term sheets.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {/* Card 1 */}
        <div className="card highlight-box" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: 'rgba(212, 175, 55, 0.12)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#d4af37'
          }}>
            <DollarSign size={22} />
          </div>
          <div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>
              Capital Deployed
            </span>
            <h3 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>
              ₹2.85 Cr
            </h3>
            <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
              <TrendingUp size={12} /> +18.4% YoY
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card highlight-box" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: 'rgba(124, 58, 237, 0.12)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#a78bfa'
          }}>
            <FileText size={22} />
          </div>
          <div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>
              Active Term Sheets
            </span>
            <h3 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>
              4 Pending
            </h3>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
              2 Signed this week
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card highlight-box" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#06b6d4'
          }}>
            <Target size={22} />
          </div>
          <div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>
              Portfolio Avg Success
            </span>
            <h3 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>
              88.4%
            </h3>
            <span style={{ fontSize: 11, color: '#06b6d4', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
              Top 2% Globally
            </span>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'flex-start' }}>
        {/* Left: Investment Pipelines */}
        <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Layers size={18} color="#d4af37" /> Active Investment Stepper Pipeline
            </h3>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>4 active startups</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {STARTUPS.slice(0, 4).map((startup, idx) => {
              const currentStep = idx + 1; // Simulated stage
              const steps = ['First Contact', 'Pitch Review', 'Term Sheet Signed', 'Due Diligence', 'Capital Wired'];
              
              return (
                <div key={startup.id} style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: 14,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: 14, color: 'var(--text-primary)' }}>{startup.name}</strong>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                        Founded by {startup.founder} · {startup.college}
                      </span>
                    </div>
                    <span style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: '#d4af37',
                      background: 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.25)',
                      borderRadius: 20,
                      padding: '2px 10px'
                    }}>
                      Stage: {steps[currentStep - 1]}
                    </span>
                  </div>

                  {/* Horizontal Stepper Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', height: 16 }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: 3,
                      background: 'rgba(255,255,255,0.06)',
                      zIndex: 1
                    }} />
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      width: `${(currentStep - 1) * 25}%`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: 3,
                      background: 'linear-gradient(90deg, #d4af37, #aa7c11)',
                      zIndex: 2,
                      transition: 'width 0.8s ease'
                    }} />

                    {/* Nodes */}
                    {[1, 2, 3, 4, 5].map((s) => {
                      const isActive = s <= currentStep;
                      return (
                        <div key={s} style={{
                          position: 'absolute',
                          left: `${(s - 1) * 25}%`,
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: isActive ? 'linear-gradient(135deg, #f3e5ab, #aa7c11)' : 'rgba(20, 20, 20, 0.9)',
                          border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)',
                          boxShadow: isActive ? '0 0 8px #d4af37' : 'none',
                          zIndex: 3,
                          transition: 'all 0.4s'
                        }} />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Featured Startup & Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Featured Highlight Card */}
          <div className="card highlight-box" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={16} color="#d4af37" fill="#d4af37" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#d4af37', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Top Ranked Ecosystem Match
              </span>
            </div>

            <div>
              <h4 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
                {featuredStartup.name}
              </h4>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-muted)' }}>
                Founded by {featuredStartup.founder} at **{featuredStartup.college}**
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: 'rgba(255,255,255,0.02)', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: 'var(--text-secondary)' }}>AI Success Feasibility:</span>
                <strong style={{ color: '#22c55e' }}>{featuredStartup.score}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Ecosystem Upvotes:</span>
                <strong style={{ color: '#a78bfa' }}>{featuredStartup.upvotes}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Target TAM size:</span>
                <strong style={{ color: '#06b6d4' }}>{featuredStartup.market}</strong>
              </div>
            </div>

            <button
              onClick={() => setTab('investor-startups')}
              className="btn btn-violet"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
                color: '#050505',
                fontWeight: 700,
                borderRadius: 10,
                padding: '11px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 4px 15px rgba(212,175,55,0.25)'
              }}
            >
              <Zap size={14} />
              <span>Simulate Term Sheet</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
              Portal Access Shortcuts
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button onClick={() => setTab('investor-startups')} className="btn btn-ghost" style={{ padding: '10px 14px', borderRadius: 8, justifyContent: 'flex-start', fontSize: 12.5, borderColor: 'rgba(255,255,255,0.06)', width: '100%', textAlign: 'left' }}>
                🔍 Browse All Ideas
              </button>
              <button onClick={() => setTab('investor-ai-matches')} className="btn btn-ghost" style={{ padding: '10px 14px', borderRadius: 8, justifyContent: 'flex-start', fontSize: 12.5, borderColor: 'rgba(255,255,255,0.06)', width: '100%', textAlign: 'left' }}>
                🧠 AI Novelty Recommendations
              </button>
              <button onClick={() => setTab('rooms')} className="btn btn-ghost" style={{ padding: '10px 14px', borderRadius: 8, justifyContent: 'flex-start', fontSize: 12.5, borderColor: 'rgba(255,255,255,0.06)', width: '100%', textAlign: 'left' }}>
                📹 Join Virtual Pitch Rooms
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Investor Startups ───────────────────────────────────────────────────

export function InvestorStartups() {
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState('All');
  const [activeSimulation, setActiveSimulation] = useState(null); // startup object
  const [fundingOffer, setFundingOffer] = useState(5000000); // 50 Lakhs
  const [equityRequest, setEquityRequest] = useState(10); // 10%
  const [simMessage, setSimMessage] = useState('');

  const filteredStartups = STARTUPS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.founder.toLowerCase().includes(search.toLowerCase()) ||
                          s.college.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stage === 'All' || s.stage === stage;
    return matchesSearch && matchesStage;
  });

  const handleSimulate = (startup) => {
    setActiveSimulation(startup);
    setFundingOffer(5000000);
    setEquityRequest(10);
    setSimMessage('');
  };

  const calculateValuation = () => {
    if (!equityRequest) return 0;
    return (fundingOffer / (equityRequest / 100));
  };

  const submitSimResult = () => {
    const valuation = calculateValuation();
    setSimMessage(`✅ Term sheet generated! Offering ₹${(fundingOffer/100000).toFixed(0)} Lakhs for ${equityRequest}% Equity implies a Post-Money Valuation of ₹${(valuation/10000000).toFixed(2)} Crore. AI predicts founder acceptance probability: 82%!`);
  };

  return (
    <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div>
        <h1 className="auth-title" style={{ fontSize: 32, fontWeight: 900, textAlign: 'left', margin: 0 }}>
          Campus Idea Validation Portal
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--text-secondary)' }}>
          Browse all registered ideas, examine their AI success validation, and run term-sheet simulations.
        </p>
      </div>

      {/* Filter panel */}
      <div className="card" style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14 }} />
          <input
            type="text"
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by startup name, founder, or university..."
            style={{ paddingLeft: 40, width: '100%' }}
          />
        </div>

        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="input"
          style={{ width: 180, background: 'rgba(18, 17, 14, 0.7)', border: '1px solid var(--border)', borderRadius: 10, outline: 'none', color: '#fff', padding: '10px 14px' }}
        >
          <option value="All">All Stages</option>
          <option value="Seed">Seed Stage</option>
          <option value="MVP">MVP Stage</option>
          <option value="Prototype">Prototype Stage</option>
          <option value="Idea">Idea Stage</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: activeSimulation ? '1fr 400px' : '1fr', gap: 24, alignItems: 'flex-start' }}>
        {/* Left: Startups list */}
        <div style={{ display: 'grid', gridTemplateColumns: activeSimulation ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}>
          {filteredStartups.map((s) => {
            const st = getStageStyles(s.stage);
            return (
              <div key={s.id} className="card highlight-box" style={{
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                border: activeSimulation?.id === s.id ? '2px solid #d4af37' : '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                      {s.name}
                    </h4>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                      Founded by {s.founder} · {s.college}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    padding: '3px 8px',
                    borderRadius: 20,
                    background: st.bg,
                    border: `1px solid ${st.border}`,
                    color: st.color
                  }}>
                    {s.stage}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {s.tagline}
                </p>

                {/* KPI block */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, background: 'rgba(255,255,255,0.01)', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block' }}>Success feasibility:</span>
                    <strong style={{ fontSize: 12.5, color: s.score >= 80 ? '#22c55e' : s.score >= 60 ? '#f59e0b' : '#ef4444' }}>
                      {s.score}%
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block' }}>Ecosystem Upvotes:</span>
                    <strong style={{ fontSize: 12.5, color: '#a78bfa' }}>{s.upvotes}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block' }}>Market Target:</span>
                    <strong style={{ fontSize: 12.5, color: '#06b6d4' }}>{s.market}</strong>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => handleSimulate(s)}
                    className="btn btn-violet"
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
                      color: '#050505',
                      fontWeight: 700,
                      borderRadius: 10,
                      padding: '9px 14px',
                      fontSize: 12.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                  >
                    <Zap size={13} />
                    <span>Open simulator</span>
                  </button>
                  
                  <button
                    onClick={() => alert(`Pitch Deck requested from ${s.founder} (${s.college}).`)}
                    className="btn btn-ghost"
                    style={{ padding: '9px 14px', borderRadius: 10, fontSize: 12.5 }}
                  >
                    <FileText size={13} />
                    <span>Request deck</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Valuation & Term sheet simulator panel */}
        {activeSimulation && (
          <div className="card highlight-box" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                  Valuation Simulator
                </h3>
                <span style={{ fontSize: 11, color: '#d4af37', fontWeight: 600 }}>
                  Modeling {activeSimulation.name}
                </span>
              </div>
              <button
                onClick={() => setActiveSimulation(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}
              >
                Close
              </button>
            </div>

            {/* Slider 1: Funding Amount */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Funding Offered:</span>
                <strong style={{ color: '#d4af37' }}>₹{(fundingOffer / 100000).toFixed(0)} Lakhs</strong>
              </div>
              <input
                type="range"
                min="1000000" // 10 Lakh
                max="50000000" // 5 Cr
                step="500000"
                value={fundingOffer}
                onChange={(e) => { setFundingOffer(Number(e.target.value)); setSimMessage(''); }}
                style={{ width: '100%', accentColor: '#d4af37' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', marginTop: 4 }}>
                <span>₹10 L</span>
                <span>₹5 Cr</span>
              </div>
            </div>

            {/* Slider 2: Equity Requested */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Equity Requested:</span>
                <strong style={{ color: '#d4af37' }}>{equityRequest}%</strong>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={equityRequest}
                onChange={(e) => { setEquityRequest(Number(e.target.value)); setSimMessage(''); }}
                style={{ width: '100%', accentColor: '#d4af37' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', marginTop: 4 }}>
                <span>1%</span>
                <span>25%</span>
              </div>
            </div>

            {/* Post Money Valuation display */}
            <div style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 12,
              padding: 16,
              textAlign: 'center'
            }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>
                Post-Money Valuation
              </span>
              <h2 style={{ margin: '6px 0 0', fontSize: 28, fontWeight: 900, color: 'var(--text-primary)' }}>
                ₹{(calculateValuation() / 10000000).toFixed(2)} Cr
              </h2>
            </div>

            <button
              onClick={submitSimResult}
              className="btn btn-violet"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
                color: '#050505',
                fontWeight: 800,
                borderRadius: 10,
                padding: '11px 16px',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 4px 15px rgba(212,175,55,0.2)'
              }}
            >
              <Send size={13} />
              <span>Issue Term Sheet Simulator</span>
            </button>

            {simMessage && (
              <p style={{
                margin: 0,
                fontSize: 12,
                color: '#22c55e',
                lineHeight: 1.45,
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                padding: 12,
                borderRadius: 10
              }}>
                {simMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 3. Investor AI Matches ──────────────────────────────────────────────────

export function InvestorAIMatches() {
  const [selectedIndustry, setSelectedIndustry] = useState('EdTech');

  const industryMatches = STARTUPS.filter(s => s.tags.includes(selectedIndustry))
                                  .sort((a, b) => b.score - a.score);

  const sectors = ['EdTech', 'Logistics', 'CleanTech', 'HRTech', 'AI'];

  return (
    <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div>
        <h1 className="auth-title" style={{ fontSize: 32, fontWeight: 900, textAlign: 'left', margin: 0 }}>
          AI Investment Matchmaker
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--text-secondary)' }}>
          Target specific startup industries and evaluate AI-ranked novelty vectors.
        </p>
      </div>

      {/* Selector pills */}
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setSelectedIndustry(sector)}
            className={`btn ${selectedIndustry === sector ? 'btn-violet' : 'btn-ghost'}`}
            style={{
              padding: '9px 18px',
              borderRadius: 20,
              fontSize: 12.5,
              fontWeight: 700,
              background: selectedIndustry === sector ? 'linear-gradient(135deg, #d4af37, #aa7c11)' : 'rgba(255,255,255,0.03)',
              borderColor: selectedIndustry === sector ? 'rgba(212,175,55,0.3)' : 'var(--border)',
              color: selectedIndustry === sector ? '#050505' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {sector === 'AI' ? '🧠 AI & ML' : sector}
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {industryMatches.map((s, idx) => {
          const matchPercent = 98 - (idx * 4); // Simulated AI match rate
          return (
            <div key={s.id} className="card highlight-box" style={{
              padding: 28,
              display: 'grid',
              gridTemplateColumns: '1fr 200px',
              gap: 24,
              alignItems: 'center'
            }}>
              {/* Left detail */}
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: 'rgba(212,175,55,0.12)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d4af37',
                  flexShrink: 0
                }}>
                  <Building size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: 'var(--text-primary)' }}>
                      {s.name}
                    </h3>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#22c55e',
                      background: 'rgba(34,197,94,0.15)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      borderRadius: 20,
                      padding: '2px 8px'
                    }}>
                      AI Success: {s.score}%
                    </span>
                  </div>
                  <span style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'block', marginTop: 4 }}>
                    Founded by {s.founder} at **{s.college}**
                  </span>
                  <p style={{ margin: '10px 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {s.tagline}
                  </p>
                </div>
              </div>

              {/* Right match score radial simulator */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                paddingLeft: 24
              }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 9.5, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>
                    Sector Match Score
                  </span>
                  <h2 style={{ margin: '2px 0 0', fontSize: 32, fontWeight: 900, color: '#d4af37' }}>
                    {matchPercent}%
                  </h2>
                </div>
                <button
                  onClick={() => alert(`Match request sent to ${s.founder} (${s.college}).`)}
                  className="btn btn-violet"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
                    color: '#050505',
                    fontWeight: 700,
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 11.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <Send size={12} />
                  <span>Request Pitch</span>
                </button>
              </div>
            </div>
          );
        })}

        {industryMatches.length === 0 && (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            No startups matching this specific target filter are registered yet on the platform ledger.
          </div>
        )}
      </div>
    </div>
  );
}
