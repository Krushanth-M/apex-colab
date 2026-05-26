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

export default function Sidebar({ tab, setTab, user, onLogout, roleMode = 'maker', setRoleMode }) {
  const displayUser = user || CURRENT_USER;
  const xpPercent = displayUser?.xp && displayUser?.xpNext
    ? Math.min(100, Math.round((displayUser.xp / displayUser.xpNext) * 100))
    : 62;

  // Dynamically configure nav groups based on active roleMode
  const navGroups = roleMode === 'investor'
    ? [
        {
          label: 'INVESTOR MAIN',
          items: [
            { id: 'investor-dashboard', icon: LayoutDashboard, label: 'Investor Portal' },
            { id: 'investor-startups',  icon: Rocket,          label: 'Browse Startups' },
            { id: 'investor-ai-matches',icon: Brain,           label: 'AI Match Finder' },
          ]
        },
        {
          label: 'COLLABORATE',
          items: [
            { id: 'rooms',     icon: Video,           label: 'Virtual Rooms' },
          ]
        },
        {
          label: 'STUDENTS',
          items: [
            { id: 'leaderboard', icon: Trophy,    label: 'Leaderboard' },
            { id: 'analytics',   icon: BarChart3, label: 'Analytics' },
          ]
        }
      ]
    : [
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

  return (
    <>
      <style>{`
        .sidebar-root {
          width: 260px;
          min-width: 260px;
          height: 100%;
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
          padding: 24px 20px 14px;
          flex-shrink: 0;
        }

        .sidebar-hex-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #f3e5ab 0%, #aa7c11 100%);
          display: flex;
          align-items: center;
          justifyContent: center;
          font-size: 18px;
          font-weight: 900;
          color: #000;
          letter-spacing: -1px;
          box-shadow: 0 0 24px rgba(212, 175, 55, 0.25), 0 2px 8px rgba(0,0,0,0.4);
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
          color: #d4af37;
          line-height: 1;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .sidebar-logo-sub svg {
          width: 9px;
          height: 9px;
        }

        /* ── Role Switcher ─────────────────────────────────── */
        .role-switcher-container {
          padding: 4px 16px 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .role-switcher-pill {
          display: flex;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 3px;
          width: 100%;
        }

        .role-switcher-btn {
          flex: 1;
          padding: 6px 8px;
          border-radius: 17px;
          font-size: 10px;
          font-weight: 800;
          cursor: pointer;
          border: none;
          background: transparent;
          color: rgba(148, 163, 184, 0.6);
          text-align: center;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          outline: none;
        }

        .role-switcher-btn:hover {
          color: #e2e8f0;
        }

        .role-switcher-btn.active {
          background: linear-gradient(135deg, #f3e5ab 0%, #aa7c11 100%);
          color: #050505;
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.3);
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
          background: linear-gradient(90deg, rgba(212, 175, 55, 0.12) 0%, rgba(170, 124, 17, 0.05) 100%);
          color: #f3e5ab;
          font-weight: 600;
          box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.22);
        }

        .sidebar-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 18%;
          bottom: 18%;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: linear-gradient(180deg, #f3e5ab, #aa7c11);
        }

        .sidebar-link-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          transition: color 0.18s;
        }

        .sidebar-link.active .sidebar-link-icon {
          color: #f3e5ab;
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
          background: linear-gradient(135deg, #f3e5ab 0%, #aa7c11 100%);
          display: flex;
          align-items: center;
          justifyContent: center;
          font-size: 13px;
          font-weight: 700;
          color: #000;
          letter-spacing: 0.02em;
          flex-shrink: 0;
          box-shadow: 0 0 18px rgba(212, 175, 55, 0.18);
          border: 1.5px solid rgba(212, 175, 55, 0.3);
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
          color: #d4af37;
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
          background: linear-gradient(90deg, #f3e5ab 0%, #aa7c11 100%);
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ── Logout ────────────────────────────────────────── */
        .sidebar-logout-btn {
          display: flex;
          align-items: center;
          justifyContent: center;
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

        {/* ── Role Switcher ── */}
        <div className="role-switcher-container">
          <div className="role-switcher-pill">
            <button
              onClick={() => { setRoleMode('maker'); setTab('dashboard'); }}
              className={`role-switcher-btn${roleMode === 'maker' ? ' active' : ''}`}
            >
              Maker Mode
            </button>
            <button
              onClick={() => { setRoleMode('investor'); setTab('investor-dashboard'); }}
              className={`role-switcher-btn${roleMode === 'investor' ? ' active' : ''}`}
            >
              Investor Mode
            </button>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="sidebar-nav">
          {navGroups.map((group, gi) => (
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
                {displayUser?.xp ?? 0} / {displayUser?.xpNext ?? 4000}
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
