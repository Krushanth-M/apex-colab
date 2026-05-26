import { useState, useMemo } from 'react';
import {
  Zap, Trophy, Users, Calendar, DollarSign, Globe, Clock,
  Star, Filter, Search, CheckCircle, ExternalLink, Award,
} from 'lucide-react';
import { HACKATHONS, CURRENT_USER } from '../mockData';

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return null;
  if (days === 0) return 'Today';
  if (days === 1) return '1 day left';
  return `${days} days left`;
}

function modeBadgeStyle(mode) {
  if (mode === 'Online')  return { bg: 'rgba(99,102,241,0.18)',  color: '#a5b4fc' };
  if (mode === 'Offline') return { bg: 'rgba(16,185,129,0.18)',  color: '#6ee7b7' };
  return                         { bg: 'rgba(245,158,11,0.18)',  color: '#fcd34d' };
}

const PROGRESS_STEPS = ['Registered', 'Team Formed', 'Idea Submitted', 'Built', 'Submitted'];

/* ─────────────────────────────────────────────
   Glass Card Primitive
───────────────────────────────────────────── */
function GlassCard({ children, style = {}, className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 16,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stat Mini Card
───────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <GlassCard style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 14, minWidth: 170 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: `${accent}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={18} color={accent} />
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{label}</div>
      </div>
    </GlassCard>
  );
}

/* ─────────────────────────────────────────────
   Hackathon Card (Discover)
───────────────────────────────────────────── */
function HackathonCard({ hack, onRegister }) {
  const modeStyle = modeBadgeStyle(hack.mode);
  const countdown = daysUntil(hack.deadline);
  const isEnded = hack.status === 'ended';

  return (
    <GlassCard style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, transition: 'border-color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 36 }}>{hack.icon}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#f1f5f9', lineHeight: 1.3 }}>{hack.name}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{hack.host}</div>
          </div>
        </div>
        {/* Prize Pill */}
        <div style={{
          background: 'rgba(245,158,11,0.15)',
          border: '1px solid rgba(245,158,11,0.3)',
          color: '#fbbf24',
          borderRadius: 20,
          padding: '4px 12px',
          fontSize: 13,
          fontWeight: 700,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <DollarSign size={12} />
          {hack.prize}
        </div>
      </div>

      {/* Date & Mode */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94a3b8', fontSize: 12 }}>
          <Calendar size={13} />
          {hack.date}
        </div>
        <div style={{
          background: modeStyle.bg,
          color: modeStyle.color,
          borderRadius: 20,
          padding: '3px 10px',
          fontSize: 11,
          fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <Globe size={11} />
          {hack.mode}
        </div>
        {!isEnded && countdown && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: countdown.includes('day') && parseInt(countdown) <= 3 ? '#f87171' : '#fbbf24', fontSize: 12 }}>
            <Clock size={12} />
            {countdown}
          </div>
        )}
      </div>

      {/* Tags */}
      {hack.tags && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {hack.tags.map(tag => (
            <span key={tag} style={{
              background: 'rgba(139,92,246,0.12)',
              color: '#c4b5fd',
              borderRadius: 6,
              padding: '2px 8px',
              fontSize: 11,
              fontWeight: 500,
            }}>{tag}</span>
          ))}
        </div>
      )}

      {/* Teams */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', fontSize: 12 }}>
        <Users size={13} />
        {hack.teamsRegistered ?? 0} / {hack.maxTeams ?? '∞'} teams registered
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        {isEnded ? (
          <button
            style={{
              flex: 1,
              padding: '9px 0',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'transparent',
              color: '#94a3b8',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <ExternalLink size={14} />
            View Results
          </button>
        ) : (
          <>
            <button
              onClick={() => onRegister && onRegister(hack)}
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.85}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              Register
            </button>
            <button
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: '#cbd5e1',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <ExternalLink size={14} />
              View Details
            </button>
          </>
        )}
      </div>
    </GlassCard>
  );
}

/* ─────────────────────────────────────────────
   Registered Tab Card
───────────────────────────────────────────── */
function RegisteredCard({ hack }) {
  const [link, setLink] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const currentStep = hack.progressStep ?? 1; // 0-indexed into PROGRESS_STEPS

  return (
    <GlassCard style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <span style={{ fontSize: 32 }}>{hack.icon}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#f1f5f9' }}>{hack.name}</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{hack.date}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, color: '#6ee7b7', fontSize: 13, fontWeight: 600 }}>
          <CheckCircle size={15} />
          Registered
        </div>
      </div>

      {/* Team Status */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 10,
        padding: '10px 14px',
        marginBottom: 18,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        color: '#94a3b8',
      }}>
        <Users size={14} color="#a78bfa" />
        Team: <span style={{ color: '#c4b5fd', fontWeight: 600 }}>{hack.team ?? 'Solo / Not yet formed'}</span>
      </div>

      {/* Progress Tracker */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Progress</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {PROGRESS_STEPS.map((step, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < PROGRESS_STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: done ? '#7c3aed' : active ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.06)',
                    border: active ? '2px solid #7c3aed' : done ? 'none' : '2px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s',
                  }}>
                    {done ? <CheckCircle size={13} color="#fff" /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: active ? '#a78bfa' : 'rgba(255,255,255,0.15)' }} />}
                  </div>
                  <span style={{ fontSize: 9, color: done ? '#a78bfa' : active ? '#c4b5fd' : '#475569', whiteSpace: 'nowrap', fontWeight: done || active ? 600 : 400 }}>
                    {step}
                  </span>
                </div>
                {i < PROGRESS_STEPS.length - 1 && (
                  <div style={{
                    flex: 1, height: 2, marginBottom: 16,
                    background: done ? 'linear-gradient(90deg, #7c3aed, #6d28d9)' : 'rgba(255,255,255,0.07)',
                    transition: 'background 0.3s',
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submission Link */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Submission</div>
        {submitted ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6ee7b7', fontSize: 13, fontWeight: 600 }}>
            <CheckCircle size={15} />
            Submitted: <a href={link} target="_blank" rel="noreferrer" style={{ color: '#a78bfa', textDecoration: 'underline' }}>{link}</a>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={link}
              onChange={e => setLink(e.target.value)}
              placeholder="Paste project / devpost link…"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: '9px 14px',
                color: '#e2e8f0',
                fontSize: 13,
                outline: 'none',
              }}
            />
            <button
              onClick={() => link && setSubmitted(true)}
              style={{
                padding: '9px 18px',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

/* ─────────────────────────────────────────────
   Trophy Card
───────────────────────────────────────────── */
const TROPHY_DATA = [
  {
    emoji: '🥇',
    rank: '1st Place',
    event: 'ClimateHack 2025',
    date: 'March 2025',
    prize: '₹30,000',
    team: ['Aarav', 'Priya', 'You'],
    gradient: 'linear-gradient(135deg, rgba(251,191,36,0.18), rgba(245,158,11,0.08))',
    border: 'rgba(251,191,36,0.35)',
    accent: '#fbbf24',
    label: 'Winner',
  },
  {
    emoji: '🥈',
    rank: 'Finalist',
    event: 'FinTech Forge 2025',
    date: 'January 2025',
    prize: '₹15,000',
    team: ['You', 'Rohan'],
    gradient: 'linear-gradient(135deg, rgba(148,163,184,0.18), rgba(100,116,139,0.08))',
    border: 'rgba(148,163,184,0.3)',
    accent: '#94a3b8',
    label: 'Finalist',
  },
  {
    emoji: '🏅',
    rank: 'Best UI Award',
    event: 'DesignSprint 2024',
    date: 'November 2024',
    prize: '₹5,000',
    team: ['You', 'Neha', 'Kiran'],
    gradient: 'linear-gradient(135deg, rgba(205,127,50,0.18), rgba(180,100,30,0.08))',
    border: 'rgba(205,127,50,0.35)',
    accent: '#cd7f32',
    label: 'Special Award',
  },
];

function TrophyCard({ trophy }) {
  return (
    <div style={{
      background: trophy.gradient,
      border: `1px solid ${trophy.border}`,
      borderRadius: 16,
      padding: 24,
      backdropFilter: 'blur(12px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow blob */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 100, height: 100,
        borderRadius: '50%',
        background: `${trophy.accent}22`,
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <span style={{ fontSize: 48, lineHeight: 1 }}>{trophy.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              background: `${trophy.accent}22`,
              color: trophy.accent,
              fontSize: 11,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 20,
              border: `1px solid ${trophy.accent}44`,
            }}>{trophy.label}</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 17, color: '#f1f5f9', lineHeight: 1.3 }}>{trophy.event}</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 3 }}>{trophy.date}</div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {trophy.team.map(member => (
                <div key={member} style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  border: '2px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: '#fff',
                  marginLeft: -6,
                  flexShrink: 0,
                }} title={member}>
                  {member[0]}
                </div>
              ))}
              <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 6 }}>
                {trophy.team.join(', ')}
              </span>
            </div>
            <div style={{ fontWeight: 800, fontSize: 18, color: trophy.accent }}>
              {trophy.prize}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stats Bar Chart (div-based)
───────────────────────────────────────────── */
const MONTHLY_STATS = [
  { month: 'Aug', count: 1 },
  { month: 'Sep', count: 2 },
  { month: 'Oct', count: 1 },
  { month: 'Nov', count: 3 },
  { month: 'Dec', count: 2 },
  { month: 'Jan', count: 4 },
  { month: 'Feb', count: 2 },
  { month: 'Mar', count: 3 },
  { month: 'Apr', count: 1 },
  { month: 'May', count: 5 },
];

function BarChart() {
  const max = Math.max(...MONTHLY_STATS.map(d => d.count));
  return (
    <GlassCard style={{ padding: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>Participation Over Months</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
        {MONTHLY_STATS.map(({ month, count }) => (
          <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: '100%',
              height: `${(count / max) * 100}%`,
              background: 'linear-gradient(180deg, #7c3aed, #4f46e5)',
              borderRadius: '4px 4px 0 0',
              minHeight: 4,
              transition: 'height 0.4s ease',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                fontSize: 10, fontWeight: 700, color: '#a78bfa', whiteSpace: 'nowrap',
              }}>{count}</div>
            </div>
            <div style={{ fontSize: 10, color: '#64748b', whiteSpace: 'nowrap' }}>{month}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function HackathonPortal() {
  const [activeTab, setActiveTab] = useState('discover');
  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Safe fallback if mockData isn't populated
  const allHackathons = HACKATHONS ?? [];
  const registeredHackathons = allHackathons.filter(h => h.registered);

  const filteredHackathons = useMemo(() => {
    return allHackathons.filter(h => {
      const matchSearch = !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.host?.toLowerCase().includes(search.toLowerCase());
      const matchMode = modeFilter === 'All' || h.mode === modeFilter;
      const matchStatus = statusFilter === 'All' || h.status === statusFilter;
      return matchSearch && matchMode && matchStatus;
    });
  }, [allHackathons, search, modeFilter, statusFilter]);

  const tabs = [
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'registered', label: 'Registered', icon: CheckCircle },
    { id: 'trophy', label: 'Trophy Wall', icon: Trophy },
  ];

  const filterBtnStyle = (active) => ({
    padding: '7px 14px',
    borderRadius: 8,
    border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
    background: active ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'rgba(255,255,255,0.04)',
    color: active ? '#fff' : '#94a3b8',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ padding: '40px 48px', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Zap size={26} color="#a78bfa" fill="#a78bfa" />
          Hackathons
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 6, marginBottom: 0 }}>
          Compete, build, and earn recognition
        </p>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: 14, marginTop: 24, flexWrap: 'wrap' }}>
          <StatCard icon={CheckCircle} label="Registered"        value="2"        accent="#6ee7b7" />
          <StatCard icon={Trophy}      label="Won"               value="1"        accent="#fbbf24" />
          <StatCard icon={DollarSign}  label="Total Prize Earned" value="₹50,000" accent="#a78bfa" />
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4, width: 'fit-content', border: '1px solid rgba(255,255,255,0.08)' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '9px 20px',
                borderRadius: 9,
                border: 'none',
                background: active ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'transparent',
                color: active ? '#fff' : '#94a3b8',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 7,
                boxShadow: active ? '0 4px 14px rgba(124,58,237,0.3)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════
          DISCOVER TAB
      ════════════════════════════════════════════ */}
      {activeTab === 'discover' && (
        <div>
          {/* Filter Bar */}
          <GlassCard style={{ padding: '14px 18px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 180 }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search hackathons…"
                style={{
                  width: '100%',
                  paddingLeft: 34,
                  paddingRight: 12,
                  paddingTop: 8,
                  paddingBottom: 8,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 9,
                  color: '#e2e8f0',
                  fontSize: 13,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Mode Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <Globe size={14} color="#64748b" />
              {['All', 'Online', 'Offline', 'Hybrid'].map(m => (
                <button key={m} onClick={() => setModeFilter(m)} style={filterBtnStyle(modeFilter === m)}>{m}</button>
              ))}
            </div>

            {/* Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <Filter size={14} color="#64748b" />
              {['All', 'open', 'upcoming', 'ended'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} style={filterBtnStyle(statusFilter === s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Grid */}
          {filteredHackathons.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#475569' }}>
              <Zap size={36} style={{ marginBottom: 12, opacity: 0.4 }} />
              <div style={{ fontSize: 16, fontWeight: 600 }}>No hackathons found</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {filteredHackathons.map(hack => (
                <HackathonCard key={hack.id ?? hack.name} hack={hack} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════
          REGISTERED TAB
      ════════════════════════════════════════════ */}
      {activeTab === 'registered' && (
        <div>
          {registeredHackathons.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#475569' }}>
              <CheckCircle size={40} style={{ marginBottom: 14, opacity: 0.3 }} />
              <div style={{ fontSize: 18, fontWeight: 700, color: '#64748b' }}>No registrations yet</div>
              <div style={{ fontSize: 13, marginTop: 6 }}>Head over to Discover to sign up for hackathons!</div>
              <button
                onClick={() => setActiveTab('discover')}
                style={{
                  marginTop: 20,
                  padding: '10px 24px',
                  borderRadius: 10,
                  border: 'none',
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Explore Hackathons
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {registeredHackathons.map(hack => (
                <RegisteredCard key={hack.id ?? hack.name} hack={hack} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════
          TROPHY WALL TAB
      ════════════════════════════════════════════ */}
      {activeTab === 'trophy' && (
        <div>
          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <Award size={20} color="#fbbf24" />
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>Your Achievements</h2>
          </div>

          {/* Trophy Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
            {TROPHY_DATA.map(trophy => (
              <TrophyCard key={trophy.event} trophy={trophy} />
            ))}
          </div>

          {/* Hackathon Stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Star size={16} color="#a78bfa" />
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#cbd5e1' }}>Hackathon Stats</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
            <GlassCard style={{ padding: '16px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#a78bfa' }}>12</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Total Participated</div>
            </GlassCard>
            <GlassCard style={{ padding: '16px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#fbbf24' }}>3</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Awards Won</div>
            </GlassCard>
            <GlassCard style={{ padding: '16px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#6ee7b7' }}>₹50K</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Prize Money</div>
            </GlassCard>
          </div>

          <BarChart />
        </div>
      )}
    </div>
  );
}
