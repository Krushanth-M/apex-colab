import { useState } from 'react';
import { GraduationCap, Calendar, Star, Clock, Users, CheckCircle, MessageSquare, Video, ChevronRight, Briefcase, Search, Sparkles } from 'lucide-react';
import { MENTORS, CURRENT_USER } from '../mockData';

export default function MentorConnect() {
  const [activeTab, setActiveTab] = useState('find');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  const [bookedSessions, setBookedSessions] = useState([
    { id: 101, mentorName: 'Dr. Anand Kumar', role: 'Prof. of CS', org: 'IIT Bombay', topic: 'AI/ML Project Feasibility', date: 'Mon 26th May', time: '4:00 PM', mode: 'Video Room' }
  ]);
  const [showBookingConfirm, setShowBookingConfirm] = useState(null);

  const ALUMNI = [
    { name: 'Rahul Sen', company: 'Google', role: 'Senior SDE', gradYear: '2022', college: 'IIT Bombay', avatar: 'RS', expertise: 'FAANG Interviews & Algorithms' },
    { name: 'Priya Narang', company: 'Microsoft', role: 'UX Designer', gradYear: '2023', college: 'IIT Delhi', avatar: 'PN', expertise: 'Startup MVP & Visual Design' },
    { name: 'Aditya Hegde', company: 'Zepto', role: 'Technical Lead', gradYear: '2021', college: 'BITS Pilani', avatar: 'AH', expertise: 'Scaling backend from 0 to 1' },
    { name: 'Nisha Pillai', company: 'Razorpay', role: 'Product Manager', gradYear: '2022', college: 'NIT Trichy', avatar: 'NP', expertise: 'FinTech products & GTM' },
    { name: 'Vikram Mehta', company: 'Aether Labs', role: 'AI Founder', gradYear: '2020', college: 'IIT Madras', avatar: 'VM', expertise: 'SaaS Fundraising & Incubators' },
    { name: 'Kavita Das', company: 'McKinsey', role: 'Associate Partner', gradYear: '2019', college: 'IIT Bombay', avatar: 'KD', expertise: 'Market Entry & Pitch Deck Design' }
  ];

  const handleBookSlot = (mentor, slot) => {
    const newSession = {
      id: Date.now(),
      mentorName: mentor.name,
      role: mentor.role,
      org: mentor.org,
      topic: 'AI Matching consultation & Mentorship',
      date: 'Next Available Date',
      time: slot,
      mode: 'Video Room'
    };
    setBookedSessions([newSession, ...bookedSessions]);
    setShowBookingConfirm(mentor.name);
    setTimeout(() => {
      setShowBookingConfirm(null);
    }, 3000);
  };

  const filteredMentors = MENTORS.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          mentor.org.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExpertise = selectedExpertise === 'All' || mentor.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  const topMentor = MENTORS[0]; // Anand Kumar

  return (
    <div className="fade-in" style={{ padding: '40px 48px', width: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="fade-up d1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Mentor Connect & Alumni Network</h1>
          <p style={{ color: 'var(--text-2)' }}>Schedule 1:1 sessions with verified faculty and industry alumni mentors.</p>
        </div>
        <div className="card highlight-box" style={{ display: 'flex', gap: '24px', padding: '16px 28px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Bookings</div>
            <div className="stat-number">{bookedSessions.length}</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }}></div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Rating</div>
            <div className="stat-number" style={{ color: 'var(--violet)' }}>4.9 ★</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }}></div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Match Rate</div>
            <div className="stat-number" style={{ color: '#10b981' }}>94%</div>
          </div>
        </div>
      </div>

      {/* Booking Toast */}
      {showBookingConfirm && (
        <div className="toast toast-success" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
          <CheckCircle size={20} style={{ color: '#10b981' }} />
          <div>
            <div style={{ fontWeight: '700' }}>Session Scheduled!</div>
            <div style={{ fontSize: '12px' }}>Your booking with {showBookingConfirm} has been confirmed. Check calendar.</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="fade-up d2" style={{ display: 'flex', gap: '12px', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('find')}
          className={`btn ${activeTab === 'find' ? 'btn-violet' : 'btn-ghost'}`}
        >
          <GraduationCap size={16} /> Find Mentors
        </button>
        <button
          onClick={() => setActiveTab('sessions')}
          className={`btn ${activeTab === 'sessions' ? 'btn-violet' : 'btn-ghost'}`}
        >
          <Calendar size={16} /> My Scheduled Sessions
        </button>
        <button
          onClick={() => setActiveTab('alumni')}
          className={`btn ${activeTab === 'alumni' ? 'btn-violet' : 'btn-ghost'}`}
        >
          <Users size={16} /> Alumni Directory
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'find' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* AI matched banner */}
          <div className="card highlight-box fade-up d3" style={{ padding: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--violet)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '900' }}>
                <Sparkles size={32} />
              </div>
              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="badge badge-violet" style={{ fontSize: '9px' }}>AI Recommended Match</span>
                  <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>94% Teammate/Project Synergy</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--violet-light)' }}>{topMentor.name}</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '13px', marginTop: '2px' }}>
                  Expertise in <strong style={{ color: 'var(--violet)' }}>AI Research & NLP</strong>. Perfect for MindMap AI.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {topMentor.slots.slice(0, 2).map((slot, sIdx) => (
                <button key={sIdx} onClick={() => handleBookSlot(topMentor, slot)} className="btn btn-sm btn-violet">
                  Book {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Row */}
          <div className="card fade-up d4" style={{ padding: '16px 24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-3)' }} />
              <input
                type="text"
                placeholder="Search mentors by name, company, expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ paddingLeft: '44px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'AI', 'ML', 'Product', 'UX', 'Funding'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedExpertise(tag)}
                  className={`btn btn-sm ${selectedExpertise === tag ? 'btn-violet' : 'btn-ghost'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Mentors Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
            {filteredMentors.map((mentor, idx) => (
              <div
                key={mentor.id}
                className="card float-mentor fade-up"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  animationDelay: `${0.05 * (idx + 1)}s`
                }}
              >
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '800', color: 'var(--violet)' }}>
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{mentor.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>{mentor.role} at {mentor.org}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '12px', color: 'var(--violet)' }}>
                      <Star size={12} fill="currentColor" /> {mentor.rating} · {mentor.sessions} Sessions completed
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {mentor.expertise.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>Available Slots:</span>
                    <span className={`badge ${mentor.available ? 'badge-green' : 'badge-red'}`}>
                      {mentor.available ? 'Active Slots' : 'Unavailable'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {mentor.slots.length > 0 ? (
                      mentor.slots.map((slot, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleBookSlot(mentor, slot)}
                          className="btn btn-sm btn-ghost"
                          style={{ flex: 1 }}
                        >
                          {slot}
                        </button>
                      ))
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-3)', fontStyle: 'italic' }}>No active slots available this week.</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div className="card fade-up d3" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Upcoming Bookings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {bookedSessions.map((session) => (
                <div key={session.id} className="card highlight-box" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212,175,55,0.2)', color: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: '700', fontSize: '15px' }}>{session.mentorName}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>{session.role} at {session.org}</p>
                      <p style={{ fontSize: '12px', color: 'var(--violet)', marginTop: '4px', fontWeight: '600' }}>Topic: {session.topic}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '13px', fontWeight: '700' }}>{session.date}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-3)' }}><Clock size={10} style={{ display: 'inline', marginRight: '3px' }} />{session.time}</div>
                    </div>
                    <button className="btn btn-sm btn-violet" style={{ display: 'flex', gap: '4px' }}>
                      <Video size={12} /> Launch Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card fade-up d4" style={{ padding: '24px', opacity: 0.65 }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Past Completed Sessions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '14px' }}>Rahul Bose</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>Engineering scaling & microservices overview</p>
                </div>
                <div style={{ display: 'flex', gap: '2px', color: 'var(--violet)' }}>
                  <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                </div>
              </div>
              <div className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '14px' }}>Nisha Verma</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>Swiggy product strategy teardown</p>
                </div>
                <div style={{ display: 'flex', gap: '2px', color: 'var(--violet)' }}>
                  <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'alumni' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div className="card highlight-box fade-up d3" style={{ padding: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Users size={32} style={{ color: 'var(--violet)' }} />
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Alumni Referral & Matching Engine</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '13px', marginTop: '2px' }}>Request direct referrals at tech companies or schedule practice system design interviews.</p>
              </div>
            </div>
            <button className="btn btn-violet">Request Practice Interview</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {ALUMNI.map((alum, idx) => (
              <div key={idx} className="card fade-up" style={{ padding: '24px', display: 'flex', flexDirection: 'column', animationDelay: `${idx * 0.05}s` }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: 'var(--violet)' }}>
                    {alum.avatar}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '700', fontSize: '15px' }}>{alum.name}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>{alum.role} @ <strong style={{ color: 'var(--violet)' }}>{alum.company}</strong></p>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-2)', marginBottom: '12px' }}>
                  <strong>Grad Year:</strong> {alum.gradYear} ({alum.college})
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-3)', fontStyle: 'italic', marginBottom: '16px' }}>
                  "Specialized in {alum.expertise}"
                </p>
                <div style={{ display: 'flex', gap: '6px', marginTop: 'auto' }}>
                  <button className="btn btn-sm btn-violet" style={{ flex: 1 }}>Connect</button>
                  <button className="btn btn-sm btn-ghost" style={{ flex: 1 }}>Message</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
