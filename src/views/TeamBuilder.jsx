import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Search, Users, Zap, MapPin, Star, X, Check, Code, Palette, Briefcase, TrendingUp, Trophy, ChevronRight, RefreshCw, Shield } from 'lucide-react';
import { STUDENTS, CURRENT_USER } from '../mockData';

/* ── audio helper ─────────────────────────────────────── */
function playTone(freq, dur = 0.08, type = 'sine', vol = 0.05) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur);
  } catch (_) {}
}
function playSuccess() {
  [523, 659, 784].forEach((f, i) => setTimeout(() => playTone(f, 0.18, 'sine', 0.06), i * 110));
}
function playBeep() { playTone(880, 0.05, 'sine', 0.04); }

/* ── Synergy score helper ─────────────────────────────── */
function calcSynergy(members) {
  if (!members.length) return 0;
  const roles = new Set(members.map(m => m.role));
  const roleBonus = roles.size * 12;
  const baseScore = 58 + members.length * 9;
  return Math.min(99, baseScore + roleBonus);
}

/* ── Role → color/icon map ────────────────────────────── */
const ROLE_META = {
  Developer:   { color: '#d4af37', icon: Code,     short: 'DEV' },
  Designer:    { color: '#10b981', icon: Palette,   short: 'DES' },
  Marketer:    { color: '#f59e0b', icon: TrendingUp,short: 'MKT' },
  Finance:     { color: '#3b82f6', icon: Briefcase, short: 'FIN' },
  'AI Engineer':{ color: '#8b5cf6',icon: Zap,       short: 'AI'  },
  DevOps:      { color: '#ef4444', icon: Shield,    short: 'OPS' },
};

