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
  Bell,
  ChevronRight,
} from 'lucide-react';
import {
  CURRENT_USER,
  ACTIVITY_FEED,
  CONTRIBUTION_HEATMAP,
  HACKATHONS,
  STARTUPS,
} from '../mockData';

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const heatmapColor = (level) => {
  switch (level) {
    case 1: return 'rgba(124,58,237,0.25)';
    case 2: return 'rgba(124,58,237,0.5)';
    case 3: return 'rgba(6,182,212,0.6)';
    case 4: return 'rgba(6,182,212,0.9)';
    default: return 'rgba(255,255,255,0.05)';
  }
};

const activityIcon = (type) => {
  const icons = {
    star:    <Star size={14} />,
    zap:     <Zap size={14} />,
    users:   <Users size={14} />,
    trophy:  <Trophy size={14} />,
    rocket:  <Rocket size={14} />,
    trending: <TrendingUp size={14} />,
  };
  return icons[type] || <Zap size={14} />;
};

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Small glass stat box used in the hero row */
const QuickStat = ({ label, value, color }) => (
  <div
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 14,
      padding: '14px 20px',
      minWidth: 110,
      textAlign: 'center',
      backdropFilter: 'blur(12px)',
    }}
  >
    <div style={{ fontSize: 22, fontWeight: 700, color: color || '#fff', fontFamily: 'Space Grotesk, sans-serif' }}>
      {value}
    </div>
    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2, letterSpacing: 0.4 }}>
      {label}
    </div>
  </div>
);

