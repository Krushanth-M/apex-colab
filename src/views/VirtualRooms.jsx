import { useState, useEffect } from 'react';
import { Video, Clock, Users, Play, Pause, RotateCw, Volume2, Award, CheckCircle, ChevronRight } from 'lucide-react';
import { VIRTUAL_ROOMS } from '../mockData';

export default function VirtualRooms() {
  const [activeRoom, setActiveRoom] = useState(VIRTUAL_ROOMS[0]);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(2);
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  // Review System State
  const [prUrl, setPrUrl] = useState('');
  const [prComment, setPrComment] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, author: 'Priya Narang', link: 'github.com/aryanmehta/mindmap-ai/pull/4', comment: 'Loved the AI path scoring logic! Just verify the responsive container wrapper padding.', type: 'Design' },
    { id: 2, author: 'Rahul Sen', link: 'github.com/aryanmehta/mindmap-ai/pull/2', comment: 'Added some SQL index recommendations for the startup telemetry tables to speed up upvotes query.', type: 'Code' }
  ]);

  useEffect(() => {
    let timer = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      setPomodoroCount(c => c + 1);
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(25 * 60);
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    if (!prUrl || !prComment) return;
    const newReview = {
      id: Date.now(),
      author: 'Aryan Mehta',
      link: prUrl,
      comment: prComment,
      type: 'Code'
    };
    setReviews([newReview, ...reviews]);
    setPrUrl('');
    setPrComment('');
    setShowReviewSuccess(true);
    setTimeout(() => {
      setShowReviewSuccess(false);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fade-in" style={{ padding: '40px 48px', width: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="fade-up d1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Virtual Co-Working & Reviews</h1>
          <p style={{ color: 'var(--text-2)' }}>Join Pomodoro-based focus rooms and participate in Peer Code & Design Reviews.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-violet" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Users size={12} /> 128 Active Students Online
          </span>
        </div>
      </div>

      {showReviewSuccess && (
        <div className="toast toast-success" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
          <CheckCircle size={20} style={{ color: '#10b981' }} />
          <div>
            <div style={{ fontWeight: '700' }}>Review Submitted!</div>
            <div style={{ fontSize: '12px' }}>Your review request has been logged on the peer validation panel. +30 XP</div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
        
        {/* Left Column: Pomodoro & Focus Space */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Pomodoro Timer widget */}
          <div className="card highlight-box fade-up d2" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '24px' }}>
              <div style={{ textAlign: 'left' }}>
                <span className="badge badge-violet" style={{ marginBottom: '4px' }}>Focus Session</span>
                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{activeRoom.name} {activeRoom.theme}</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>Interval Completed</span>
                <div style={{ fontWeight: '800', color: 'var(--violet)' }}>{pomodoroCount} Rounds</div>
              </div>
            </div>

            {/* Pomodoro Circle Ring */}
            <div className="pomodoro-ring" style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              border: '6px solid rgba(212, 175, 55, 0.15)',
              borderTopColor: 'var(--violet)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontFamily: 'Space Grotesk',
              fontWeight: '900',
              color: 'var(--text)',
              marginBottom: '28px',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.1)',
              position: 'relative'
            }}>
              {formatTime(timeLeft)}
              {isTimerRunning && (
                <div style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '50%',
                  border: '6px solid transparent',
                  borderTopColor: 'var(--violet-light)',
                  animation: 'spin 4s linear infinite'
                }}></div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
              <button onClick={toggleTimer} className="btn btn-violet" style={{ minWidth: '120px' }}>
                {isTimerRunning ? (
                  <>
                    <Pause size={14} /> Pause
                  </>
                ) : (
                  <>
                    <Play size={14} /> Focus Now
                  </>
                )}
              </button>
              <button onClick={resetTimer} className="btn btn-ghost">
                <RotateCw size={14} /> Reset
              </button>
              <button className="btn btn-ghost" title="Lofi background music">
                <Volume2 size={14} /> Ambient Sound
              </button>
            </div>
          </div>

          {/* Active Co-working Rooms List */}
          <div className="card fade-up d3" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Active Focus Rooms</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {VIRTUAL_ROOMS.map((room) => {
                const isCurrent = room.id === activeRoom.id;
                return (
                  <div
                    key={room.id}
                    onClick={() => {
                      setActiveRoom(room);
                      resetTimer();
                    }}
                    className={`card ${isCurrent ? 'highlight-box' : ''}`}
                    style={{
                      padding: '16px 20px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontWeight: '800', fontSize: '15px' }}>
                        {room.theme} {room.name}
                      </h4>
                      <span className={`dot ${room.active ? 'dot-green' : 'dot-red'}`}></span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>
                      Mode: {room.mode}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '11px', color: 'var(--text-2)' }}>
                      <span>{room.members.length} / {room.capacity} Joined</span>
                      <span style={{ color: 'var(--violet)' }}>Timer: {room.timer}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Peer Reviews & Async Feedback loops */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Code review submission form */}
          <div className="card highlight-box fade-up d4" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: 'var(--violet-light)' }}>
              Async Peer Code & Design Review
            </h3>
            <p style={{ color: 'var(--text-2)', fontSize: '12px', marginBottom: '20px' }}>
              Post a repository branch, UI mockup, or Figma file link to receive verified credits & optimization ideas from peers.
            </p>

            <form onSubmit={handleCreateReview} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-3)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Project/PR Link
                </label>
                <input
                  type="text"
                  placeholder="github.com/your-username/project/pull/1"
                  value={prUrl}
                  onChange={(e) => setPrUrl(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-3)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Review request context & questions
                </label>
                <textarea
                  placeholder="Please review my AI feasibility scorer algorithm or UI styling layout alignment..."
                  value={prComment}
                  onChange={(e) => setPrComment(e.target.value)}
                  className="input"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-violet" style={{ width: '100%' }}>
                Request Peer Review (+30 XP)
              </button>
            </form>
          </div>

          {/* Active Peer Reviews List */}
          <div className="card fade-up d5" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Recent Review Feedback</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {reviews.map((rev) => (
                <div key={rev.id} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: 'var(--violet)' }}>
                        {rev.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '700' }}>{rev.author}</div>
                        <a href={`https://${rev.link}`} target="_blank" rel="noreferrer" style={{ fontSize: '10px', color: 'var(--text-3)', textDecoration: 'none' }}>
                          {rev.link}
                        </a>
                      </div>
                    </div>
                    <span className={`badge ${rev.type === 'Design' ? 'badge-cyan' : 'badge-violet'}`}>
                      {rev.type || 'Code'}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.4' }}>
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