/* ─────────────────────────────────────────────────────────
   Success Modal — shown after "Lock Constellation Matrix"
───────────────────────────────────────────────────────── */
function ConstellationLockedModal({ members, onClose }) {
  const synergy = calcSynergy(members);
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(2,1,0,0.82)',
      backdropFilter: 'blur(32px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, padding: 20,
    }}>
      <div style={{
        width: '100%', maxWidth: 460,
        background: 'rgba(10,8,5,0.97)',
        border: '1.5px solid rgba(212,175,55,0.4)',
        borderRadius: 24,
        padding: 36,
        boxShadow: '0 0 80px rgba(212,175,55,0.15), 0 40px 80px rgba(0,0,0,0.9)',
        animation: 'scale-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        display: 'flex', flexDirection: 'column', gap: 22,
        textAlign: 'center',
      }}>
        {/* Icon */}
        <div style={{
          width: 64, height: 64,
          clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
          background: 'linear-gradient(135deg, #f3e5ab, #d4af37)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto',
          boxShadow: '0 0 30px rgba(212,175,55,0.5)',
        }}>
          <Trophy size={28} color="#0a0800" />
        </div>

        <div>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 900,
            color: '#f3e5ab', letterSpacing: '-0.02em', margin: '0 0 6px',
          }}>Constellation Locked! 🌟</h3>
          <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)', margin: 0 }}>
            Your team formation has been saved. Neural synergy analysis complete.
          </p>
        </div>

        {/* Synergy score */}
        <div style={{
          background: 'rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: 16, padding: '18px 24px',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.6)', marginBottom: 6 }}>
            Team Synergy Factor
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, fontFamily: "'Outfit', sans-serif", color: '#d4af37', lineHeight: 1 }}>
            {synergy}%
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, margin: '12px 0 0', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${synergy}%`,
              background: 'linear-gradient(90deg, #aa7c11, #d4af37, #f3e5ab)',
              borderRadius: 99,
              boxShadow: '0 0 12px rgba(212,175,55,0.5)',
              transition: 'width 1.2s ease',
            }} />
          </div>
        </div>

        {/* Team roster */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.4)', marginBottom: 12 }}>
            Formation
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {members.map((m) => {
              const meta = ROLE_META[m.role] || ROLE_META.Developer;
              return (
                <div key={m.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: `${meta.color}22`,
                    border: `1px solid ${meta.color}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, color: meta.color,
                  }}>{m.avatar || m.name.slice(0,2)}</div>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#f6f4ef' }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)' }}>{m.college}</div>
                  </div>
                  <span style={{
                    fontSize: 9, fontWeight: 800, letterSpacing: '0.08em',
                    padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase',
                    background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}35`,
                  }}>{m.role}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="btn btn-violet"
          onClick={onClose}
          style={{ borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 800 }}
        >
          <Check size={16} /> Continue Building
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Candidate Card
───────────────────────────────────────────────────────── */
function CandidateCard({ student, added, onToggle, featured = false }) {
  const meta  = ROLE_META[student.role] || ROLE_META.Developer;
  const Icon  = meta.icon;

  return (
    <div
      className={`card ${featured ? 'float-student' : ''}`}
      style={{
        padding: featured ? 20 : 16,
        display: 'flex', flexDirection: 'column',
        border: added ? '1.5px solid rgba(16,185,129,0.4)' : '1px solid rgba(212,175,55,0.1)',
        background: added ? 'rgba(16,185,129,0.05)' : undefined,
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
    >
      {/* Avatar + match */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{
          width: featured ? 44 : 36,
          height: featured ? 44 : 36,
          borderRadius: '50%',
          background: `${meta.color}18`,
          border: `1.5px solid ${meta.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: featured ? 13 : 11, fontWeight: 800, color: meta.color,
        }}>{student.avatar}</div>
        <span style={{
          fontSize: 9, fontWeight: 800, letterSpacing: '0.1em',
          padding: '3px 9px', borderRadius: 20, textTransform: 'uppercase',
          background: 'rgba(212,175,55,0.12)',
          color: '#d4af37',
          border: '1px solid rgba(212,175,55,0.3)',
        }}>{student.matchScore || student.match}% Match</span>
      </div>

      {/* Info */}
      <h4 style={{ fontSize: featured ? 15 : 13, fontWeight: 700, marginBottom: 2, color: '#f6f4ef' }}>{student.name}</h4>
      <p style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 2 }}>
        <MapPin size={9} style={{ display: 'inline', flexShrink: 0 }} /> {student.college}
      </p>

      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: 9, fontWeight: 800, letterSpacing: '0.08em',
        padding: '3px 9px', borderRadius: 4, textTransform: 'uppercase',
        background: `${meta.color}14`, color: meta.color, border: `1px solid ${meta.color}30`,
        alignSelf: 'flex-start', marginBottom: 10,
      }}>
        <Icon size={9} /> {student.role}
      </span>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
        {student.skills.slice(0, featured ? 3 : 2).map((s) => (
          <span key={s} className="tag" style={{ fontSize: 10, padding: '2px 8px' }}>{s}</span>
        ))}
      </div>

      {/* Connect button */}
      <button
        onClick={() => { onToggle(student); playBeep(); }}
        style={{
          marginTop: 'auto',
          width: '100%',
          padding: '9px 12px',
          borderRadius: 10,
          border: added ? '1.5px solid rgba(16,185,129,0.5)' : '1.5px solid rgba(212,175,55,0.4)',
          background: added
            ? 'rgba(16,185,129,0.12)'
            : 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(170,124,17,0.1))',
          color: added ? '#6ee7b7' : '#f3e5ab',
          fontSize: 12.5,
          fontWeight: 800,
          fontFamily: "'Space Grotesk', sans-serif",
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'all 0.2s ease',
        }}
      >
        {added ? <><Check size={13} /> Connected</> : 'Connect'}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Gravity Well Panel
