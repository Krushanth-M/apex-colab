import React from 'react';
import {
  Zap,
  Users,
  Trophy,
  Rocket,
  ArrowRight,
  TrendingUp,
  Star,
  Clock,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import {
  CURRENT_USER,
  ACTIVITY_FEED,
  CONTRIBUTION_HEATMAP,
  HACKATHONS
} from '../mockData';

/* ── Heatmap Color Mapper ─────────────────────────────── */
const heatmapColor = (level) => {
  switch (level) {
    case 1: return 'rgba(212, 175, 55, 0.16)';
    case 2: return 'rgba(212, 175, 55, 0.38)';
    case 3: return 'rgba(212, 175, 55, 0.65)';
    case 4: return 'rgba(212, 175, 55, 0.95)';
    default: return 'rgba(212, 175, 55, 0.04)';
  }
};

/* ── Activity Feed Icons ─────────────────────────────── */
const activityIcon = (type) => {
  const icons = {
    match:     <Users size={14} />,
    hackathon: <Trophy size={14} />,
    xp:        <Zap size={14} />,
    idea:      <Rocket size={14} />,
    mentor:    <Briefcase size={14} />,
    badge:     <Star size={14} />,
  };
  return icons[type] || <Zap size={14} />;
};

/* ── Quick Stat Hero Widget ───────────────────────────── */
const QuickStat = ({ label, value, color }) => (
  <div
    className="card"
    style={{
      padding: '14px 20px',
      minWidth: 120,
      textAlign: 'center',
      border: '1.5px solid rgba(212, 175, 55, 0.22)',
      background: 'rgba(212, 175, 55, 0.02)',
      borderRadius: 14,
    }}
  >
    <div style={{
      fontSize: 22,
      fontWeight: 900,
      color: color || 'var(--gold-500)',
      fontFamily: "'Outfit', 'Space Grotesk', sans-serif",
      lineHeight: 1
    }}>
      {value}
    </div>
    <div style={{
      fontSize: 10.5,
      fontWeight: 700,
      color: 'var(--text-3)',
      marginTop: 6,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }}>
      {label}
    </div>
  </div>
);

/* ── XP Progress Tracker ───────────────────────────────── */
const XpBar = ({ xp, xpNext }) => {
  const pct = Math.min(100, Math.round((xp / xpNext) * 100));
  return (
    <div style={{ marginTop: 14, maxWidth: 420 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-2)' }}>XP Progress</span>
        <span style={{ fontSize: 12.5, color: 'var(--gold-500)', fontWeight: 800 }}>
          {xp.toLocaleString()} / {xpNext.toLocaleString()} XP
        </span>
      </div>
      <div className="progress-track" style={{ height: 7 }}>
        <div
          className="progress-fill progress-violet"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 5 }}>
        {pct}% completed to next level
      </div>
    </div>
  );
};

/* ── Primary Stat Card ────────────────────────────────── */
const StatCard = ({ icon: Icon, value, label, trend, color, delay }) => (
  <div
    className={`card fade-up ${delay}`}
    style={{
      padding: '22px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      border: '1.5px solid rgba(212, 175, 55, 0.18)',
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
      }}
    >
      <Icon size={18} />
    </div>
    <div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          fontFamily: "'Outfit', 'Space Grotesk', sans-serif",
          color: 'var(--text)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em'
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)', marginTop: 3 }}>{label}</div>
    </div>
    {trend && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 700, color: '#10b981' }}>
        <TrendingUp size={12} />
        {trend}
      </div>
    )}
  </div>
);

/* ── Single Activity Feed Item ────────────────────────── */
const ActivityItem = ({ item }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '12px 0',
      borderBottom: '1px solid var(--border)',
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: 'rgba(212, 175, 55, 0.08)',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gold-500)',
        flexShrink: 0,
      }}
    >
      {activityIcon(item.type)}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
        {item.text}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, color: 'var(--text-3)', fontSize: 11 }}>
        <Clock size={10} />
        {item.time}
      </div>
    </div>
  </div>
);

/* ── Single Hackathon Listing ─────────────────────────── */
const HackathonItem = ({ hackathon }) => (
  <div
    style={{
      padding: '14px 0',
      borderBottom: '1px solid var(--border)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', fontFamily: "'Space Grotesk', sans-serif" }}>
          {hackathon.name}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>
          Organized by {hackathon.host}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 11, color: 'var(--text-3)' }}>
          <Clock size={10} />
          Deadline: {hackathon.deadline}
        </div>
      </div>
      <div
        style={{
          background: 'rgba(212, 175, 55, 0.12)',
          border: '1.5px solid rgba(212, 175, 55, 0.35)',
          color: '#d4af37',
          borderRadius: 20,
          padding: '4px 12px',
          fontSize: 11,
          fontWeight: 800,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          fontFamily: "'Space Grotesk', sans-serif"
        }}
      >
        {hackathon.prize}
      </div>
    </div>
  </div>
);