/** XP progress bar */
const XpBar = ({ xp, xpNext }) => {
  const pct = Math.min(100, Math.round((xp / xpNext) * 100));
  return (
    <div style={{ marginTop: 14, maxWidth: 420 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>XP Progress</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
          {xp.toLocaleString()} / {xpNext.toLocaleString()} XP
        </span>
      </div>
      <div
        style={{
          height: 8,
          borderRadius: 99,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 99,
            background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
            transition: 'width 0.6s ease',
          }}
        />
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>
        {pct}% to next level
      </div>
    </div>
  );
};

/** One of the 4 big stat cards */
const StatCard = ({ icon: Icon, value, label, trend, color, delay }) => (
  <div
    className={`card fade-up ${delay}`}
    style={{
      padding: '22px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: `${color}22`,
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
          fontSize: 30,
          fontWeight: 700,
          fontFamily: 'Space Grotesk, sans-serif',
          color: '#fff',
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{label}</div>
    </div>
    {trend && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#22c55e' }}>
        <TrendingUp size={12} />
        {trend}
      </div>
    )}
  </div>
);

/** Single activity feed row */
const ActivityItem = ({ item }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '12px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: 'rgba(124,58,237,0.18)',
        border: '1px solid rgba(124,58,237,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#a78bfa',
        flexShrink: 0,
      }}
    >
      {activityIcon(item.icon || item.type)}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
        {item.text || item.description}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3, color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>
        <Clock size={10} />
        {item.time || item.timestamp}
      </div>
    </div>
  </div>
);

/** Single hackathon row */
const HackathonItem = ({ hackathon }) => (
  <div
    style={{
      padding: '14px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'Space Grotesk, sans-serif' }}>
          {hackathon.name}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
          {hackathon.host || hackathon.organizer}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
          <Clock size={10} />
          Deadline: {hackathon.deadline || hackathon.date}
        </div>
      </div>
      <div
        style={{
          background: 'rgba(6,182,212,0.15)',
          border: '1px solid rgba(6,182,212,0.35)',
          color: '#06b6d4',
          borderRadius: 99,
          padding: '3px 10px',
          fontSize: 11,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {hackathon.prize || hackathon.prizePool}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main Dashboard
───────────────────────────────────────────── */
const Dashboard = () => {
  const user = CURRENT_USER;
  const upcomingHackathons = HACKATHONS.filter((h) => h.status === 'open' || !h.status).slice(0, 3);

  return (
    <div
      style={{
        width: '100%',
        padding: '40px 48px',
        overflowY: 'auto',
        boxSizing: 'border-box',
        minHeight: '100vh',
      }}
    >
      {/* ── Section 1: Welcome Header ── */}
      <section className="fade-up d1" style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
          {/* Left: greeting + XP bar */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <h1
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 32,
                fontWeight: 700,
                color: '#fff',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Good morning, {user.name} 👋
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>
              Level {user.level} Builder · {user.streak} day streak 🔥
            </p>
            <XpBar xp={user.xp} xpNext={user.xpNext} />
          </div>

          {/* Right: quick stats */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <QuickStat label="Total XP" value={user.xp?.toLocaleString()} color="#a78bfa" />
            <QuickStat label="Global Rank" value={`#${user.globalRank || user.rank || '—'}`} color="#06b6d4" />
            <QuickStat label="Hackathons Won" value={user.hackathonsWon ?? 0} color="#fbbf24" />
          </div>
        </div>
      </section>

      {/* ── Section 2: 4 Stat Cards ── */}
      <section style={{ marginBottom: 40 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
          }}
        >
          <StatCard
            icon={Users}
            value="3"
            label="Active Teams"
            trend="+1 this month"
            color="#06b6d4"
            delay="d1"
          />
          <StatCard
            icon={Rocket}
            value="87"
            label="Startup Score"
            trend="+5 pts"
            color="#7c3aed"
            delay="d2"
          />
          <StatCard
            icon={Zap}
            value="+340"
            label="XP This Week"
            trend="Above average"
            color="#f59e0b"
            delay="d3"
          />
          <StatCard
            icon={Trophy}
            value="#2"
            label="Campus Rank"
            trend="↑ 1 place"
            color="#22c55e"
            delay="d4"
          />
        </div>
      </section>

      {/* ── Section 3: Two-column Feed + Hackathons ── */}
      <section style={{ display: 'flex', gap: 24, marginBottom: 40, alignItems: 'flex-start' }}>
        {/* Left — Activity Feed (60%) */}
        <div className="card fade-up d3" style={{ flex: '0 0 60%', padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div>
              <h2
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                }}
              >
                Live Activity
              </h2>
              <p style={{ margin: '3px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                Real-time campus updates
              </p>
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                animation: 'pulse 2s infinite',
              }}
            />
          </div>
          <div style={{ marginTop: 8 }}>
            {ACTIVITY_FEED.map((item, i) => (
              <ActivityItem key={item.id || i} item={item} />
            ))}
          </div>
        </div>

        {/* Right — Upcoming Hackathons (40%) */}
        <div className="card fade-up d4" style={{ flex: '0 0 calc(40% - 24px)', padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div>
              <h2
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                }}
              >
                Upcoming Hackathons
              </h2>
              <p style={{ margin: '3px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                Don't miss the deadlines
              </p>
            </div>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#7c3aed',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                padding: 0,
              }}
            >
              View All <ChevronRight size={13} />
            </button>
          </div>
          <div style={{ marginTop: 8 }}>
            {upcomingHackathons.map((h, i) => (
              <HackathonItem key={h.id || i} hackathon={h} />
            ))}
          </div>
          <button
            style={{
              marginTop: 16,
              width: '100%',
              padding: '10px',
              borderRadius: 10,
              border: '1px solid rgba(124,58,237,0.35)',
              background: 'rgba(124,58,237,0.1)',
              color: '#a78bfa',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(124,58,237,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(124,58,237,0.1)')}
          >
            Browse All Hackathons <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ── Section 4: Contribution Heatmap ── */}
      <section className="card fade-up d5" style={{ padding: '24px 28px', marginBottom: 40 }}>
        <div style={{ marginBottom: 18 }}>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 17,
              fontWeight: 700,
              color: '#fff',
              margin: 0,
            }}
          >
            Contribution Activity
          </h2>
          <p style={{ margin: '3px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            6 months · {CONTRIBUTION_HEATMAP.flat().filter((v) => v > 0).length} active days
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <div
              key={lvl}
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: heatmapColor(lvl),
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          ))}
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>More</span>
        </div>

        {/* Grid: rows = days (7), columns = weeks */}
        <div
          style={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
        >
          {/* Each column = one week */}
          {CONTRIBUTION_HEATMAP.map((week, wIdx) => (
            <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {week.map((level, dIdx) => (
                <div
                  key={dIdx}
                  className="heatmap-cell"
                  title={`Week ${wIdx + 1}, Day ${dIdx + 1}: level ${level}`}
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: 3,
                    background: heatmapColor(level),
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'default',
                    transition: 'transform 0.15s',
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
};

export default Dashboard;
