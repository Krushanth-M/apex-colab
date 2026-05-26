import { useState } from 'react';
import {
  Rocket,
  TrendingUp,
  DollarSign,
  Users,
  Star,
  Zap,
  Brain,
  Target,
  ChevronRight,
  BarChart2,
  Shield,
  Plus,
  ThumbsUp,
  Search,
} from 'lucide-react';
import { STARTUPS, CURRENT_USER } from '../mockData';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const STAGE_COLORS = {
  Idea: { bg: 'rgba(139,92,246,0.18)', text: '#c4b5fd', border: '1px solid rgba(139,92,246,0.35)' },
  Prototype: { bg: 'rgba(59,130,246,0.18)', text: '#93c5fd', border: '1px solid rgba(59,130,246,0.35)' },
  MVP: { bg: 'rgba(16,185,129,0.18)', text: '#6ee7b7', border: '1px solid rgba(16,185,129,0.35)' },
  Seed: { bg: 'rgba(245,158,11,0.18)', text: '#fcd34d', border: '1px solid rgba(245,158,11,0.35)' },
};

const feasibilityColor = (score) => {
  if (score >= 80) return { arc: '#10b981', glow: 'rgba(16,185,129,0.3)', label: '#6ee7b7' };
  if (score >= 60) return { arc: '#f59e0b', glow: 'rgba(245,158,11,0.3)', label: '#fcd34d' };
  return { arc: '#ef4444', glow: 'rgba(239,68,68,0.3)', label: '#fca5a5' };
};

const barColor = (score) => {
  if (score >= 80) return 'linear-gradient(90deg,#10b981,#34d399)';
  if (score >= 60) return 'linear-gradient(90deg,#f59e0b,#fbbf24)';
  return 'linear-gradient(90deg,#ef4444,#f87171)';
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/* Feasibility Arc Badge */
function FeasibilityArc({ score }) {
  const { arc, glow, label } = feasibilityColor(score);
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div
      style={{
        position: 'relative',
        width: 60,
        height: 60,
        flexShrink: 0,
        filter: `drop-shadow(0 0 6px ${glow})`,
      }}
    >
      <svg width={60} height={60} viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={30} cy={30} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={5} />
        <circle
          cx={30}
          cy={30}
          r={r}
          fill="none"
          stroke={arc}
          strokeWidth={5}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
        />
      </svg>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          color: label,
        }}
      >
        {score}
      </span>
    </div>
  );
}

/* Stage Badge */
function StageBadge({ stage }) {
  const s = STAGE_COLORS[stage] || STAGE_COLORS.Idea;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        padding: '3px 10px',
        borderRadius: 20,
        background: s.bg,
        color: s.text,
        border: s.border,
        textTransform: 'uppercase',
      }}
    >
      {stage}
    </span>
  );
}