───────────────────────────────────────────────────────── */
function GravityWell({ members, onRemove, onFinalize, isFinalizing }) {
  const synergy = calcSynergy(members);
  const MAX = 4;

  return (
    <div className="card highlight-box" style={{
      padding: 28, minHeight: 460,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <h3 style={{ fontSize: 17, fontWeight: 900, fontFamily: "'Outfit', sans-serif", color: '#f3e5ab', margin: '0 0 4px' }}>
          Neural Gravity Well
        </h3>
        <p style={{ fontSize: 11.5, color: 'rgba(148,163,184,0.5)', margin: 0 }}>
          {members.length === 0
            ? 'Connect teammates to orbit the gravity core'
            : `${members.length}/${MAX} slots filled · click avatar to remove`}
        </p>
      </div>

      {/* Orbital ring */}
      <div style={{
        width: 240, height: 240,
        borderRadius: '50%',
        border: `1.5px dashed rgba(212,175,55,${members.length > 0 ? '0.4' : '0.18'})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        marginBottom: 24,
        transition: 'border-color 0.4s ease',
      }}>
        {/* Second ring */}
        <div style={{
          position: 'absolute', inset: 20,
          borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.08)',
        }} />

        {/* Central pulsing orb */}
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: members.length > 0
            ? 'linear-gradient(135deg, #f3e5ab, #d4af37)'
            : 'rgba(212,175,55,0.1)',
          border: '2px solid rgba(212,175,55,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: members.length > 0
            ? '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.15)'
            : '0 0 16px rgba(212,175,55,0.15)',
          animation: 'pulseGlow 3s ease-in-out infinite',
          zIndex: 2, position: 'relative',
          transition: 'all 0.4s ease',
        }}>
          <Users size={22} color={members.length > 0 ? '#0a0800' : 'rgba(212,175,55,0.4)'} strokeWidth={2} />
        </div>

        {/* Orbiting members */}
        {members.map((member, idx) => {
          const meta = ROLE_META[member.role] || ROLE_META.Developer;
          return (
            <div
              key={member.id}
              className={`orbit-node-${idx}`}
              title={`${member.name} (${member.role}) · click to remove`}
              onClick={() => { onRemove(member); playBeep(); }}
              style={{
                position: 'absolute',
                width: 42, height: 42, borderRadius: '50%',
                background: `linear-gradient(135deg, ${meta.color}cc, ${meta.color}88)`,
                border: '2.5px solid rgba(6,4,2,0.9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 900, color: '#0a0800',
                boxShadow: `0 0 14px ${meta.color}66, 0 0 30px ${meta.color}22`,
                cursor: 'pointer',
                zIndex: 10,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {member.avatar || member.name.slice(0,2)}
            </div>
          );
        })}

        {/* Empty slot placeholders */}
        {Array.from({ length: MAX - members.length }).map((_, i) => {
          const slotIdx = members.length + i;
          const angles  = [0, 90, 180, 270];
          const angle   = (angles[slotIdx] * Math.PI) / 180;
          const radius  = 94;
          const x = 120 + Math.cos(angle) * radius - 19;
          const y = 120 + Math.sin(angle) * radius - 19;
          return (
            <div key={`slot-${i}`} style={{
              position: 'absolute',
              left: x, top: y,
              width: 38, height: 38, borderRadius: '50%',
              border: '1.5px dashed rgba(212,175,55,0.14)',
              background: 'rgba(0,0,0,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: 'rgba(148,163,184,0.25)',
              fontWeight: 700, letterSpacing: '0.05em',
            }}>slot</div>
          );
        })}
      </div>

      {/* Synergy meter */}
      <div style={{ width: '100%', marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
          <span style={{ color: 'rgba(148,163,184,0.6)', fontWeight: 600 }}>Synergy Factor</span>
          <span style={{ color: '#d4af37', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            {members.length > 0 ? `${synergy}%` : '0%'}
          </span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, marginBottom: 18, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${members.length > 0 ? synergy : 0}%`,
            background: 'linear-gradient(90deg, #aa7c11, #d4af37, #f3e5ab)',
            borderRadius: 99,
            boxShadow: members.length > 0 ? '0 0 10px rgba(212,175,55,0.4)' : 'none',
            transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
          }} />
        </div>

        <button
          onClick={() => { if (members.length > 0) onFinalize(); }}
          disabled={members.length === 0 || isFinalizing}
          className="btn btn-violet"
          style={{
            width: '100%', padding: '13px',
            borderRadius: 12, fontSize: 14, fontWeight: 800,
            opacity: members.length === 0 ? 0.4 : 1,
            cursor: members.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          {isFinalizing ? (
            <>
              <div style={{ width: 14, height: 14, border: '2px solid transparent', borderTop: '2px solid #0a0800', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              Locking Formation…
            </>
          ) : (
            <>
              <Star size={14} fill="currentColor" />
              Lock Constellation Matrix
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Constellation View — live skill network from team
───────────────────────────────────────────────────────── */
function ConstellationView({ members }) {
  const canvasRef = useRef(null);

  // Gather all skills from team members
  const allSkills = useMemo(() => {
    const skills = new Set();
    members.forEach(m => m.skills?.forEach(s => skills.add(s)));
    return [...skills].slice(0, 8);
  }, [members]);

  // Build node positions in a circle
  const nodes = useMemo(() => {
    const center = { x: 150, y: 130, label: 'Team', isCenter: true };
    const radius = 100;
    const skillNodes = allSkills.map((skill, i) => {
      const angle = (i / allSkills.length) * 2 * Math.PI - Math.PI / 2;
      return {
        x: 150 + Math.cos(angle) * radius,
        y: 130 + Math.sin(angle) * radius,
        label: skill,
        isCenter: false,
      };
    });
    return [center, ...skillNodes];
  }, [allSkills]);

  return (
    <div className="card highlight-box" style={{
      padding: 28, minHeight: 460,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <h3 style={{ fontSize: 17, fontWeight: 900, fontFamily: "'Outfit', sans-serif", color: '#f3e5ab', marginBottom: 4 }}>
        Neural Skill Constellation
      </h3>
      <p style={{ fontSize: 11.5, color: 'rgba(148,163,184,0.5)', marginBottom: 24, textAlign: 'center' }}>
        {members.length > 0
          ? `Dynamic skill network from ${members.length} team member${members.length > 1 ? 's' : ''}`
          : 'Connect team members to visualise skill nodes'}
      </p>

      {/* SVG constellation */}
      <svg width="300" height="260" viewBox="0 0 300 260" style={{ overflow: 'visible' }}>
        {/* Connection lines from center to each skill */}
        {nodes.slice(1).map((node, i) => (
          <line
            key={`line-${i}`}
            x1={nodes[0].x} y1={nodes[0].y}
            x2={node.x}    y2={node.y}
            stroke="rgba(212,175,55,0.35)"
            strokeWidth="1.5"
            strokeDasharray={members.length === 0 ? '4 4' : '0'}
          />
        ))}

        {/* Cross-skill connections (every other pair) */}
        {nodes.slice(1).map((a, i) =>
          nodes.slice(i + 2).map((b, j) => (
            <line
              key={`cross-${i}-${j}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="rgba(212,175,55,0.1)" strokeWidth="1"
              strokeDasharray="3 6"
            />
          ))
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Glow */}
            <circle
              cx={node.x} cy={node.y}
              r={node.isCenter ? 26 : 18}
              fill={node.isCenter ? 'rgba(212,175,55,0.1)' : 'rgba(170,124,17,0.08)'}
            />
            {/* Main circle */}
            <circle
              cx={node.x} cy={node.y}
              r={node.isCenter ? 18 : 12}
              fill={node.isCenter
                ? 'url(#goldGrad)'
                : members.length > 0 ? 'rgba(212,175,55,0.7)' : 'rgba(212,175,55,0.2)'}
              style={{
                animation: `pulseNode 3s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
            {/* Label */}
            <text
              x={node.x}
              y={node.isCenter ? node.y + 4 : node.y + 4}
              textAnchor="middle"
              fontSize={node.isCenter ? 9 : 8}
              fontWeight="800"
              fill={node.isCenter ? '#0a0800' : '#f3e5ab'}
              fontFamily="'Space Grotesk', sans-serif"
            >{node.label}</text>
            {/* External label for skill nodes */}
            {!node.isCenter && (
              <text
                x={node.x + (node.x > 150 ? 18 : -18)}
                y={node.y + 4}
                textAnchor={node.x > 150 ? 'start' : 'end'}
                fontSize={9}
                fill="rgba(148,163,184,0.6)"
                fontFamily="'Inter', sans-serif"
              >{node.label}</text>
            )}
          </g>
        ))}

        {/* Gradient defs */}
        <defs>
          <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f3e5ab" />
            <stop offset="100%" stopColor="#aa7c11" />
          </radialGradient>
        </defs>
      </svg>

      {/* Member list */}
      {members.length > 0 && (
        <div style={{ width: '100%', marginTop: 16 }}>
          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.4)', marginBottom: 8 }}>
            Skill Contributors
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {members.map(m => {
              const meta = ROLE_META[m.role] || ROLE_META.Developer;
              return (
                <span key={m.id} style={{
                  fontSize: 10, fontWeight: 700, padding: '4px 10px',
                  borderRadius: 99, background: `${meta.color}14`,
                  color: meta.color, border: `1px solid ${meta.color}30`,
                }}>
                  {m.avatar} {m.name.split(' ')[0]}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {members.length === 0 && (
        <div style={{
          marginTop: 16, padding: '14px 20px', borderRadius: 12,
          background: 'rgba(212,175,55,0.05)',
          border: '1px dashed rgba(212,175,55,0.2)',
          fontSize: 12, color: 'rgba(148,163,184,0.45)', textAlign: 'center',
        }}>
          Connect at least one teammate to see their skill nodes here
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main TeamBuilder
───────────────────────────────────────────────────────── */
export default function TeamBuilder() {
  const [search,          setSearch]          = useState('');
  const [roleFilter,      setRoleFilter]      = useState('All');
  const [collegeFilter,   setCollegeFilter]   = useState('All');
  const [openToTeam,      setOpenToTeam]      = useState(false);
  const [teamMembers,     setTeamMembers]     = useState([]);
  const [isFinalizing,    setIsFinalizing]    = useState(false);
  const [showConstellation, setShowConstellation] = useState(false);
  const [showSuccess,     setShowSuccess]     = useState(false);

  const roles    = ['All', 'Developer', 'Designer', 'Marketer', 'Finance', 'AI Engineer', 'DevOps'];
  const colleges = ['All', 'IIT Bombay', 'IIT Delhi', 'NIT Trichy', 'BITS Pilani', 'VIT', 'IIIT Hyderabad', 'IIT Madras'];

  /* Enrich students */
  const enriched = useMemo(() =>
    STUDENTS
      .filter(s => s.id !== CURRENT_USER?.id)
      .map((s, i) => ({ ...s, matchScore: s.match ?? Math.max(65, 96 - i * 3 + ((s.id ?? i) % 5)) })),
  []);

  /* Filtered list */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return enriched
      .filter(s => {
        const matchesQ = !q || s.name?.toLowerCase().includes(q) || s.role?.toLowerCase().includes(q) || s.skills?.some(sk => sk.toLowerCase().includes(q));
        return matchesQ
          && (roleFilter === 'All' || s.role === roleFilter)
          && (collegeFilter === 'All' || s.college === collegeFilter)
          && (!openToTeam || s.openToTeam);
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [enriched, search, roleFilter, collegeFilter, openToTeam]);

  /* AI top picks */
  const aiPicks = useMemo(() => [...enriched].sort((a, b) => b.matchScore - a.matchScore).slice(0, 3), [enriched]);

  const isAdded     = useCallback(s => teamMembers.some(m => m.id === s.id), [teamMembers]);
  const addMember   = useCallback(s => { if (!isAdded(s) && teamMembers.length < 4) setTeamMembers(p => [...p, s]); }, [isAdded, teamMembers]);
  const removeMember= useCallback(s => setTeamMembers(p => p.filter(m => m.id !== s.id)), []);
  const toggleMember= useCallback(s => isAdded(s) ? removeMember(s) : addMember(s), [isAdded, addMember, removeMember]);

  const handleFinalize = () => {
    setIsFinalizing(true);
    setTimeout(() => {
      setIsFinalizing(false);
      setShowSuccess(true);
      playSuccess();
    }, 1800);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setTeamMembers([]);
  };

  /* CSS for orbital animations */
  const orbitCSS = `
    @keyframes orbitNode0 { from { transform: rotate(0deg) translate(94px) rotate(0deg); } to { transform: rotate(360deg) translate(94px) rotate(-360deg); } }
    @keyframes orbitNode1 { from { transform: rotate(90deg) translate(94px) rotate(-90deg); } to { transform: rotate(450deg) translate(94px) rotate(-450deg); } }
    @keyframes orbitNode2 { from { transform: rotate(180deg) translate(94px) rotate(-180deg); } to { transform: rotate(540deg) translate(94px) rotate(-540deg); } }
    @keyframes orbitNode3 { from { transform: rotate(270deg) translate(94px) rotate(-270deg); } to { transform: rotate(630deg) translate(94px) rotate(-630deg); } }
    .orbit-node-0 { animation: orbitNode0 10s linear infinite; }
    .orbit-node-1 { animation: orbitNode1 14s linear infinite; }
    .orbit-node-2 { animation: orbitNode2 12s linear infinite; }
    .orbit-node-3 { animation: orbitNode3 16s linear infinite; }
    @keyframes pulseNode {
      0%, 100% { r: 12; filter: drop-shadow(0 0 4px rgba(212,175,55,0.4)); }
      50% { r: 15; filter: drop-shadow(0 0 12px rgba(212,175,55,0.8)); }
    }
  `;

  return (
    <div className="fade-in" style={{ padding: '36px 44px', width: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      <style>{orbitCSS}</style>

      {/* ── Header ── */}
      <div className="fade-up d1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>
            Team Builder
          </h1>
          <p style={{ fontSize: 13.5, color: 'rgba(148,163,184,0.6)', margin: 0 }}>
            Form synergized cross-college startup teams powered by AI matching
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Constellation toggle */}
          <button
            onClick={() => setShowConstellation(!showConstellation)}
            className={`btn ${showConstellation ? 'btn-violet' : 'btn-ghost'}`}
            style={{ borderRadius: 12, padding: '10px 18px', fontSize: 13, fontWeight: 700 }}
          >
            <Star size={14} fill={showConstellation ? 'currentColor' : 'none'} />
            {showConstellation ? 'Gravity View' : 'Constellation View'}
          </button>

          {/* Team count badge */}
          <div className="card" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 16px',
            border: teamMembers.length > 0 ? '1.5px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.07)',
            background: teamMembers.length > 0 ? 'rgba(212,175,55,0.06)' : 'rgba(255,255,255,0.02)',
            borderRadius: 12,
          }}>
            <Users size={15} style={{ color: '#d4af37' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(148,163,184,0.7)' }}>Active Team</span>
            <span style={{
              fontSize: 12, fontWeight: 800, padding: '2px 10px', borderRadius: 99,
              background: 'rgba(212,175,55,0.15)', color: '#d4af37',
              border: '1px solid rgba(212,175,55,0.3)',
            }}>{teamMembers.length} / 4</span>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 28, alignItems: 'start' }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Filter bar */}
          <div className="card fade-up d2" style={{ padding: '16px 18px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
              <Search size={14} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'rgba(148,163,184,0.4)' }} />
              <input
                type="text"
                placeholder="Search candidates by name, skills, role…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input"
                style={{ paddingLeft: 38, height: 40, fontSize: 13 }}
              />
            </div>

            {/* Role */}
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="input"
              style={{ width: 'auto', height: 40, fontSize: 13, paddingRight: 32 }}
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            {/* College */}
            <select
              value={collegeFilter}
              onChange={e => setCollegeFilter(e.target.value)}
              className="input"
              style={{ width: 'auto', height: 40, fontSize: 13, paddingRight: 32 }}
            >
              {colleges.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Open only toggle */}
            <button
              onClick={() => setOpenToTeam(!openToTeam)}
              style={{
                padding: '8px 16px', borderRadius: 99, fontSize: 12.5, fontWeight: 800,
                border: openToTeam ? '1.5px solid rgba(212,175,55,0.5)' : '1.5px solid rgba(255,255,255,0.1)',
                background: openToTeam
                  ? 'linear-gradient(135deg, #f3e5ab, #d4af37)'
                  : 'rgba(255,255,255,0.03)',
                color: openToTeam ? '#0a0800' : 'rgba(148,163,184,0.6)',
                cursor: 'pointer', transition: 'all 0.2s ease',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Open only
            </button>

            {/* Reset */}
            {(search || roleFilter !== 'All' || collegeFilter !== 'All' || openToTeam) && (
              <button
                onClick={() => { setSearch(''); setRoleFilter('All'); setCollegeFilter('All'); setOpenToTeam(false); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(148,163,184,0.4)', display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 12, fontWeight: 600,
                }}
              >
                <RefreshCw size={12} /> Reset
              </button>
            )}
          </div>

          {/* AI Recommended */}
          <div className="fade-up d3">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
              <Zap size={15} style={{ color: '#d4af37' }} />
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#f3e5ab', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
                AI Recommended Profiles
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {aiPicks.map((s, i) => (
                <CandidateCard
                  key={s.id}
                  student={s}
                  added={isAdded(s)}
                  onToggle={toggleMember}
                  featured
                />
              ))}
            </div>
          </div>

          {/* All candidates */}
          <div className="fade-up d4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#f3e5ab', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
                All Innovators
              </h3>
              <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.4)', fontWeight: 600 }}>
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filtered.length === 0 ? (
              <div style={{
                padding: '32px 24px', borderRadius: 16,
                background: 'rgba(255,255,255,0.02)',
                border: '1px dashed rgba(255,255,255,0.06)',
                textAlign: 'center',
              }}>
                <Search size={28} style={{ color: 'rgba(148,163,184,0.2)', marginBottom: 10 }} />
                <p style={{ color: 'rgba(148,163,184,0.4)', fontSize: 13 }}>No candidates match your filters</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
                {filtered.map(s => (
                  <CandidateCard key={s.id} student={s} added={isAdded(s)} onToggle={toggleMember} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="fade-up d3" style={{ position: 'sticky', top: 6 }}>
          {showConstellation
            ? <ConstellationView members={teamMembers} />
            : <GravityWell
                members={teamMembers}
                onRemove={removeMember}
                onFinalize={handleFinalize}
                isFinalizing={isFinalizing}
              />
          }
        </div>

      </div>

      {/* Success modal */}
      {showSuccess && (
        <ConstellationLockedModal
          members={teamMembers}
          onClose={handleCloseSuccess}
        />
      )}
    </div>
  );
}