/* ── Main Dashboard component ── */
export default function Dashboard() {
  const user = CURRENT_USER;
  const upcomingHackathons = HACKATHONS.filter((h) => h.status === 'open').slice(0, 3);

  return (
    <div
      className="fade-in"
      style={{
        width: '100%',
        padding: '36px 44px',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Welcome Header ── */}
      <section className="fade-up d1" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
          {/* Greeting */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 32,
                fontWeight: 900,
                color: 'var(--text)',
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: '-0.03em'
              }}
            >
              Good morning, {user.name} 👋
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: 14.5, color: 'var(--text-2)', fontWeight: 500 }}>
              Level {user.level} Builder · {user.streak} day streak 🔥
            </p>
            <XpBar xp={user.xp} xpNext={user.xpNext} />
          </div>

          {/* Quick stats widgets */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <QuickStat label="Total XP" value={user.xp?.toLocaleString()} color="var(--gold-500)" />
            <QuickStat label="Global Rank" value={`#${user.rank || '—'}`} color="var(--gold-500)" />
            <QuickStat label="Campus Rank" value={`#${user.campusRank || '—'}`} color="var(--gold-500)" />
          </div>
        </div>
      </section>

      {/* ── Stats Grid ── */}
      <section style={{ marginBottom: 32 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          <StatCard
            icon={Users}
            value="3"
            label="Active Teams"
            trend="+1 this month"
            color="var(--gold-500)"
            delay="d1"
          />
          <StatCard
            icon={Rocket}
            value="87"
            label="Startup Score"
            trend="+5 pts"
            color="var(--gold-300)"
            delay="d2"
          />
          <StatCard
            icon={Zap}
            value="+340"
            label="XP This Week"
            trend="Above average"
            color="var(--gold-500)"
            delay="d3"
          />
          <StatCard
            icon={Trophy}
            value="#2"
            label="Campus Rank"
            trend="↑ 1 place"
            color="var(--gold-300)"
            delay="d4"
          />
        </div>
      </section>

      {/* ── Feed & Hackathons split ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 32, alignItems: 'start' }}>
        {/* Left: Activity Feed */}
        <div className="card fade-up d3" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  color: 'var(--text)',
                  margin: 0,
                }}
              >
                Live Activity
              </h2>
              <p style={{ margin: '3px 0 0', fontSize: 11.5, color: 'var(--text-3)' }}>
                Real-time campus updates
              </p>
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px rgba(16,185,129,0.5)',
                animation: 'neon-ping 2s infinite',
              }}
            />
          </div>
          <div style={{ marginTop: 12 }}>
            {ACTIVITY_FEED.map((item, i) => (
              <ActivityItem key={item.id || i} item={item} />
            ))}
          </div>
        </div>

        {/* Right: Hackathons */}
        <div className="card fade-up d4" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  color: 'var(--text)',
                  margin: 0,
                }}
              >
                Upcoming Hackathons
              </h2>
              <p style={{ margin: '3px 0 0', fontSize: 11.5, color: 'var(--text-3)' }}>
                Explore open challenges
              </p>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            {upcomingHackathons.map((h, i) => (
              <HackathonItem key={h.id || i} hackathon={h} />
            ))}
          </div>
          <button
            className="btn btn-violet btn-sm"
            style={{
              marginTop: 18,
              width: '100%',
              padding: '11px',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            Browse All Hackathons <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* ── Heatmap ── */}
      <section className="card fade-up d5" style={{ padding: '24px 28px', marginBottom: 20 }}>
        <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 16,
                fontWeight: 800,
                color: 'var(--text)',
                margin: 0,
              }}
            >
              Contribution Activity
            </h2>
            <p style={{ margin: '3px 0 0', fontSize: 11.5, color: 'var(--text-3)' }}>
              6 months · {CONTRIBUTION_HEATMAP.flat().filter((v) => v > 0).length} active days
            </p>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>Less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: heatmapColor(lvl),
                  border: '1.5px solid var(--border)',
                }}
              />
            ))}
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div
          style={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            paddingBottom: 4,
            width: '100%',
          }}
        >
          {CONTRIBUTION_HEATMAP.map((week, wIdx) => (
            <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {week.map((level, dIdx) => (
                <div
                  key={dIdx}
                  title={`Week ${wIdx + 1}, Day ${dIdx + 1}: level ${level}`}
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: 3,
                    background: heatmapColor(level),
                    border: '1px solid var(--border)',
                    cursor: 'default',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