/* Glass Card */
function GlassCard({ children, style = {}, className = '' }) {
  return (
    <div
      className={`card float-startup ${className}`}
      style={{
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Tab Button */
function TabBtn({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 20px',
        borderRadius: 12,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 14,
        transition: 'all 0.2s',
        background: active
          ? 'linear-gradient(135deg,rgba(139,92,246,0.35),rgba(59,130,246,0.25))'
          : 'transparent',
        color: active ? '#e2e8f0' : 'rgba(148,163,184,0.75)',
        boxShadow: active ? '0 0 0 1px rgba(139,92,246,0.4)' : 'none',
      }}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────
// IDEAS BOARD TAB
// ─────────────────────────────────────────────

const MOCK_STARTUPS = [
  ...(Array.isArray(STARTUPS) ? STARTUPS : []),
  ...(STARTUPS.length < 4
    ? [
        {
          id: 'mock1',
          name: 'EcoRoute',
          tagline: 'AI-powered sustainable logistics for last-mile delivery',
          founder: 'Priya Nair',
          college: 'IIT Bombay',
          stage: 'Prototype',
          tags: ['CleanTech', 'Logistics', 'AI'],
          upvotes: 134,
          feasibility: 74,
          marketSize: '$8.2B',
        },
        {
          id: 'mock2',
          name: 'MindMap AI',
          tagline: 'Personalized mental-health journaling powered by LLMs',
          founder: 'Arjun Mehta',
          college: 'BITS Pilani',
          stage: 'MVP',
          tags: ['HealthTech', 'AI', 'B2C'],
          upvotes: 289,
          feasibility: 88,
          marketSize: '$4.5B',
        },
        {
          id: 'mock3',
          name: 'FarmLedger',
          tagline: 'Blockchain traceability for smallholder farmers',
          founder: 'Sneha Rao',
          college: 'IIM Ahmedabad',
          stage: 'Idea',
          tags: ['AgriTech', 'Blockchain'],
          upvotes: 67,
          feasibility: 56,
          marketSize: '$12B',
        },
        {
          id: 'mock4',
          name: 'SkillBridge',
          tagline: 'Peer-to-peer micro-internship marketplace for colleges',
          founder: 'Rohan Das',
          college: 'Delhi University',
          stage: 'Seed',
          tags: ['EdTech', 'Marketplace'],
          upvotes: 412,
          feasibility: 91,
          marketSize: '$2.1B',
        },
      ]
    : []),
];

// ─── Plagiarism & Novelty Checker Sub-component ──────────────────────────────

function PlagiarismChecker() {
  const [concept, setConcept] = useState('');
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState(null);

  const handleCheck = () => {
    if (!concept.trim()) return;
    setChecking(true);
    setResults(null);
    setTimeout(() => {
      setChecking(false);
      const text = concept.toLowerCase();
      let novelty = 88;
      let similarity = 12;
      let competitors = ['EcoRoute', 'LogiGreen'];
      let advice = 'Your core sustainable last-mile optimization model has strong structural uniqueness. We recommend emphasizing the battery degradation algorithm in your pitch.';

      if (text.includes('health') || text.includes('med') || text.includes('mind') || text.includes('therap')) {
        novelty = 76;
        similarity = 24;
        competitors = ['MindMap AI', 'TalkSpace', 'Calm', 'HeadSpace'];
        advice = 'The conversational therapy market is heavily saturated. Focus on college-specific advisor integrations and peer mentoring routing loops to stand out.';
      } else if (text.includes('block') || text.includes('crypto') || text.includes('ledger') || text.includes('chain')) {
        novelty = 68;
        similarity = 32;
        competitors = ['FarmLedger', 'ChainLink', 'Solana Trace'];
        advice = 'Collegiate ledger databases have high structural similarity. Your clear differentiator is offline-first QR scanning compatibility. Secure that IP first.';
      } else if (text.includes('study') || text.includes('class') || text.includes('ed') || text.includes('skill') || text.includes('peer')) {
        novelty = 94;
        similarity = 6;
        competitors = ['SkillBridge', 'P2PInterns'];
        advice = 'Extremely high novelty index in peer-to-peer collegiate skill barter models. File for early utility trademark on the escrow transaction engine.';
      }

      setResults({ novelty, similarity, competitors, advice });
    }, 1500);
  };

  return (
    <div className="card highlight-box" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18, position: 'sticky', top: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(170, 124, 17, 0.1) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          color: '#d4af37',
          flexShrink: 0
        }}>
          <Shield size={18} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            AI Plagiarism Scanner
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--text-muted, #6b7280)' }}>
            Scan pitch concept against global ecosystem catalogs
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <textarea
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Describe your startup idea (e.g., P2P skill-swapping network with smart escrow checks)..."
          rows={3}
          style={{
            width: '100%',
            background: 'rgba(18, 17, 14, 0.6)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: 12,
            color: 'var(--text)',
            fontSize: 12.5,
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit',
            boxSizing: 'border-box'
          }}
        />

        <button
          onClick={handleCheck}
          disabled={checking || !concept.trim()}
          className="btn btn-violet btn-sm"
          style={{
            width: '100%',
            opacity: !concept.trim() ? 0.55 : 1,
            cursor: checking || !concept.trim() ? 'not-allowed' : 'pointer'
          }}
        >
          {checking ? (
            <>
              <span className="dot dot-amber" style={{ width: 8, height: 8 }} />
              Scanning Ledger Databases...
            </>
          ) : (
            <>
              <Zap size={13} />
              Check Idea Novelty
            </>
          )}
        </button>
      </div>

      {results && (
        <div style={{
          background: 'rgba(212,175,55,0.04)',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: 12,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          animation: 'fade-up 0.4s ease'
        }}>
          {/* Index scores */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 8, border: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: 10, color: 'var(--text-3)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Novelty Index</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#10b981' }}>{results.novelty}%</span>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 8, border: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: 10, color: 'var(--text-3)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Similarity</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#ef4444' }}>{results.similarity}%</span>
            </div>
          </div>

          {/* Competitors */}
          <div>
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
              Overlapping Catalogs / Patents:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {results.competitors.map(c => (
                <span key={c} className="tag" style={{ fontSize: 10.5, padding: '2px 8px' }}>{c}</span>
              ))}
            </div>
          </div>

          {/* AI Advice */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
            <span style={{ fontSize: 11, color: '#f3e5ab', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
              <Brain size={11} /> AI Validation Suggestion:
            </span>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--text-2)', lineHeight: 1.45 }}>
              {results.advice}
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 10, padding: '6px 0' }}>
              Generate NDA
            </button>
            <button className="btn btn-violet btn-sm" style={{ flex: 1, fontSize: 10, padding: '6px 0', background: 'linear-gradient(135deg, #aa7c11, #665c49)', color: '#fff' }}>
              Timestamp Idea
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main IdeasBoard Component ───────────────────────────────────────────────

function IdeasBoard() {
  const [sort, setSort] = useState('Trending');
  const [upvoted, setUpvoted] = useState({});
  const [search, setSearch] = useState('');

  const sorts = ['Trending', 'New', 'Top Rated'];

  const sorted = [...MOCK_STARTUPS]
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'Top Rated') return b.feasibility - a.feasibility;
      if (sort === 'New') return (b.id > a.id ? 1 : -1);
      return b.upvotes - a.upvotes;
    });

  const toggleUpvote = (id) =>
    setUpvoted((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyRules: 'space-between', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>
            Idea Validation Board
          </h2>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 12,
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 20,
              background: 'linear-gradient(135deg,rgba(139,92,246,0.3),rgba(6,182,212,0.2))',
              color: '#a78bfa',
              border: '1px solid rgba(139,92,246,0.4)',
            }}
          >
            <Brain size={13} />
            AI Market Research
          </span>
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 14,
            background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
            color: '#fff',
            boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
          }}
        >
          <Plus size={16} />
          Submit Idea
        </button>
      </div>

      {/* Two Column Layout for Laptop Screen Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'flex-start' }}>
        {/* Left column: Search, filters, grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Search + Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(148,163,184,0.6)' }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search startups…"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#e2e8f0',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {sorts.map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  style={{
                    padding: '9px 16px',
                    borderRadius: 10,
                    border: sort === s ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    background: sort === s ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)',
                    color: sort === s ? '#c4b5fd' : 'rgba(148,163,184,0.8)',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {sorted.map((startup) => {
              const col = feasibilityColor(startup.feasibility || 70);
              return (
                <GlassCard
                  key={startup.id || startup.name}
                  style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}
                >
                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>{startup.name}</span>
                        <StageBadge stage={startup.stage || 'Idea'} />
                      </div>
                      <p style={{ margin: 0, fontSize: 13, color: 'rgba(148,163,184,0.85)', lineHeight: 1.5 }}>
                        {startup.tagline || startup.description}
                      </p>
                    </div>
                    <FeasibilityArc score={startup.feasibility || 70} />
                  </div>

                  {/* Founder */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#fff',
                        flexShrink: 0,
                      }}
                    >
                      {(startup.founder || startup.founderName || 'A')[0]}
                    </div>
                    <span style={{ fontSize: 13, color: 'rgba(148,163,184,0.8)' }}>
                      <strong style={{ color: '#cbd5e1' }}>{startup.founder || startup.founderName || 'Anonymous'}</strong>
                      {startup.college ? ` · ${startup.college}` : ''}
                    </span>
                  </div>

                  {/* Tags */}
                  {startup.tags && startup.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {startup.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: '3px 10px',
                            borderRadius: 20,
                            background: 'rgba(255,255,255,0.06)',
                            color: 'rgba(148,163,184,0.9)',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Feasibility bar */}
                  <div>
                    <div style={{ display: 'flex', justifyRules: 'space-between', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Feasibility Score
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: col.label }}>{startup.feasibility || 70}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 10, background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${startup.feasibility || 70}%`,
                          borderRadius: 10,
                          background: barColor(startup.feasibility || 70),
                          boxShadow: `0 0 8px ${col.glow}`,
                          transition: 'width 0.6s ease',
                        }}
                      />
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyRules: 'space-between', justifyContent: 'space-between', marginTop: 4 }}>
                    {startup.marketSize && (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: 20,
                          background: 'rgba(16,185,129,0.12)',
                          color: '#6ee7b7',
                          border: '1px solid rgba(16,185,129,0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <TrendingUp size={12} />
                        {startup.marketSize} Market
                      </span>
                    )}
                    <button
                      onClick={() => toggleUpvote(startup.id || startup.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7,
                        padding: '8px 16px',
                        borderRadius: 10,
                        border: upvoted[startup.id || startup.name]
                          ? '1px solid rgba(139,92,246,0.5)'
                          : '1px solid rgba(255,255,255,0.1)',
                        background: upvoted[startup.id || startup.name]
                          ? 'rgba(139,92,246,0.2)'
                          : 'rgba(255,255,255,0.05)',
                        color: upvoted[startup.id || startup.name] ? '#c4b5fd' : 'rgba(148,163,184,0.8)',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 700,
                        transition: 'all 0.2s',
                      }}
                    >
                      <ThumbsUp size={14} />
                      {(startup.upvotes || 0) + (upvoted[startup.id || startup.name] ? 1 : 0)}
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Right column: AI Plagiarism & Novelty Scanner */}
        <PlagiarismChecker />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MY STARTUP TAB
// ─────────────────────────────────────────────

const MILESTONES = [
  { label: 'Idea Validation', icon: Brain },
  { label: 'Market Research', icon: Search },
  { label: 'MVP Build', icon: Zap },
  { label: 'Beta Launch', icon: Rocket },
  { label: 'User Acquisition', icon: Users },
  { label: 'Seed Round', icon: DollarSign },
];

const CURRENT_STEP = 3; // 0-indexed → step 4 is index 3 (Beta Launch)

const TEAM_MEMBERS = [
  { name: 'Arjun Mehta', role: 'CEO & Co-Founder', avatar: 'AM', color: '#7c3aed' },
  { name: 'Sneha Rao', role: 'CTO', avatar: 'SR', color: '#2563eb' },
  { name: 'Rohan Das', role: 'Head of Design', avatar: 'RD', color: '#0891b2' },
  { name: 'Priya Nair', role: 'Growth Lead', avatar: 'PN', color: '#059669' },
];

const METRICS = [
  { label: 'DAU', value: '2,840', change: '+12%', icon: Users, color: '#7c3aed' },
  { label: 'MRR', value: '$3,200', change: '+8%', icon: DollarSign, color: '#059669' },
  { label: 'NPS Score', value: '72', change: '+5pts', icon: Star, color: '#f59e0b' },
];

const ACTIVITY_LOG = [
  { time: '2h ago', text: 'Sneha pushed MVP v2.1 to staging', icon: Zap, color: '#7c3aed' },
  { time: '5h ago', text: 'Beta invite sent to 120 users', icon: Users, color: '#2563eb' },
  { time: '1d ago', text: 'MRR milestone hit: $3,000!', icon: DollarSign, color: '#059669' },
  { time: '2d ago', text: 'Pitch deck updated for YC application', icon: Target, color: '#f59e0b' },
];

function MyStartup() {
  const startup = (Array.isArray(STARTUPS) && STARTUPS[0]) || {
    name: 'MindMap AI',
    tagline: 'Personalized mental-health journaling powered by LLMs',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Startup Header */}
      <GlassCard style={{ padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
            }}
          >
            <Rocket size={24} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#f1f5f9' }}>{startup.name || 'MindMap AI'}</h2>
              <StageBadge stage={startup.stage || 'MVP'} />
            </div>
            <p style={{ margin: 0, fontSize: 14, color: 'rgba(148,163,184,0.85)' }}>
              {startup.tagline || startup.description || 'Personalized mental-health journaling powered by LLMs'}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Milestone Stepper */}
      <GlassCard style={{ padding: '28px 32px' }}>
        <h3 style={{ margin: '0 0 28px', fontSize: 16, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Target size={17} color="#a78bfa" />
          Milestone Progress
        </h3>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          {/* connector bar */}
          <div
            style={{
              position: 'absolute',
              top: 18,
              left: '8.33%',
              right: '8.33%',
              height: 3,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 10,
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 18,
              left: '8.33%',
              width: `${(CURRENT_STEP / (MILESTONES.length - 1)) * 83.34}%`,
              height: 3,
              background: 'linear-gradient(90deg,#7c3aed,#2563eb)',
              borderRadius: 10,
              zIndex: 1,
              boxShadow: '0 0 12px rgba(124,58,237,0.5)',
            }}
          />
          {MILESTONES.map((m, i) => {
            const done = i < CURRENT_STEP;
            const active = i === CURRENT_STEP;
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  zIndex: 2,
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: done || active
                      ? 'linear-gradient(135deg,#7c3aed,#2563eb)'
                      : 'rgba(255,255,255,0.06)',
                    border: active
                      ? '3px solid #a78bfa'
                      : done
                      ? '2px solid rgba(124,58,237,0.4)'
                      : '2px solid rgba(255,255,255,0.1)',
                    boxShadow: active ? '0 0 16px rgba(124,58,237,0.6)' : 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  <Icon size={16} color={done || active ? '#fff' : 'rgba(148,163,184,0.4)'} />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: active ? 700 : 500,
                    color: active ? '#c4b5fd' : done ? 'rgba(148,163,184,0.9)' : 'rgba(148,163,184,0.4)',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    maxWidth: 80,
                  }}
                >
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Metrics + Team row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Metrics */}
        <GlassCard style={{ padding: '24px 28px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart2 size={17} color="#a78bfa" />
            Key Metrics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {METRICS.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: `${m.color}22`,
                        border: `1px solid ${m.color}44`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={15} color={m.color} />
                    </div>
                    <span style={{ fontSize: 13, color: 'rgba(148,163,184,0.8)', fontWeight: 500 }}>{m.label}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>{m.value}</div>
                    <div style={{ fontSize: 11, color: '#34d399', fontWeight: 600 }}>{m.change} this week</div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Team */}
        <GlassCard style={{ padding: '24px 28px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Users size={17} color="#a78bfa" />
            Team
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TEAM_MEMBERS.map((m) => (
              <div
                key={m.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: `${m.color}cc`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {m.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.7)' }}>{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Activity Log */}
      <GlassCard style={{ padding: '24px 28px' }}>
        <h3 style={{ margin: '0 0 18px', fontSize: 16, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={17} color="#a78bfa" />
          Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ACTIVITY_LOG.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  padding: '14px 0',
                  borderBottom: i < ACTIVITY_LOG.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: `${a.color}20`,
                    border: `1px solid ${a.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Icon size={14} color={a.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, color: '#cbd5e1', fontWeight: 500 }}>{a.text}</p>
                  <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>{a.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}

// ─────────────────────────────────────────────
// PITCH SIMULATOR TAB
// ─────────────────────────────────────────────

const PITCH_SCORES = [
  { label: 'Overall Score', value: 78, special: true },
  { label: 'Clarity', value: 85 },
  { label: 'Market Size', value: 72 },
  { label: 'Team Strength', value: 90 },
  { label: 'Traction', value: 65 },
  { label: 'Innovation', value: 82 },
];

const AI_INSIGHTS = [
  '🎯 Strong team composition with complementary skill sets — investors will find this compelling.',
  '📈 Market size slide needs more granularity; break down TAM/SAM/SOM with data sources.',
  '⚡ Traction metrics are early but promising — consider adding a 90-day growth chart.',
];

function PitchSimulator() {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Upload Area */}
      <GlassCard style={{ padding: '32px' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Rocket size={17} color="#a78bfa" />
          Pitch Deck Analyzer
        </h3>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); setUploaded(true); }}
          onClick={() => setUploaded(true)}
          style={{
            border: `2px dashed ${dragging ? 'rgba(139,92,246,0.7)' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: 16,
            padding: '48px 32px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragging
              ? 'rgba(139,92,246,0.08)'
              : 'rgba(255,255,255,0.02)',
            transition: 'all 0.25s',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <BarChart2 size={26} color="#a78bfa" />
          </div>
          <p style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 600, color: '#e2e8f0' }}>
            {uploaded ? '✅ pitch-deck-mindmap.pdf uploaded' : 'Drag & drop your pitch deck'}
          </p>
          <p style={{ margin: '0 0 20px', fontSize: 13, color: 'rgba(148,163,184,0.6)' }}>
            Supports PDF, PPTX, Google Slides link — max 50MB
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <button
              style={{
                padding: '10px 22px',
                borderRadius: 12,
                border: 'none',
                background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(124,58,237,0.4)',
              }}
            >
              Upload File
            </button>
            <button
              style={{
                padding: '10px 22px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.05)',
                color: '#cbd5e1',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Or use our template
            </button>
          </div>
        </div>
      </GlassCard>

      {/* AI Score Dashboard */}
      <GlassCard style={{ padding: '28px 32px' }}>
        <h3 style={{ margin: '0 0 24px', fontSize: 16, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Brain size={17} color="#a78bfa" />
          AI Score Dashboard
          <span
            style={{
              marginLeft: 8,
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 20,
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              border: '1px solid rgba(16,185,129,0.3)',
            }}
          >
            Mock Results
          </span>
        </h3>

        {/* Overall Score Hero */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            padding: '20px 24px',
            borderRadius: 16,
            background: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(37,99,235,0.1))',
            border: '1px solid rgba(124,58,237,0.25)',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              background: 'linear-gradient(135deg,#a78bfa,#60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}
          >
            78
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>Overall Pitch Score</div>
            <div style={{ fontSize: 13, color: 'rgba(148,163,184,0.75)' }}>Your deck is well above average. A few tweaks can push it to 90+.</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                padding: '6px 16px',
                borderRadius: 20,
                background: 'rgba(245,158,11,0.15)',
                color: '#fcd34d',
                border: '1px solid rgba(245,158,11,0.3)',
              }}
            >
              ⭐ Strong
            </span>
          </div>
        </div>

        {/* Score Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PITCH_SCORES.filter((s) => !s.special).map((s) => (
            <div key={s.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: feasibilityColor(s.value).label }}>
                  {s.value}/100
                </span>
              </div>
              <div style={{ height: 7, borderRadius: 10, background: 'rgba(255,255,255,0.06)' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${s.value}%`,
                    borderRadius: 10,
                    background: barColor(s.value),
                    boxShadow: `0 0 8px ${feasibilityColor(s.value).glow}`,
                    transition: 'width 0.8s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* AI Feedback */}
      <GlassCard style={{ padding: '28px 32px' }}>
        <h3 style={{ margin: '0 0 18px', fontSize: 16, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={17} color="#a78bfa" />
          AI Feedback
        </h3>
        <div
          style={{
            padding: '20px 24px',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            marginBottom: 20,
          }}
        >
          {AI_INSIGHTS.map((insight, i) => (
            <p
              key={i}
              style={{
                margin: i < AI_INSIGHTS.length - 1 ? '0 0 12px' : '0',
                fontSize: 14,
                color: '#cbd5e1',
                lineHeight: 1.6,
                padding: '10px 14px',
                borderRadius: 10,
                background: 'rgba(139,92,246,0.05)',
                border: '1px solid rgba(139,92,246,0.1)',
              }}
            >
              {insight}
            </p>
          ))}
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 24px',
            borderRadius: 12,
            border: 'none',
            background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(124,58,237,0.4)',
          }}
        >
          <Brain size={16} />
          Re-analyze Deck
        </button>
      </GlassCard>
    </div>
  );
}

