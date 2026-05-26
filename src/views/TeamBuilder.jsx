import { useState, useMemo } from 'react';
import { Search, Filter, Users, Zap, MapPin, Star, Plus, Check, X, Code, Palette, Briefcase, TrendingUp } from 'lucide-react';
import { STUDENTS, CURRENT_USER } from '../mockData';

export default function TeamBuilder() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [collegeFilter, setCollegeFilter] = useState('All');
  const [openToTeam, setOpenToTeam] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [showConstellation, setShowConstellation] = useState(false);

  const roles = ['All', 'Developer', 'Designer', 'Marketer', 'Finance', 'AI Engineer', 'DevOps'];
  const colleges = [
    'All',
    'IIT Bombay',
    'IIT Delhi',
    'NIT Trichy',
    'BITS Pilani',
    'VIT',
    'IIIT Hyderabad',
    'IIT Madras',
  ];

  // Enrich students with match scores
  const enrichedStudents = useMemo(() => {
    return STUDENTS.filter((s) => s.id !== CURRENT_USER?.id).map((s, i) => ({
      ...s,
      matchScore: s.matchScore ?? Math.max(65, 96 - i * 3 + ((s.id ?? i) % 5)),
    }));
  }, []);

  // Filtered students
  const filtered = useMemo(() => {
    return enrichedStudents
      .filter((s) => {
        const q = search.toLowerCase();
        const matchesSearch =
          !q ||
          s.name?.toLowerCase().includes(q) ||
          s.role?.toLowerCase().includes(q) ||
          (s.skills ?? []).some((sk) => sk.toLowerCase().includes(q));
        const matchesRole = roleFilter === 'All' || s.role === roleFilter;
        const matchesCollege = collegeFilter === 'All' || s.college === collegeFilter;
        const matchesOpen = !openToTeam || s.openToTeam;
        return matchesSearch && matchesRole && matchesCollege && matchesOpen;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [enrichedStudents, search, roleFilter, collegeFilter, openToTeam]);

  // AI Recommended (Top 3)
  const aiRecommended = useMemo(
    () => [...enrichedStudents].sort((a, b) => b.matchScore - a.matchScore).slice(0, 3),
    [enrichedStudents]
  );

  const isAdded = (student) => teamMembers.some((m) => m.id === student.id);

  const addMember = (student) => {
    if (!isAdded(student) && teamMembers.length < 4) {
      setTeamMembers((prev) => [...prev, student]);
    }
  };

  const removeMember = (student) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== student.id));
  };

  const handleFinalize = () => {
    setIsFinalizing(true);
    setTimeout(() => {
      setIsFinalizing(false);
      setTeamMembers([]);
    }, 2500);
  };

  return (
    <div className="fade-in" style={{ padding: '40px 48px', width: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      
      {/* CSS orbiting animations injected directly */}
      <style>{`
        @keyframes orbitTeammate0 {
          from { transform: rotate(0deg) translate(80px) rotate(0deg); }
          to { transform: rotate(360deg) translate(80px) rotate(-360deg); }
        }
        @keyframes orbitTeammate1 {
          from { transform: rotate(90deg) translate(80px) rotate(-90deg); }
          to { transform: rotate(450deg) translate(80px) rotate(-450deg); }
        }
        @keyframes orbitTeammate2 {
          from { transform: rotate(180deg) translate(80px) rotate(-180deg); }
          to { transform: rotate(540deg) translate(80px) rotate(-540deg); }
        }
        @keyframes orbitTeammate3 {
          from { transform: rotate(270deg) translate(80px) rotate(-270deg); }
          to { transform: rotate(630deg) translate(80px) rotate(-630deg); }
        }
        
        .orbit-node-0 { animation: orbitTeammate0 10s linear infinite; }
        .orbit-node-1 { animation: orbitTeammate1 10s linear infinite; }
        .orbit-node-2 { animation: orbitTeammate2 10s linear infinite; }
        .orbit-node-3 { animation: orbitTeammate3 10s linear infinite; }
        
        /* Constellation constellation nodes pulsing */
        @keyframes pulseNode {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px var(--violet); }
          50% { transform: scale(1.2); box-shadow: 0 0 25px var(--violet); }
        }
        .pulse-star { animation: pulseNode 3s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <div className="fade-up d1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Apex Colab — Team Builder</h1>
          <p style={{ color: 'var(--text-2)' }}>Form highly synergized, cross-college startup teams powered by neural matching.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setShowConstellation(!showConstellation)} className={`btn ${showConstellation ? 'btn-violet' : 'btn-ghost'}`}>
            <Star size={14} fill={showConstellation ? 'currentColor' : 'none'} /> Constellation View
          </button>
          <div className="card highlight-box" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px' }}>
            <Users size={16} style={{ color: 'var(--violet)' }} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>Active Team</span>
            <span className="badge badge-violet">{teamMembers.length} / 4</span>
          </div>
        </div>
      </div>

      {/* Main Area (Split columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: Filters + Candidates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Filters card */}
          <div className="card fade-up d2" style={{ padding: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-3)' }} />
              <input
                type="text"
                placeholder="Search candidates by name, skills, roles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input"
                style={{ paddingLeft: '44px' }}
              />
            </div>
            
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="input" style={{ width: 'fit-content' }}>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <select value={collegeFilter} onChange={(e) => setCollegeFilter(e.target.value)} className="input" style={{ width: 'fit-content' }}>
              {colleges.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <button
              onClick={() => setOpenToTeam(!openToTeam)}
              className={`btn btn-sm ${openToTeam ? 'btn-violet' : 'btn-ghost'}`}
            >
              Open only
            </button>
          </div>

          {/* AI Recommended Section */}
          <div className="fade-up d3">
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
              <Zap size={16} style={{ color: 'var(--violet)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--violet-light)' }}>AI Recommended Profiles</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
              {aiRecommended.map((student, idx) => {
                const added = isAdded(student);
                return (
                  <div key={student.id} className="card float-student" style={{ padding: '20px', display: 'flex', flexDirection: 'column', animationDelay: `${idx * 0.1}s` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', color: 'var(--violet)' }}>
                        {student.avatar || student.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <span className="badge badge-violet">{student.matchScore || student.match}% match</span>
                    </div>

                    <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '2px' }}>{student.name}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-3)', marginBottom: '8px' }}><MapPin size={10} style={{ display: 'inline', marginRight: '2px' }} />{student.college}</p>
                    
                    <span className="badge badge-cyan" style={{ alignSelf: 'flex-start', marginBottom: '12px', fontSize: '9px' }}>{student.role}</span>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '18px' }}>
                      {student.skills.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}
                    </div>

                    <button
                      onClick={() => added ? removeMember(student) : addMember(student)}
                      className={`btn btn-sm ${added ? 'btn-green' : 'btn-violet'}`}
                      style={{ marginTop: 'auto', width: '100%' }}
                    >
                      {added ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All Candidates Grid */}
          <div className="fade-up d4">
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>All Innovators</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {filtered.map((student) => {
                const added = isAdded(student);
                return (
                  <div key={student.id} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: 'var(--violet)' }}>
                        {student.avatar || student.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.name}</h4>
                        <p style={{ fontSize: '10px', color: 'var(--text-3)', margin: 0 }}>{student.college}</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '9px' }}>{student.role}</span>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--violet)' }}>{student.matchScore || student.match}% synergy</span>
                    </div>

                    <button
                      onClick={() => added ? removeMember(student) : addMember(student)}
                      className={`btn btn-sm ${added ? 'btn-green' : 'btn-ghost'}`}
                      style={{ marginTop: 'auto', width: '100%', padding: '6px' }}
                    >
                      {added ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Orbital Constellation Gravity Well */}
        <div className="fade-up d3" style={{ position: 'sticky', top: '6px' }}>
          
          {showConstellation ? (
            /* Constellation star view */
            <div className="card highlight-box" style={{ padding: '32px', minHeight: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--violet-light)', marginBottom: '4px' }}>Neural Skill Constellation</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '32px', textAlign: 'center' }}>Dynamic map linking required co-working skill nodes</p>
              
              {/* Star Nodes Canvas Space (Pure CSS/HTML Constellation) */}
              <div style={{ position: 'relative', width: '300px', height: '260px' }}>
                {/* Connecting glowing laser lines */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <line x1="50" y1="50" x2="150" y2="130" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
                  <line x1="250" y1="50" x2="150" y2="130" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
                  <line x1="80" y1="200" x2="150" y2="130" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
                  <line x1="220" y1="200" x2="150" y2="130" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
                  <line x1="50" y1="50" x2="250" y2="50" stroke="rgba(124,58,237,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="80" y1="200" x2="220" y2="200" stroke="rgba(124,58,237,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                </svg>

                {/* Central Star node */}
                <div className="pulse-star" style={{ position: 'absolute', left: '135px', top: '115px', width: '30px', height: '30px', borderRadius: '50%', background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '900', color: '#000' }}>
                  AI
                </div>

                {/* Satellite Skill nodes */}
                <div className="pulse-star" style={{ position: 'absolute', left: '35px', top: '35px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--cyan)', animationDelay: '-0.5s' }} title="React node"></div>
                <div className="pulse-star" style={{ position: 'absolute', left: '235px', top: '35px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--cyan)', animationDelay: '-1s' }} title="Figma node"></div>
                <div className="pulse-star" style={{ position: 'absolute', left: '68px', top: '188px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--cyan)', animationDelay: '-1.5s' }} title="Python node"></div>
                <div className="pulse-star" style={{ position: 'absolute', left: '208px', top: '188px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--cyan)', animationDelay: '-2s' }} title="SQL node"></div>

                <div style={{ position: 'absolute', left: '15px', top: '15px', fontSize: '10px', color: 'var(--text-3)' }}>React</div>
                <div style={{ position: 'absolute', left: '235px', top: '15px', fontSize: '10px', color: 'var(--text-3)' }}>Figma</div>
                <div style={{ position: 'absolute', left: '48px', top: '215px', fontSize: '10px', color: 'var(--text-3)' }}>Python</div>
                <div style={{ position: 'absolute', left: '205px', top: '215px', fontSize: '10px', color: 'var(--text-3)' }}>SQL</div>
              </div>
            </div>
          ) : (
            /* Gravity Well team panel */
            <div className="card highlight-box" style={{ padding: '32px', minHeight: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--violet-light)', marginBottom: '4px' }}>Neural Gravity Well</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '32px' }}>Added teammates physically orbit the gravity core</p>

              {/* Orbital Space Ring container */}
              <div style={{
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                border: '1.5px dashed rgba(212, 175, 55, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: '32px'
              }}>
                {/* Central Gravity Well Orb (Violet Pulsing Orb) */}
                <div className="gravity-well">
                  <Users size={32} color="#fff" />
                </div>

                {/* Orbiting team members */}
                {teamMembers.map((member, idx) => (
                  <div
                    key={member.id}
                    className={`orbit-node-${idx}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.9)',
                      border: '2.5px solid var(--bg-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '800',
                      color: '#050505',
                      boxShadow: '0 0 12px rgba(212, 175, 55, 0.5)',
                      position: 'absolute',
                      cursor: 'pointer',
                      zIndex: 15
                    }}
                    title={`${member.name} (${member.role})`}
                    onClick={() => removeMember(member)}
                  >
                    {member.avatar || member.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                ))}

                {/* Empty orbit slots placeholders */}
                {Array.from({ length: 4 - teamMembers.length }).map((_, idx) => {
                  const actualIdx = teamMembers.length + idx;
                  const angles = [0, 90, 180, 270];
                  const angle = (angles[actualIdx] * Math.PI) / 180;
                  const x = 120 + Math.cos(angle) * 80 - 20; // center offset
                  const y = 120 + Math.sin(angle) * 80 - 20;

                  return (
                    <div
                      key={idx}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: '1.5px dashed rgba(255,255,255,0.08)',
                        background: 'rgba(0, 0, 0, 0.25)',
                        position: 'absolute',
                        left: `${x}px`,
                        top: `${y}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '9px',
                        color: 'var(--text-3)'
                      }}
                    >
                      slot
                    </div>
                  );
                })}
              </div>

              {/* Progress and actions */}
              <div style={{ width: '100%', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-2)', marginBottom: '8px' }}>
                  <span>Synergy Factor</span>
                  <span style={{ color: 'var(--violet)', fontWeight: '700' }}>
                    {teamMembers.length > 0 ? `${clamp(Math.round(62 + teamMembers.length * 9.5), 60, 99)}% Synergy` : '0%'}
                  </span>
                </div>
                
                <div className="progress-track" style={{ marginBottom: '24px' }}>
                  <div className="progress-fill progress-violet" style={{ width: `${(teamMembers.length / 4) * 100}%` }}></div>
                </div>

                <button
                  onClick={handleFinalize}
                  disabled={teamMembers.length === 0 || isFinalizing}
                  className="btn btn-violet"
                  style={{ width: '100%', display: 'flex', gap: '8px' }}
                >
                  {isFinalizing ? (
                    'Constellation Locked...'
                  ) : (
                    <>
                      Lock Constellation Matrix
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// Simple clamp helper
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
