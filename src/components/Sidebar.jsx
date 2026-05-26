import React from 'react';
import {
  LayoutDashboard,
  User,
  Users,
  Video,
  Rocket,
  Zap,
  GraduationCap,
  Brain,
  Trophy,
  BarChart3,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { CURRENT_USER } from '../mockData.js';

const NAV_GROUPS = [
  {
    label: 'MAIN',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { id: 'profile',   icon: User,            label: 'My Profile' },
      { id: 'team',      icon: Users,           label: 'Team Builder' },
      { id: 'rooms',     icon: Video,           label: 'Virtual Rooms' },
    ],
  },
  {
    label: 'STARTUP',
    items: [
      { id: 'startup',   icon: Rocket,          label: 'Startup Hub' },
      { id: 'hackathon', icon: Zap,             label: 'Hackathons' },
      { id: 'mentor',    icon: GraduationCap,   label: 'Mentors' },
    ],
  },
  {
    label: 'AI TOOLS',
    items: [
      { id: 'aitools',     icon: Brain,     label: 'AI Tools' },
      { id: 'leaderboard', icon: Trophy,    label: 'Leaderboard' },
      { id: 'analytics',   icon: BarChart3, label: 'Analytics' },
    ],
  },
];

function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Sidebar({ tab, setTab, user, onLogout }) {
  const displayUser = user || CURRENT_USER;
  const xpPercent = displayUser?.xp && displayUser?.xpMax
    ? Math.min(100, Math.round((displayUser.xp / displayUser.xpMax) * 100))
    : 62;

  return (
    <>
      <style>{`
        .sidebar-root {
          width: 260px;
          min-width: 260px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: rgba(6, 9, 18, 0.85);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          position: sticky;
          top: 0;
          overflow: hidden;
          z-index: 40;
        }

        /* ── Logo area ─────────────────────────────────────── */
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 24px 20px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          flex-shrink: 0;
        }

        .sidebar-hex-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #06b6d4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 900;
          color: #fff;
          letter-spacing: -1px;
          box-shadow: 0 0 24px rgba(124, 58, 237, 0.45), 0 2px 8px rgba(0,0,0,0.4);
          clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
          flex-shrink: 0;
        }

        .sidebar-logo-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .sidebar-logo-name {
          font-size: 15px;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: 0.01em;
          line-height: 1.2;
        }

        .sidebar-logo-sub {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #7c3aed;
          line-height: 1;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .sidebar-logo-sub svg {
          width: 9px;
          height: 9px;
        }

        /* ── Nav scroll area ───────────────────────────────── */
        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 12px 0;
          scrollbar-width: none;
        }

        .sidebar-nav::-webkit-scrollbar {
          display: none;
        }

        /* ── Group ─────────────────────────────────────────── */
        .sidebar-group {
          padding: 0 12px;
          margin-bottom: 4px;
        }

        .sidebar-group-label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: rgba(148, 163, 184, 0.45);
          padding: 12px 8px 6px;
          text-transform: uppercase;
          user-select: none;
        }

        /* ── Nav link ──────────────────────────────────────── */
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, box-shadow 0.18s;
          color: rgba(148, 163, 184, 0.7);
          font-size: 13.5px;
          font-weight: 500;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          position: relative;
          outline: none;
          margin-bottom: 2px;
        }

        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
        }

        .sidebar-link.active {
          background: linear-gradient(90deg, rgba(124, 58, 237, 0.18) 0%, rgba(79, 70, 229, 0.10) 100%);
          color: #c4b5fd;
          font-weight: 600;
          box-shadow: inset 0 0 0 1px rgba(124, 58, 237, 0.22);
        }

        .sidebar-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 18%;
          bottom: 18%;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: linear-gradient(180deg, #7c3aed, #4f46e5);
        }

        .sidebar-link-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          transition: color 0.18s;
        }

        .sidebar-link.active .sidebar-link-icon {
          color: #a78bfa;
        }

        /* ── Divider ───────────────────────────────────────── */
        .sidebar-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin: 8px 20px;
        }

        /* ── Footer / User area ────────────────────────────── */
        .sidebar-footer {
          flex-shrink: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 16px 16px 20px;
        }

        .sidebar-user-row {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 12px;
        }

        .sidebar-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 55%, #06b6d4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          flex-shrink: 0;
          box-shadow: 0 0 18px rgba(124, 58, 237, 0.4);
          border: 1.5px solid rgba(167, 139, 250, 0.3);
        }

        .sidebar-user-info {
          flex: 1;
          min-width: 0;
        }

        .sidebar-user-name {
          font-size: 13px;
          font-weight: 600;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }

        .sidebar-user-college {
          font-size: 11px;
          color: rgba(148, 163, 184, 0.55);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }

        /* ── XP bar ────────────────────────────────────────── */
        .sidebar-xp-section {
          margin-bottom: 14px;
        }

        .sidebar-xp-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }

        .sidebar-xp-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(148, 163, 184, 0.5);
          text-transform: uppercase;
        }

        .sidebar-xp-value {
          font-size: 10px;
          font-weight: 700;
          color: #a78bfa;
        }

        .xp-bar-track {
          width: 100%;
          height: 5px;
          background: rgba(255, 255, 255, 0.07);
          border-radius: 99px;
          overflow: hidden;
        }

        .xp-bar-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #7c3aed 0%, #4f46e5 50%, #06b6d4 100%);
          box-shadow: 0 0 8px rgba(124, 58, 237, 0.5);
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ── Logout ────────────────────────────────────────── */
        .sidebar-logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 9px 12px;
          border-radius: 10px;
          border: 1px solid rgba(239, 68, 68, 0.2);
          background: rgba(239, 68, 68, 0.06);
          color: rgba(252, 165, 165, 0.7);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s, box-shadow 0.18s;
          outline: none;
        }

        .sidebar-logout-btn:hover {
          background: rgba(239, 68, 68, 0.14);
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.4);
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.15);
        }

        .sidebar-logout-btn svg {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
        }
      `}</style>

      <aside className="sidebar-root">
        {/* ── Logo ── */}
        <div className="sidebar-logo">
          <div className="sidebar-hex-icon">A</div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-name">Apex Colab</span>
            <span className="sidebar-logo-sub">
              <Sparkles />
              AI ECOSYSTEM
            </span>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="sidebar-nav">
          {NAV_GROUPS.map((group, gi) => (
            <div className="sidebar-group" key={group.label}>
              {gi > 0 && <div className="sidebar-divider" />}
              <div className="sidebar-group-label">{group.label}</div>
              {group.items.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  className={`sidebar-link${tab === id ? ' active' : ''}`}
                  onClick={() => setTab(id)}
                  aria-current={tab === id ? 'page' : undefined}
                >
                  <Icon className="sidebar-link-icon" strokeWidth={1.75} />
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* ── Footer ── */}
        <div className="sidebar-footer">
          {/* User row */}
          <div className="sidebar-user-row">
            <div className="sidebar-avatar">
              {getInitials(displayUser?.name)}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{displayUser?.name || 'Student'}</div>
              <div className="sidebar-user-college">{displayUser?.college || 'Apex Colab'}</div>
            </div>
          </div>

          {/* XP bar */}
          <div className="sidebar-xp-section">
            <div className="sidebar-xp-label-row">
              <span className="sidebar-xp-label">XP Progress</span>
              <span className="sidebar-xp-value">
                {displayUser?.xp ?? 0} / {displayUser?.xpMax ?? 1000}
              </span>
            </div>
            <div className="xp-bar-track">
              <div
                className="xp-bar-fill"
                style={{ width: `${xpPercent}%` }}
                role="progressbar"
                aria-valuenow={xpPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          {/* Logout */}
          <button className="sidebar-logout-btn" onClick={onLogout}>
            <LogOut />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