// ─────────────────────────────────────────────
// EQUITY CALCULATOR TAB
// ─────────────────────────────────────────────

const DONUT_COLORS = ['#7c3aed', '#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626'];

const DEFAULT_FOUNDERS = [
  { id: 1, name: 'Arjun Mehta', role: 'CEO', contribution: 40, time: 50 },
  { id: 2, name: 'Sneha Rao', role: 'CTO', contribution: 35, time: 30 },
  { id: 3, name: 'Rohan Das', role: 'Designer', contribution: 25, time: 20 },
];

function computeEquity(founders) {
  const total = founders.reduce((s, f) => s + f.contribution * 0.6 + f.time * 0.4, 0);
  if (total === 0) return founders.map(() => 0);
  return founders.map((f) => {
    const raw = (f.contribution * 0.6 + f.time * 0.4) / total;
    return Math.round(raw * 1000) / 10;
  });
}

function DonutChart({ segments }) {
  // Pure CSS-ish SVG donut
  const cx = 80, cy = 80, r = 60;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg width={160} height={160} viewBox="0 0 160 160">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={20} />
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * circ;
        const gap = circ - dash;
        const rotation = (offset / 100) * 360 - 90;
        offset += seg.pct;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
            strokeWidth={20}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={0}
            transform={`rotate(${rotation} ${cx} ${cy})`}
            strokeLinecap="butt"
            style={{ filter: `drop-shadow(0 0 6px ${DONUT_COLORS[i % DONUT_COLORS.length]}66)` }}
          />
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#f1f5f9" fontSize={13} fontWeight={700}>Split</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize={11}>{segments.length} founders</text>
    </svg>
  );
}

