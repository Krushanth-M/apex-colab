import { useState } from 'react';
import {
  Brain,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Target,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { SKILL_GAPS, CURRENT_USER, STARTUPS } from '../mockData';

/* ─────────────────────────────────────────────
   Utility helpers
───────────────────────────────────────────── */
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const importanceBadgeStyle = (importance) => {
  const map = {
    High: { background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' },
    Medium: { background: '#fef9c3', color: '#ca8a04', border: '1px solid #fde047' },
    Low: { background: '#dcfce7', color: '#16a34a', border: '1px solid #86efac' },
  };
  return map[importance] ?? map['Medium'];
};

/* Simple SVG sparkline for 5 data-points */
const VelocityChart = ({ data = [20, 35, 50, 62, 78] }) => {
  const W = 260;
  const H = 80;
  const pad = 8;
  const xs = data.map((_, i) => pad + (i / (data.length - 1)) * (W - pad * 2));
  const ys = data.map((v) => H - pad - ((v - 0) / 100) * (H - pad * 2));
  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(' ');

  return (
    <svg
      width={W}
      height={H}
      style={{
        borderRadius: 8,
        background: 'linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)',
      }}
    >
      {/* Gridlines */}
      {[25, 50, 75].map((pct) => {
        const y = H - pad - (pct / 100) * (H - pad * 2);
        return (
          <line
            key={pct}
            x1={pad}
            y1={y}
            x2={W - pad}
            y2={y}
            stroke="#c4b5fd"
            strokeWidth="0.5"
            strokeDasharray="4 3"
          />
        );
      })}

      {/* Area fill */}
      <polygon
        points={`${pad},${H - pad} ${polyline} ${W - pad},${H - pad}`}
        fill="url(#velocityGrad)"
        opacity="0.3"
      />

      {/* Line */}
      <polyline
        points={polyline}
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Dots */}
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={ys[i]} r="4" fill="#7c3aed" stroke="#fff" strokeWidth="1.5" />
      ))}

      {/* Week labels */}
      {data.map((_, i) => (
        <text
          key={i}
          x={xs[i]}
          y={H - 1}
          textAnchor="middle"
          fontSize="9"
          fill="#6d28d9"
          fontWeight="600"
        >
          W{i + 1}
        </text>
      ))}

      <defs>
        <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/* ─────────────────────────────────────────────
   Card 1 – Skill Gap Analyzer
───────────────────────────────────────────── */
const SkillGapAnalyzer = () => {
  const [goalRole, setGoalRole] = useState('SDE at FAANG');
  const [showResults, setShowResults] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const roleOptions = [
    'SDE at FAANG',
    'Product Manager',
    'Startup Founder',
    'Data Scientist',
    'UX Designer',
  ];

  const handleAnalyze = () => {
    setAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 1200);
  };

  const aiInsights = {
    'SDE at FAANG':
      'Based on your profile, focus on Data Structures & Algorithms and System Design first — these are evaluated in all FAANG phone screens. Your current trajectory puts you ~4 months away from interview readiness.',
    'Product Manager':
      'Your technical background is a strong differentiator. Bridge the gap by shipping a side product end-to-end and practicing structured PRD writing. Most PM candidates underestimate the importance of SQL for analytics interviews.',
    'Startup Founder':
      'Legal & Financial literacy is your biggest blind spot. A 2-week intensive on cap tables, term sheets, and go-to-market strategy can accelerate your readiness significantly.',
    'Data Scientist':
      'You have solid statistics fundamentals. Prioritise MLOps and feature engineering — 70% of DS interview questions at top companies revolve around these in practical settings.',
    'UX Designer':
      'Your prototyping skills are strong but case study presentation separates top candidates. Build 3 polished case studies showcasing end-to-end design thinking with quantified business impact.',
  };

  return (
    <div style={styles.card}>
      {/* Card header */}
      <div style={styles.cardHeader}>
        <div style={{ ...styles.iconBadge, background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
          <Brain size={20} color="#fff" />
        </div>
        <div>
          <h3 style={styles.cardTitle}>Skill Gap Analyzer</h3>
          <p style={styles.cardSubtitle}>AI-powered roadmap to your dream role</p>
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controlRow}>
        <select
          value={goalRole}
          onChange={(e) => setGoalRole(e.target.value)}
          style={styles.select}
        >
          {roleOptions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <button onClick={handleAnalyze} style={styles.primaryBtn} disabled={analyzing}>
          {analyzing ? (
            <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <Zap size={14} />
          )}
          {analyzing ? 'Analyzing…' : 'Analyze Gaps'}
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SKILL_GAPS.map((skill, idx) => (
            <div key={idx} style={styles.skillRow}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={styles.skillName}>{skill.skill || skill.name || `Skill ${idx + 1}`}</span>
                <span style={{ ...styles.badge, ...importanceBadgeStyle(skill.importance) }}>
                  {skill.importance}
                </span>
              </div>

              {/* Current level bar */}
              <div style={{ marginBottom: 4 }}>
                <div style={styles.barLabelRow}>
                  <span style={styles.barLabel}>Current Level</span>
                  <span style={styles.barValue}>{skill.currentLevel ?? skill.current ?? 45}%</span>
                </div>
                <div style={styles.barTrack}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${skill.currentLevel ?? skill.current ?? 45}%`,
                      background: 'linear-gradient(90deg,#7c3aed,#a78bfa)',
                    }}
                  />
                </div>
              </div>

              {/* Gap bar */}
              <div style={{ marginBottom: 8 }}>
                <div style={styles.barLabelRow}>
                  <span style={styles.barLabel}>Gap Size</span>
                  <span style={{ ...styles.barValue, color: '#dc2626' }}>
                    {skill.gap ?? skill.gapSize ?? 30}%
                  </span>
                </div>
                <div style={styles.barTrack}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${skill.gap ?? skill.gapSize ?? 30}%`,
                      background: 'linear-gradient(90deg,#ef4444,#fca5a5)',
                    }}
                  />
                </div>
              </div>

              {/* Course link */}
              {(skill.course || skill.recommendedCourse) && (
                <a
                  href="#"
                  style={styles.courseLink}
                  onClick={(e) => e.preventDefault()}
                >
                  <span>{skill.course ?? skill.recommendedCourse}</span>
                  <ArrowRight size={13} />
                </a>
              )}
            </div>
          ))}

          {/* AI insight */}
          <div style={styles.insightBox}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <Lightbulb size={16} color="#7c3aed" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={styles.insightText}>{aiInsights[goalRole]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Card 2 – Project Feasibility Scorer
───────────────────────────────────────────── */
const ProjectFeasibilityScorer = () => {
  const [idea, setIdea] = useState(
    STARTUPS?.[0]?.description ?? 'An AI-powered campus hiring platform that matches students with startups based on skills and cultural fit.'
  );
  const [industry, setIndustry] = useState('EdTech');
  const [showResults, setShowResults] = useState(true);
  const [scoring, setScoring] = useState(false);

  const industryOptions = ['EdTech', 'FinTech', 'HealthTech', 'CleanTech', 'SaaS'];

  const handleScore = () => {
    setScoring(true);
    setShowResults(false);
    setTimeout(() => {
      setScoring(false);
      setShowResults(true);
    }, 1400);
  };

  const metrics = [
    { label: 'Market Fit', value: 88, color: '#16a34a' },
    { label: 'Technical Feasibility', value: 78, color: '#2563eb' },
  ];

  const suggestions = [
    'Start with a single university pilot — narrow TAM improves iteration speed by ~3×.',
    'Integrate LinkedIn OAuth early to reduce student onboarding friction below 2 minutes.',
    'Apply for NASSCOM 10,000 Startups and BITS TBI grants — high acceptance rates for EdTech.',
  ];

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={{ ...styles.iconBadge, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)' }}>
          <Target size={20} color="#fff" />
        </div>
        <div>
          <h3 style={styles.cardTitle}>Project Feasibility Scorer</h3>
          <p style={styles.cardSubtitle}>Validate your startup idea instantly</p>
        </div>
      </div>

      {/* Idea textarea */}
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe your startup idea…"
        style={styles.textarea}
        rows={3}
      />

      {/* Industry + button */}
      <div style={{ ...styles.controlRow, marginTop: 10 }}>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={styles.select}>
          {industryOptions.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
        <button onClick={handleScore} style={{ ...styles.primaryBtn, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)' }} disabled={scoring}>
          {scoring ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Zap size={14} />}
          {scoring ? 'Scoring…' : 'Score with AI'}
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Overall score */}
          <div style={styles.overallScore}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: '#0ea5e9', lineHeight: 1 }}>82</span>
              <span style={{ fontSize: 18, fontWeight: 600, color: '#94a3b8' }}>/100</span>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b', fontWeight: 600 }}>Overall Score</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              {metrics.map((m) => (
                <div key={m.label}>
                  <div style={styles.barLabelRow}>
                    <span style={styles.barLabel}>{m.label}</span>
                    <span style={{ ...styles.barValue, color: m.color }}>{m.value}%</span>
                  </div>
                  <div style={styles.barTrack}>
                    <div style={{ ...styles.barFill, width: `${m.value}%`, background: m.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge row */}
          <div style={styles.badgeRow}>
            <div style={styles.infoChip}>
              <TrendingUp size={13} color="#16a34a" />
              <span>Competition: <strong>Medium</strong></span>
            </div>
            <div style={styles.infoChip}>
              <Clock size={13} color="#0ea5e9" />
              <span>MVP: <strong>4–6 months</strong></span>
            </div>
            <div style={styles.infoChip}>
              <Users size={13} color="#7c3aed" />
              <span>Team: <strong>3–4 people</strong></span>
            </div>
          </div>

          {/* Suggestions */}
          <div style={styles.insightBox}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
              <Lightbulb size={15} color="#0ea5e9" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0ea5e9' }}>AI Suggestions</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {suggestions.map((s, i) => (
                <li key={i} style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Card 3 – Smart Deadline Predictor
───────────────────────────────────────────── */
const SmartDeadlinePredictor = () => {
  const [projectName, setProjectName] = useState('Apex Colab MVP');
  const [teamSize, setTeamSize] = useState(4);
  const [complexity, setComplexity] = useState('Medium');
  const [progress, setProgress] = useState(35);
  const [showResults, setShowResults] = useState(true);
  const [predicting, setPredicting] = useState(false);

  const complexityOptions = ['Low', 'Medium', 'High'];

  const handlePredict = () => {
    setPredicting(true);
    setShowResults(false);
    setTimeout(() => {
      setPredicting(false);
      setShowResults(true);
    }, 1300);
  };

  // Derive estimated date (mock logic for display)
  const weeksLeft = Math.round(((100 - progress) / 100) * (complexity === 'Low' ? 6 : complexity === 'Medium' ? 10 : 16) * (5 / teamSize));
  const estDate = new Date();
  estDate.setDate(estDate.getDate() + weeksLeft * 7);
  const formattedDate = estDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const confidence = clamp(Math.round(85 - (complexity === 'High' ? 15 : complexity === 'Medium' ? 8 : 0) + teamSize * 1.5), 50, 95);

  const riskFactors = [
    complexity === 'High' ? 'High technical complexity may cause scope creep' : 'Moderate scope — manageable with clear milestones',
    teamSize < 3 ? 'Small team — single-point-of-failure risk on critical paths' : `Team of ${teamSize} is well-suited for parallel development`,
    progress < 20 ? 'Early stage — requirements may still shift significantly' : 'Sufficient progress baseline for reliable forecasting',
  ];

  const velocityData = [10, 22, 35, 48, progress];

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={{ ...styles.iconBadge, background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
          <Clock size={20} color="#fff" />
        </div>
        <div>
          <h3 style={styles.cardTitle}>Smart Deadline Predictor</h3>
          <p style={styles.cardSubtitle}>ML-driven project completion forecast</p>
        </div>
      </div>

      {/* Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project name"
          style={styles.input}
        />

        {/* Team size slider */}
        <div>
          <div style={styles.barLabelRow}>
            <span style={styles.barLabel}>Team Size</span>
            <span style={{ ...styles.barValue, color: '#d97706' }}>{teamSize} people</span>
          </div>
          <input
            type="range"
            min={1}
            max={8}
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        {/* Complexity */}
        <div style={styles.toggleRow}>
          {complexityOptions.map((c) => (
            <button
              key={c}
              onClick={() => setComplexity(c)}
              style={{
                ...styles.toggleBtn,
                ...(complexity === c
                  ? { background: '#f59e0b', color: '#fff', borderColor: '#f59e0b' }
                  : {}),
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div>
          <div style={styles.barLabelRow}>
            <span style={styles.barLabel}>Current Progress</span>
            <span style={{ ...styles.barValue, color: '#d97706' }}>{progress}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={95}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            style={styles.slider}
          />
        </div>
      </div>

      <button onClick={handlePredict} style={{ ...styles.primaryBtn, marginTop: 12, width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg,#f59e0b,#d97706)' }} disabled={predicting}>
        {predicting ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <TrendingUp size={14} />}
        {predicting ? 'Predicting…' : 'Predict Deadline'}
      </button>

      {/* Results */}
      {showResults && (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Date + confidence */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ ...styles.resultChip, flex: 2, background: '#fffbeb', border: '1px solid #fde68a' }}>
              <span style={{ fontSize: 11, color: '#92400e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimated Completion</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#d97706', marginTop: 2 }}>{formattedDate}</span>
            </div>
            <div style={{ ...styles.resultChip, flex: 1, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <span style={{ fontSize: 11, color: '#166534', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confidence</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#16a34a', marginTop: 2 }}>{confidence}%</span>
            </div>
          </div>

          {/* Risk factors */}
          <div style={styles.insightBox}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <AlertTriangle size={14} color="#d97706" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#d97706' }}>Risk Factors</span>
            </div>
            {riskFactors.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 4 }}>
                <span style={{ color: '#f59e0b', flexShrink: 0, lineHeight: 1.6 }}>•</span>
                <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
          </div>

          {/* Velocity chart */}
          <div>
            <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, color: '#64748b' }}>Progress Velocity (last 5 weeks)</p>
            <VelocityChart data={velocityData} />
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Card 4 – Team Sentiment Analyzer
───────────────────────────────────────────── */
const TeamSentimentAnalyzer = () => {
  const [messages, setMessages] = useState(
    "Hey team, great job on the last sprint! The demo went really well 🎉\nThough I'm a bit overwhelmed with the backend tasks piling up...\nWe need to fix the auth bug ASAP, it's blocking everyone.\nOverall I think we're making solid progress. Let's push through!"
  );
  const [showResults, setShowResults] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };

  const sentiments = [
    { label: 'Positive', pct: 60, color: '#16a34a', bg: '#dcfce7' },
    { label: 'Neutral', pct: 28, color: '#64748b', bg: '#f1f5f9' },
    { label: 'Negative', pct: 12, color: '#dc2626', bg: '#fee2e2' },
  ];

  const recommendations = [
    'Schedule a 15-minute async check-in to address the backend bottleneck before it escalates.',
    'Celebrate the successful demo publicly — positive reinforcement sustains team velocity.',
    'Break the auth bug into a focused spike with a dedicated owner and a 2-day time-box.',
  ];

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={{ ...styles.iconBadge, background: 'linear-gradient(135deg,#ec4899,#db2777)' }}>
          <Users size={20} color="#fff" />
        </div>
        <div>
          <h3 style={styles.cardTitle}>Team Sentiment Analyzer</h3>
          <p style={styles.cardSubtitle}>Real-time team health monitoring</p>
        </div>
      </div>

      <textarea
        value={messages}
        onChange={(e) => setMessages(e.target.value)}
        placeholder="Paste recent team messages or updates…"
        style={styles.textarea}
        rows={4}
      />

      <button
        onClick={handleAnalyze}
        style={{ ...styles.primaryBtn, marginTop: 10, width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg,#ec4899,#db2777)' }}
        disabled={analyzing}
      >
        {analyzing ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Brain size={14} />}
        {analyzing ? 'Analyzing…' : 'Analyze Team Health'}
      </button>

      {showResults && (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Health score + burnout */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ ...styles.resultChip, flex: 1, background: '#fdf2f8', border: '1px solid #fbcfe8' }}>
              <span style={{ fontSize: 11, color: '#9d174d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Health Score</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginTop: 2 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#ec4899' }}>74</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>/100</span>
              </div>
            </div>
            <div style={{ ...styles.resultChip, flex: 1, background: '#fffbeb', border: '1px solid #fde68a' }}>
              <span style={{ fontSize: 11, color: '#92400e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Burnout Risk</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <AlertTriangle size={16} color="#f59e0b" />
                <span style={{ fontSize: 15, fontWeight: 700, color: '#d97706' }}>Medium</span>
              </div>
            </div>
          </div>

          {/* Sentiment bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#64748b' }}>Sentiment Breakdown</p>
            {sentiments.map((s) => (
              <div key={s.label}>
                <div style={styles.barLabelRow}>
                  <span style={{ ...styles.barLabel, color: s.color, fontWeight: 700 }}>{s.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.pct}%</span>
                </div>
                <div style={{ ...styles.barTrack, background: s.bg }}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${s.pct}%`,
                      background: s.color,
                      transition: 'width 0.8s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div style={styles.insightBox}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <CheckCircle size={14} color="#ec4899" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#ec4899' }}>AI Recommendations</span>
            </div>
            {recommendations.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 4 }}>
                <span style={{ color: '#ec4899', flexShrink: 0, lineHeight: 1.6 }}>•</span>
                <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main AITools view
───────────────────────────────────────────── */
const AITools = () => {
  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>AI Tools</h1>
          <p style={styles.pageSubtitle}>Powered by Apex Colab Intelligence</p>
        </div>
        <div style={styles.sparklesBadge}>
          <Sparkles size={16} color="#7c3aed" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#7c3aed' }}>4 Smart Features Active</span>
        </div>
      </div>

      {/* ── 2×2 Grid ── */}
      <div style={styles.grid}>
        <SkillGapAnalyzer />
        <ProjectFeasibilityScorer />
        <SmartDeadlinePredictor />
        <TeamSentimentAnalyzer />
      </div>

      {/* Spin keyframe (injected via style tag) */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const styles = {
  page: {
    padding: '40px 48px',
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  /* Header */
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    flexWrap: 'wrap',
    gap: 12,
  },
  pageTitle: {
    margin: 0,
    fontSize: 34,
    fontWeight: 800,
    color: '#0f172a',
    letterSpacing: '-0.5px',
  },
  pageSubtitle: {
    margin: '4px 0 0',
    fontSize: 15,
    color: '#64748b',
    fontWeight: 500,
  },
  sparklesBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    background: '#f5f3ff',
    border: '1px solid #c4b5fd',
    borderRadius: 24,
  },

  /* Grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,
  },

  /* Card shell */
  card: {
    background: '#ffffff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: '#0f172a',
  },
  cardSubtitle: {
    margin: '2px 0 0',
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 500,
  },

  /* Form controls */
  controlRow: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },
  select: {
    flex: 1,
    padding: '9px 12px',
    borderRadius: 10,
    border: '1.5px solid #e2e8f0',
    fontSize: 13,
    color: '#1e293b',
    background: '#f8fafc',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  input: {
    width: '100%',
    padding: '9px 12px',
    borderRadius: 10,
    border: '1.5px solid #e2e8f0',
    fontSize: 13,
    color: '#1e293b',
    background: '#f8fafc',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 10,
    border: '1.5px solid #e2e8f0',
    fontSize: 13,
    color: '#1e293b',
    background: '#f8fafc',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    lineHeight: 1.6,
  },
  slider: {
    width: '100%',
    accentColor: '#f59e0b',
    cursor: 'pointer',
  },
  toggleRow: {
    display: 'flex',
    gap: 8,
  },
  toggleBtn: {
    flex: 1,
    padding: '7px 0',
    borderRadius: 8,
    border: '1.5px solid #e2e8f0',
    background: '#f8fafc',
    color: '#64748b',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s ease',
  },

  /* Primary button */
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '9px 16px',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
    color: '#fff',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
    transition: 'opacity 0.15s ease',
  },

  /* Skill row */
  skillRow: {
    padding: '12px 14px',
    borderRadius: 12,
    background: '#fafafa',
    border: '1px solid #f1f5f9',
  },
  skillName: {
    fontSize: 13,
    fontWeight: 700,
    color: '#1e293b',
  },

  /* Bars */
  barLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  barValue: {
    fontSize: 11,
    fontWeight: 700,
    color: '#7c3aed',
  },
  barTrack: {
    height: 6,
    borderRadius: 99,
    background: '#e2e8f0',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 99,
    transition: 'width 0.6s ease',
  },

  /* Badges */
  badge: {
    fontSize: 10,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 99,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  /* Course link */
  courseLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    color: '#7c3aed',
    textDecoration: 'none',
    padding: '4px 0',
  },

  /* Insight box */
  insightBox: {
    background: '#f8f7ff',
    border: '1px solid #e9d5ff',
    borderRadius: 10,
    padding: 12,
  },
  insightText: {
    margin: 0,
    fontSize: 12,
    color: '#475569',
    lineHeight: 1.6,
  },

  /* Overall score box */
  overallScore: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    background: '#f0f9ff',
    border: '1px solid #bae6fd',
    borderRadius: 12,
    padding: 14,
  },

  /* Badge row */
  badgeRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  infoChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 10px',
    borderRadius: 8,
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    fontSize: 12,
    color: '#475569',
  },

  /* Result chip */
  resultChip: {
    borderRadius: 12,
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
  },
};

export default AITools;
