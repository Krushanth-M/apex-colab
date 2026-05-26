import { useState } from 'react';
import { Trophy, Zap, Flame, Award, Clock, ChevronRight, Plus, Check } from 'lucide-react';
import { LEADERBOARD, BOUNTIES, CURRENT_USER } from '../mockData';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('rank');
  const [bountyFilter, setBountyFilter] = useState('All');
  const [claimedBounties, setClaimedBounties] = useState([]);
  const [streakChecks, setStreakChecks] = useState({
    code: false,
    pr: false,
    upvote: false
  });

  const topThree = LEADERBOARD.slice(0, 3);
  const others = LEADERBOARD.slice(3);

  const toggleClaimBounty = (id) => {
    if (claimedBounties.includes(id)) {
      setClaimedBounties(claimedBounties.filter(bId => bId !== id));
    } else {
      setClaimedBounties([...claimedBounties, id]);
    }
  };

  const filteredBounties = BOUNTIES.filter(b => {
    if (bountyFilter === 'All') return true;
    return b.difficulty === bountyFilter;
  });

  return (
    <div className="fade-in" style={{ padding: '40px 48px', width: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="fade-up d1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Leaderboard & Achievements</h1>
          <p style={{ color: 'var(--text-2)' }}>Compete with top builders, earn badges, and conquer campus streaks.</p>
        </div>
        <div className="card highlight-box" style={{ display: 'flex', gap: '24px', padding: '16px 28px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Rank</div>
            <div className="stat-number">#7</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }}></div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total XP</div>
            <div className="stat-number">{CURRENT_USER.xp}</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }}></div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Streak</div>
            <div className="stat-number" style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              14 <Flame size={20} fill="#f59e0b" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="fade-up d2" style={{ display: 'flex', gap: '12px', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('rank')}
          className={`btn ${activeTab === 'rank' ? 'btn-violet' : 'btn-ghost'}`}
        >
          <Trophy size={16} /> Global Rank
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`btn ${activeTab === 'badges' ? 'btn-violet' : 'btn-ghost'}`}
        >
          <Award size={16} /> My Badges
        </button>
        <button
          onClick={() => setActiveTab('streaks')}
          className={`btn ${activeTab === 'streaks' ? 'btn-violet' : 'btn-ghost'}`}
        >
          <Flame size={16} /> Streaks & Daily
        </button>
        <button
          onClick={() => setActiveTab('bounties')}
          className={`btn ${activeTab === 'bounties' ? 'btn-violet' : 'btn-ghost'}`}
        >
          <Zap size={16} /> Bounty Board
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'rank' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Podium */}
          <div className="fade-up d3" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '20px', alignItems: 'end', maxWidth: '800px', margin: '0 auto', width: '100%', minHeight: '260px' }}>
            {/* 2nd Place */}
            {topThree[1] && (
              <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', textAlign: 'center', height: '220px', borderBottomWidth: '4px' }}>
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #e5e7eb, #9ca3af)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800', color: '#1f2937' }}>
                    {topThree[1].avatar}
                  </div>
                  <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: '#9ca3af', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: '#111' }}>2</div>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{topThree[1].name}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '12px' }}>{topThree[1].college}</p>
                <div className="badge badge-cyan">{topThree[1].xp} XP</div>
              </div>
            )}

            {/* 1st Place */}
            {topThree[0] && (
              <div className="card highlight-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', textAlign: 'center', height: '260px', borderBottomWidth: '6px' }}>
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #fcd34d, #d4af37)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: '800', color: '#1f2937', boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}>
                    {topThree[0].avatar}
                  </div>
                  <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: '#d4af37', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900', color: '#111' }}>1</div>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px', color: 'var(--violet-light)' }}>{topThree[0].name}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', marginBottom: '16px' }}>{topThree[0].college}</p>
                <div className="badge badge-violet" style={{ fontSize: '11px', padding: '6px 14px' }}>{topThree[0].xp} XP</div>
              </div>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', textAlign: 'center', height: '200px', borderBottomWidth: '4px' }}>
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #ca8a04, #78350f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: '#fef3c7' }}>
                    {topThree[2].avatar}
                  </div>
                  <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: '#b45309', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', color: '#fff' }}>3</div>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{topThree[2].name}</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-3)', marginBottom: '12px' }}>{topThree[2].college}</p>
                <div className="badge badge-amber">{topThree[2].xp} XP</div>
              </div>
            )}
          </div>

          {/* Leaderboard List */}
          <div className="card fade-up d4" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>Rankings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {others.map((item) => {
                const isCurrentUser = item.name === CURRENT_USER.name;
                return (
                  <div
                    key={item.rank}
                    className={`card ${isCurrentUser ? 'highlight-box' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px 24px',
                      justifyContent: 'space-between',
                      borderRadius: 'var(--radius-md)',
                      transition: '0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ fontWidth: '800', fontSize: '16px', color: isCurrentUser ? 'var(--violet)' : 'var(--text-3)', width: '30px' }}>
                        #{item.rank}
                      </div>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'var(--violet)' }}>
                        {item.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '15px' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>{item.college}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div className="badge badge-cyan">{item.badges} Badges</div>
                        <div className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <Flame size={10} fill="currentColor" /> {item.streak}d
                        </div>
                      </div>
                      <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--violet)', width: '90px', textAlign: 'right' }}>
                        {item.xp} XP
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {/* Earned */}
          <div className="fade-up d3">
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Earned Achievements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {CURRENT_USER.badges.map((badge, idx) => {
                const parts = badge.split(' ');
                const emoji = parts[0];
                const title = parts.slice(1).join(' ');

                return (
                  <div key={idx} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ fontSize: '42px', marginBottom: '16px' }}>{emoji}</div>
                    <h4 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px' }}>{title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Earned for outstanding contributions & engagement.</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Locked */}
          <div className="fade-up d4">
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Locked Badges</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', opacity: 0.6 }}>
              <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '42px', marginBottom: '16px', filter: 'grayscale(100%)' }}>👑</div>
                <h4 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px' }}>Campus King</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '12px' }}>Reach Rank #1 on your campus.</p>
                <div className="progress-track" style={{ width: '100%' }}>
                  <div className="progress-fill progress-violet" style={{ width: '40%' }}></div>
                </div>
                <div style={{ fontSize: '10px', marginTop: '6px', color: 'var(--text-3)' }}>40% completed</div>
              </div>
              <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '42px', marginBottom: '16px', filter: 'grayscale(100%)' }}>🦄</div>
                <h4 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px' }}>First Funding</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '12px' }}>Validate startup idea with 300+ community votes.</p>
                <div className="progress-track" style={{ width: '100%' }}>
                  <div className="progress-fill progress-violet" style={{ width: '65%' }}></div>
                </div>
                <div style={{ fontSize: '10px', marginTop: '6px', color: 'var(--text-3)' }}>198 / 300 Votes</div>
              </div>
              <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '42px', marginBottom: '16px', filter: 'grayscale(100%)' }}>🎓</div>
                <h4 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px' }}>Alumni Master</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '12px' }}>Conduct 5 sessions with alumni mentors.</p>
                <div className="progress-track" style={{ width: '100%' }}>
                  <div className="progress-fill progress-violet" style={{ width: '20%' }}></div>
                </div>
                <div style={{ fontSize: '10px', marginTop: '6px', color: 'var(--text-3)' }}>1 / 5 Sessions</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'streaks' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
          {/* Calendar & metrics */}
          <div className="card fade-up d3" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '72px' }}>🔥</div>
              <div>
                <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#f59e0b', lineHeight: '1.1' }}>14-Day Streak</h2>
                <p style={{ color: 'var(--text-2)', fontSize: '14px', marginTop: '4px' }}>Keep building daily to retain your rank & boost matching accuracy.</p>
              </div>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>May 2026</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', maxWidth: '360px' }}>
              {Array.from({ length: 30 }).map((_, idx) => {
                const day = idx + 1;
                const isStreaked = day >= 10 && day <= 24;
                const isToday = day === 24;

                return (
                  <div
                    key={idx}
                    style={{
                      height: '42px',
                      borderRadius: '8px',
                      border: isToday ? '2px solid #f59e0b' : '1px solid var(--border)',
                      background: isStreaked ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.02)',
                      color: isStreaked ? '#fcd34d' : 'var(--text-3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: isStreaked ? '800' : '400',
                      fontSize: '13px',
                      position: 'relative'
                    }}
                  >
                    {day}
                    {isStreaked && (
                      <span style={{ position: 'absolute', top: '2px', right: '2px', width: '4px', height: '4px', borderRadius: '50%', background: '#f59e0b' }}></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily challenges */}
          <div className="card highlight-box fade-up d4" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px', color: 'var(--violet-light)' }}>Daily Streak Challenges</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                onClick={() => setStreakChecks({ ...streakChecks, code: !streakChecks.code })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  border: '2px solid var(--violet)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: streakChecks.code ? 'var(--violet)' : 'transparent',
                  color: '#000'
                }}>
                  {streakChecks.code && <Check size={16} strokeWidth={3} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', textDecoration: streakChecks.code ? 'line-through' : 'none', color: streakChecks.code ? 'var(--text-3)' : 'var(--text)' }}>
                    Git Sync & Commit Activity
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '2px' }}>Sync repositories to update contribution map</div>
                </div>
                <div className="badge badge-violet">+50 XP</div>
              </div>

              <div
                onClick={() => setStreakChecks({ ...streakChecks, pr: !streakChecks.pr })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  border: '2px solid var(--violet)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: streakChecks.pr ? 'var(--violet)' : 'transparent',
                  color: '#000'
                }}>
                  {streakChecks.pr && <Check size={16} strokeWidth={3} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', textDecoration: streakChecks.pr ? 'line-through' : 'none', color: streakChecks.pr ? 'var(--text-3)' : 'var(--text)' }}>
                    Review 1 Peer Project
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '2px' }}>Provide structured code feedback in co-working</div>
                </div>
                <div className="badge badge-violet">+80 XP</div>
              </div>

              <div
                onClick={() => setStreakChecks({ ...streakChecks, upvote: !streakChecks.upvote })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  border: '2px solid var(--violet)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: streakChecks.upvote ? 'var(--violet)' : 'transparent',
                  color: '#000'
                }}>
                  {streakChecks.upvote && <Check size={16} strokeWidth={3} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '14px', textDecoration: streakChecks.upvote ? 'line-through' : 'none', color: streakChecks.upvote ? 'var(--text-3)' : 'var(--text)' }}>
                    Upvote & Validate 2 Startup Ideas
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '2px' }}>Participate in the community innovation validation panel</div>
                </div>
                <div className="badge badge-violet">+40 XP</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bounties' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Header filter */}
          <div className="card fade-up d3" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setBountyFilter(diff)}
                  className={`btn btn-sm ${bountyFilter === diff ? 'btn-violet' : 'btn-ghost'}`}
                >
                  {diff}
                </button>
              ))}
            </div>
            <button className="btn btn-sm btn-outline-violet">
              <Plus size={14} /> Post a micro-task bounty
            </button>
          </div>

          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredBounties.map((bounty, idx) => {
              const isClaimed = claimedBounties.includes(bounty.id);
              return (
                <div
                  key={bounty.id}
                  className="card fade-up"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    animationDelay: `${0.1 * (idx + 1)}s`
                  }}
                >
                  <div style={{ flex: 1, marginRight: '32px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                      <div className={`badge ${
                        bounty.difficulty === 'Easy' ? 'badge-green' :
                        bounty.difficulty === 'Medium' ? 'badge-cyan' : 'badge-red'
                      }`}>
                        {bounty.difficulty}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> Deadline: {bounty.deadline}
                      </div>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: 'var(--text)' }}>{bounty.title}</h3>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {bounty.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-3)', textTransform: 'uppercase' }}>Bounty Award</div>
                      <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--violet)' }}>+{bounty.xp} XP</div>
                    </div>
                    <button
                      onClick={() => toggleClaimBounty(bounty.id)}
                      className={`btn ${isClaimed ? 'btn-green' : 'btn-violet'}`}
                      style={{ minWidth: '130px' }}
                    >
                      {isClaimed ? (
                        <>
                          <Check size={14} /> Completed
                        </>
                      ) : (
                        'Claim Bounty'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