function EquityCalculator() {
  const [founders, setFounders] = useState(DEFAULT_FOUNDERS);
  const [nda, setNda] = useState(false);
  const equities = computeEquity(founders);

  const addFounder = () => {
    setFounders((prev) => [
      ...prev,
      { id: Date.now(), name: '', role: '', contribution: 0, time: 0 },
    ]);
  };

  const updateFounder = (id, field, value) => {
    setFounders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: field === 'name' || field === 'role' ? value : Number(value) } : f))
    );
  };

  const removeFounder = (id) => {
    setFounders((prev) => prev.filter((f) => f.id !== id));
  };

  const segments = founders.map((f, i) => ({ name: f.name || `Founder ${i + 1}`, pct: equities[i] }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <GlassCard style={{ padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
            <DollarSign size={18} color="#a78bfa" />
            Co-Founder Equity Split
          </h3>
          <button
            onClick={addFounder}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '9px 16px',
              borderRadius: 10,
              border: '1px solid rgba(139,92,246,0.4)',
              background: 'rgba(139,92,246,0.12)',
              color: '#c4b5fd',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Plus size={14} />
            Add Co-Founder
          </button>
        </div>

        {/* Table Headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.5fr 1fr 1fr 40px',
            gap: 12,
            padding: '10px 14px',
            marginBottom: 8,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          {['Name', 'Role', 'Contribution %', 'Time %', ''].map((h) => (
            <span key={h} style={{ fontSize: 11, fontWeight: 700, color: 'rgba(148,163,184,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Founder Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {founders.map((f, i) => (
            <div
              key={f.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.5fr 1fr 1fr 40px',
                gap: 12,
                alignItems: 'center',
                padding: '12px 14px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <input
                value={f.name}
                onChange={(e) => updateFounder(f.id, 'name', e.target.value)}
                placeholder="Full name"
                style={inputStyle}
              />
              <input
                value={f.role}
                onChange={(e) => updateFounder(f.id, 'role', e.target.value)}
                placeholder="Role"
                style={inputStyle}
              />
              <input
                type="number"
                min={0}
                max={100}
                value={f.contribution}
                onChange={(e) => updateFounder(f.id, 'contribution', e.target.value)}
                style={inputStyle}
              />
              <input
                type="number"
                min={0}
                max={100}
                value={f.time}
                onChange={(e) => updateFounder(f.id, 'time', e.target.value)}
                style={inputStyle}
              />
              <button
                onClick={() => removeFounder(f.id)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  border: '1px solid rgba(239,68,68,0.25)',
                  background: 'rgba(239,68,68,0.1)',
                  color: '#f87171',
                  cursor: 'pointer',
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Donut + Legend */}
      <GlassCard style={{ padding: '28px 32px' }}>
        <h3 style={{ margin: '0 0 24px', fontSize: 16, fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={17} color="#a78bfa" />
          Calculated Equity Split
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          <DonutChart segments={segments} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {segments.map((seg, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: DONUT_COLORS[i % DONUT_COLORS.length],
                    boxShadow: `0 0 8px ${DONUT_COLORS[i % DONUT_COLORS.length]}88`,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{seg.name || `Founder ${i + 1}`}</div>
                  <div style={{ height: 4, borderRadius: 10, background: 'rgba(255,255,255,0.06)', marginTop: 5 }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${seg.pct}%`,
                        borderRadius: 10,
                        background: DONUT_COLORS[i % DONUT_COLORS.length],
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: DONUT_COLORS[i % DONUT_COLORS.length],
                    minWidth: 52,
                    textAlign: 'right',
                    textShadow: `0 0 12px ${DONUT_COLORS[i % DONUT_COLORS.length]}66`,
                  }}
                >
                  {seg.pct}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NDA Checkbox */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginTop: 28,
            padding: '16px 20px',
            borderRadius: 14,
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          <input
            type="checkbox"
            id="nda-check"
            checked={nda}
            onChange={(e) => setNda(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: '#7c3aed', cursor: 'pointer' }}
          />
          <label
            htmlFor="nda-check"
            style={{ fontSize: 14, color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Shield size={15} color="#a78bfa" />
             Timestamp this split on <strong style={{ color: '#a78bfa' }}>Apex Colab Ledger</strong> (immutable record)
          </label>
        </div>

        {/* Export Button */}
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button
            style={{
              flex: 1,
              padding: '13px 24px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Shield size={16} />
            Export Equity Agreement PDF
          </button>
          <button
            style={{
              padding: '13px 20px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#cbd5e1',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Share Link
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: 9,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: '#e2e8f0',
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

const TABS = [
  { id: 'ideas', label: 'Ideas Board', icon: Brain },
  { id: 'startup', label: 'My Startup', icon: Rocket },
  { id: 'pitch', label: 'Pitch Simulator', icon: Target },
  { id: 'equity', label: 'Equity Calculator', icon: DollarSign },
];

export default function StartupHub() {
  const [activeTab, setActiveTab] = useState('ideas');

  return (
    <div
      style={{
        padding: '40px 48px',
        minHeight: '100vh',
        background: 'transparent',
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        color: '#f1f5f9',
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
            }}
          >
            <Rocket size={20} color="#fff" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, background: 'linear-gradient(135deg,#f1f5f9,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Startup Hub
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(148,163,184,0.7)' }}>
              Build, validate, and launch your startup — all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '6px',
          borderRadius: 16,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          width: 'fit-content',
          marginBottom: 32,
        }}
      >
        {TABS.map((t) => (
          <TabBtn
            key={t.id}
            label={t.label}
            icon={t.icon}
            active={activeTab === t.id}
            onClick={() => setActiveTab(t.id)}
          />
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'ideas' && <IdeasBoard />}
      {activeTab === 'startup' && <MyStartup />}
      {activeTab === 'pitch' && <PitchSimulator />}
      {activeTab === 'equity' && <EquityCalculator />}
    </div>
  );
}
