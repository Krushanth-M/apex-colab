import { useState } from 'react';
import { CURRENT_USER, SKILL_GAPS } from '../mockData';
import {
  Edit3,
  Plus,
  Zap,
  Brain,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Star,
  Award,
} from 'lucide-react';

// ─── Helpers ────────────────────────────────────────────────────────────────

const SKILL_COLORS = {
  React: '#8b5cf6',
  Python: '#06b6d4',
  TensorFlow: '#f59e0b',
  'Node.js': '#22c55e',
  TypeScript: '#3b82f6',
  JavaScript: '#eab308',
  CSS: '#ec4899',
  HTML: '#f97316',
  Git: '#ef4444',
  Docker: '#0ea5e9',
};

function getSkillColor(name) {
  return SKILL_COLORS[name] ?? '#a78bfa';
}

// ─── Left Panel ──────────────────────────────────────────────────────────────

function LeftPanel({ user }) {
  return (
    <aside
      className="card"
      style={{
        width: 340,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 28,
        alignSelf: 'flex-start',
        position: 'sticky',
        top: 24,
      }}
    >
      {/* Avatar + basic info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: 1,
            boxShadow: '0 0 0 4px rgba(124,58,237,0.25)',
          }}
        >
          {user.avatar || 'KM'}
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
            {user.name}
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
            {user.college}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-muted, #6b7280)' }}>
            {user.year} · {user.department}
          </p>
        </div>

        {/* Open to Team badge */}
        {user.openToTeam && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(34,197,94,0.15)',
              border: '1px solid rgba(34,197,94,0.4)',
              color: '#22c55e',
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#22c55e',
                display: 'inline-block',
              }}
            />
            Open to Team
          </span>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

      {/* Bio */}
      {user.bio && (
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {user.bio}
        </p>
      )}

      {/* Skills */}
      <div>
        <p
          style={{
            margin: '0 0 10px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: 'var(--text-muted, #6b7280)',
          }}
        >
          Skills
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {user.skills.map((skill) => (
            <span key={skill} className="tag">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

      {/* Social links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {user.github && (
          <a
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 13,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#a78bfa')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            <span>{user.github.replace('https://', '')}</span>
          </a>
        )}
        {user.linkedin && (
          <a
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 13,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#06b6d4')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            <span>{user.linkedin.replace('https://', '')}</span>
          </a>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

      {/* Badge wall */}
      {user.badges && user.badges.length > 0 && (
        <div>
          <p
            style={{
              margin: '0 0 10px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: 'var(--text-muted, #6b7280)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Award size={12} />
            Badges
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {user.badges.map((badge, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  borderRadius: 20,
                  padding: '4px 10px',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}
              >
                <span>{badge.emoji ?? '🏅'}</span>
                <span>{badge.label ?? badge}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── AI Resume Builder ────────────────────────────────────────────────────────

function ResumeBuilder({ user }) {
  const [githubUrl, setGithubUrl] = useState(user.github ?? '');
  const [linkedinUrl, setLinkedinUrl] = useState(user.linkedin ?? '');
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1400);
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '10px 14px',
    color: 'var(--text-primary)',
    fontSize: 13,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <div className="card" style={{ padding: 28 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(6,182,212,0.3) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Brain size={20} color="#a78bfa" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
              AI Resume Builder
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-muted, #6b7280)' }}>
              Powered by Apex Colab AI
            </p>
          </div>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: 20,
            padding: '3px 10px',
            fontSize: 11,
            color: '#a78bfa',
            fontWeight: 600,
          }}
        >
          <Zap size={10} />
          AI
        </span>
      </div>

      {/* Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        <div>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              color: 'var(--text-muted, #6b7280)',
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            GitHub URL
          </label>
          <input
            type="url"
            placeholder="https://github.com/username"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
        </div>
        <div>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              color: 'var(--text-muted, #6b7280)',
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            LinkedIn URL
          </label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/username"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(6,182,212,0.5)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          width: '100%',
          padding: '11px 20px',
          background: loading
            ? 'rgba(124,58,237,0.4)'
            : 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
          border: 'none',
          borderRadius: 10,
          color: '#fff',
          fontSize: 14,
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'opacity 0.2s, transform 0.1s',
          boxShadow: '0 4px 15px rgba(124,58,237,0.35)',
        }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = '0.9'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        {loading ? (
          <>
            <span
              style={{
                width: 14,
                height: 14,
                border: '2px solid rgba(255,255,255,0.4)',
                borderTop: '2px solid #fff',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            Generating…
          </>
        ) : (
          <>
            <Zap size={15} />
            Generate Profile
          </>
        )}
      </button>

      {/* Generated resume card */}
      {generated && (
        <div
          style={{
            marginTop: 24,
            background: 'rgba(124,58,237,0.06)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 14,
            padding: 22,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
            }}
          >
            <Star size={15} color="#f59e0b" fill="#f59e0b" />
            <span
              style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}
            >
              {user.name} — AI-Generated Profile
            </span>
          </div>

          <p
            style={{
              margin: '0 0 16px',
              fontSize: 12,
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
            }}
          >
            {user.year} student at <strong style={{ color: 'var(--text-primary)' }}>{user.college}</strong>{' '}
            specializing in <strong style={{ color: '#a78bfa' }}>{user.department}</strong>. Passionate
            about building impactful products with modern web technologies and machine learning.
          </p>

          <p
            style={{
              margin: '0 0 10px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: 'var(--text-muted, #6b7280)',
            }}
          >
            Skill Scores
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(user.skillScores ?? {}).map(([skill, score]) => (
              <div key={skill}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span>{skill}</span>
                  <span style={{ color: getSkillColor(skill), fontWeight: 600 }}>{score}%</span>
                </div>
                <div
                  style={{
                    height: 5,
                    borderRadius: 99,
                    background: 'rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${score}%`,
                      background: getSkillColor(skill),
                      borderRadius: 99,
                      transition: 'width 0.8s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Skill Radar ──────────────────────────────────────────────────────────────

function SkillRadar({ user }) {
  return (
    <div className="card" style={{ padding: 28 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 22,
        }}
      >
        <TrendingUp size={18} color="#06b6d4" />
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
          Skill Radar
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Object.entries(user.skillScores ?? {}).map(([skill, score]) => {
          const color = getSkillColor(skill);
          return (
            <div key={skill}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: color,
                      display: 'inline-block',
                      flexShrink: 0,
                      boxShadow: `0 0 6px ${color}`,
                    }}
                  />
                  {skill}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color,
                    minWidth: 36,
                    textAlign: 'right',
                  }}
                >
                  {score}%
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 99,
                  background: 'rgba(255,255,255,0.07)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${score}%`,
                    background: `linear-gradient(90deg, ${color}cc, ${color})`,
                    borderRadius: 99,
                    transition: 'width 1s ease',
                    boxShadow: `0 0 8px ${color}66`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Skill Gap Analyzer ───────────────────────────────────────────────────────

function SkillGapAnalyzer() {
  return (
    <div className="card" style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ marginBottom: 22 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 4,
          }}
        >
          <BookOpen size={18} color="#f59e0b" />
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
            Skill Gap Analysis
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted, #6b7280)' }}>
          AI-detected gaps based on your goals
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {SKILL_GAPS.map((gap, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12,
              padding: 16,
            }}
          >
            {/* Skill name + importance label */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <span
                style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}
              >
                {gap.skill}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color:
                    gap.importance >= 80
                      ? '#ef4444'
                      : gap.importance >= 60
                      ? '#f59e0b'
                      : '#22c55e',
                  background:
                    gap.importance >= 80
                      ? 'rgba(239,68,68,0.1)'
                      : gap.importance >= 60
                      ? 'rgba(245,158,11,0.1)'
                      : 'rgba(34,197,94,0.1)',
                  border: `1px solid ${
                    gap.importance >= 80
                      ? 'rgba(239,68,68,0.3)'
                      : gap.importance >= 60
                      ? 'rgba(245,158,11,0.3)'
                      : 'rgba(34,197,94,0.3)'
                  }`,
                  borderRadius: 20,
                  padding: '2px 8px',
                }}
              >
                {gap.importance >= 80
                  ? 'High Priority'
                  : gap.importance >= 60
                  ? 'Medium Priority'
                  : 'Low Priority'}
              </span>
            </div>

            {/* Importance bar */}
            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: 'var(--text-muted, #6b7280)',
                  marginBottom: 4,
                }}
              >
                <span>Importance</span>
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>{gap.importance}%</span>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 99,
                  background: 'rgba(245,158,11,0.1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${gap.importance}%`,
                    background: 'linear-gradient(90deg, #d97706, #f59e0b)',
                    borderRadius: 99,
                    boxShadow: '0 0 6px rgba(245,158,11,0.4)',
                    transition: 'width 1s ease',
                  }}
                />
              </div>
            </div>

            {/* Current level bar */}
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: 'var(--text-muted, #6b7280)',
                  marginBottom: 4,
                }}
              >
                <span>Current Level</span>
                <span style={{ color: '#8b5cf6', fontWeight: 600 }}>{gap.currentLevel}%</span>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 99,
                  background: 'rgba(139,92,246,0.1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${gap.currentLevel}%`,
                    background: 'linear-gradient(90deg, #6d28d9, #8b5cf6)',
                    borderRadius: 99,
                    boxShadow: '0 0 6px rgba(139,92,246,0.4)',
                    transition: 'width 1s ease',
                  }}
                />
              </div>
            </div>

            {/* Recommended course */}
            {gap.recommendedCourse && (
              <a
                href={gap.courseUrl ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  color: '#06b6d4',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#06b6d4')}
              >
                <BookOpen size={12} />
                {gap.recommendedCourse}
                <ChevronRight size={12} />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* View all button */}
      <button
        style={{
          marginTop: 20,
          width: '100%',
          padding: '10px 20px',
          background: 'rgba(245,158,11,0.1)',
          border: '1px solid rgba(245,158,11,0.25)',
          borderRadius: 10,
          color: '#f59e0b',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(245,158,11,0.18)';
          e.currentTarget.style.borderColor = 'rgba(245,158,11,0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(245,158,11,0.1)';
          e.currentTarget.style.borderColor = 'rgba(245,158,11,0.25)';
        }}
      >
        <TrendingUp size={14} />
        View all recommendations
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

// ─── Accessibility Settings Card ──────────────────────────────────────────────

function AccessibilitySettings() {
  const [reduceMotion, setReduceMotion] = useState(
    () => localStorage.getItem('apex-reduce-motion') === 'true'
  );
  const [highContrast, setHighContrast] = useState(
    () => localStorage.getItem('apex-high-contrast') === 'true'
  );
  const [geminiKey, setGeminiKey] = useState(
    () => localStorage.getItem('apex-gemini-key') || ''
  );

  const toggleReduceMotion = () => {
    const nextVal = !reduceMotion;
    setReduceMotion(nextVal);
    localStorage.setItem('apex-reduce-motion', String(nextVal));
    document.documentElement.classList.toggle('reduce-motion', nextVal);
  };

  const toggleHighContrast = () => {
    const nextVal = !highContrast;
    setHighContrast(nextVal);
    localStorage.setItem('apex-high-contrast', String(nextVal));
    document.documentElement.classList.toggle('high-contrast', nextVal);
  };

  const handleGeminiKeyChange = (e) => {
    const val = e.target.value;
    setGeminiKey(val);
    localStorage.setItem('apex-gemini-key', val);
  };

  return (
    <div className="card highlight-box" style={{ padding: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(170, 124, 17, 0.1) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          color: '#d4af37',
          flexShrink: 0
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
            Ecosystem Settings & Accessibility
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-muted, #6b7280)' }}>
            Tailor the Liquid Intelligence universe to your system needs
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Gemini API Key Hookup */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: '16px 20px'
        }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
              Gemini AI Co-Pilot API Key
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted, #6b7280)', marginTop: 4, display: 'block', lineHeight: 1.4 }}>
              Enter your Google Gemini API Key to enable the real-time Gemini 2.5 Flash model in your bottom-left chat assistant. Securely saved in your local storage.
            </span>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="password"
              className="input"
              value={geminiKey}
              onChange={handleGeminiKeyChange}
              placeholder="AIzaSy... (API Key)"
              style={{
                width: '100%',
                background: 'rgba(18, 17, 14, 0.7)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                fontSize: 13.5,
                padding: '10px 14px',
                color: '#fff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Toggle 1: Reduce Motion */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: '16px 20px'
        }}>
          <div style={{ flex: 1, paddingRight: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
              Reduce Motion
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted, #6b7280)', marginTop: 4, display: 'block', lineHeight: 1.4 }}>
              Disables all float/drift keyframes and stops ambient canvas particle animations for faster rendering and low CPU usage.
            </span>
          </div>
          
          <button
            onClick={toggleReduceMotion}
            aria-checked={reduceMotion}
            role="switch"
            style={{
              width: 52,
              height: 28,
              borderRadius: 14,
              backgroundColor: reduceMotion ? '#d4af37' : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background-color 0.25s, box-shadow 0.25s',
              boxShadow: reduceMotion ? '0 0 12px rgba(212, 175, 55, 0.4)' : 'none',
              padding: 0
            }}
          >
            <div style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              backgroundColor: '#050505',
              border: '1px solid rgba(255,255,255,0.2)',
              position: 'absolute',
              top: 2,
              left: reduceMotion ? 26 : 2,
              transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
          </button>
        </div>

        {/* Toggle 2: High Contrast Mode */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: '16px 20px'
        }}>
          <div style={{ flex: 1, paddingRight: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
              High Contrast Mode
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted, #6b7280)', marginTop: 4, display: 'block', lineHeight: 1.4 }}>
              Swaps the dark neon theme for a light ivory theme with extremely sharp text and enhanced high-contrast outlines.
            </span>
          </div>
          
          <button
            onClick={toggleHighContrast}
            aria-checked={highContrast}
            role="switch"
            style={{
              width: 52,
              height: 28,
              borderRadius: 14,
              backgroundColor: highContrast ? '#d4af37' : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background-color 0.25s, box-shadow 0.25s',
              boxShadow: highContrast ? '0 0 12px rgba(212, 175, 55, 0.4)' : 'none',
              padding: 0
            }}
          >
            <div style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              backgroundColor: '#050505',
              border: '1px solid rgba(255,255,255,0.2)',
              position: 'absolute',
              top: 2,
              left: highContrast ? 26 : 2,
              transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Profile() {
  const user = CURRENT_USER;

  return (
    <>
      {/* Keyframe for spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{
          padding: '40px 48px',
          display: 'grid',
          gridTemplateColumns: '340px 1fr',
          gap: 28,
          alignItems: 'flex-start',
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        {/* Left panel */}
        <LeftPanel user={user} />

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <AccessibilitySettings />
          <ResumeBuilder user={user} />
          <SkillRadar user={user} />
          <SkillGapAnalyzer />
        </div>
      </div>
    </>
  );
}
