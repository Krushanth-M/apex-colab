import { useState, useRef, useEffect } from 'react';
import { Brain, Send, X, Sparkles } from 'lucide-react';
import { askGemini } from '../gemini';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am Apex AI — your startup co-pilot and innovation teammate. Ask me to generate a startup idea, score a pitch deck, find teammate roles, or predict project milestones!' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;

    const userQuery = inputText;
    const userMsg = { sender: 'user', text: userQuery };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    const apiKey = localStorage.getItem('apex-gemini-key');

    // Premium Local Fallback Responses
    const getLocalResponse = (query) => {
      const q = query.toLowerCase();
      if (q.includes('idea') || q.includes('generate')) {
        return "💡 **AI Idea Pitch**: *EduTrack* — an offline-first learning system for remote rural areas utilizing lightweight WebAssembly hubs. Estimated Feasibility Score: **89/100**. Perfect role match: AI dev, UX designer.";
      } else if (q.includes('team') || q.includes('developer') || q.includes('designer') || q.includes('college')) {
        return "🤝 **Teammate Match Recommended**: I found **Priya Narang** (NIT Trichy, 94% match) who is a Designer, and **Rohan Gupta** (IIT Delhi, 89% match) who is a Developer. You can invite them on the Team Builder page!";
      } else if (q.includes('predict') || q.includes('deadline') || q.includes('time')) {
        return "⏳ **Smart Deadline Predictor**: Based on average student project velocity and team size (3), your MVP will take approximately **5 weeks** (Confidence level: 88%). High risk factor detected: Firebase concurrency integration.";
      } else if (q.includes('score') || q.includes('feasibility') || q.includes('startup')) {
        return "📊 **Project Feasibility Score**: MindMap AI matches **87/100** based on current EdTech market growth trends (+18% YoY) and active competitor density. Recommended next step: Milestone Stage 4 (Beta Launch).";
      } else if (q.includes('mentor') || q.includes('connect')) {
        return "🎓 **Smart Mentor Matching**: I recommend scheduling a session with **Dr. Anand Kumar** (IIT Bombay). He specializes in AI and NLP, which perfectly matches your MindMap AI project stack.";
      } else if (q.includes('sentiment') || q.includes('burnout')) {
        return "🧠 **Team Sentiment Analysis**: Platform contribution indexes show healthy collaboration with low burnout risk (92% positive sentiment, 12% stress markers). Keep checking co-working streaks!";
      }
      return "I've cross-referenced our decentralized academic database. What startup validation metrics, skill development pipelines, or team dynamics can I analyze for you next?";
    };

    if (apiKey && apiKey.trim()) {
      try {
        const reply = await askGemini(userQuery, apiKey);
        setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      } catch (err) {
        console.error("Gemini Query Failed: ", err);
        const fallback = getLocalResponse(userQuery);
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `⚠️ **Gemini API Error**: ${err.message || 'Server error'}.\n\n*Falling back to offline sandbox co-pilot mode:*\n\n${fallback}`
          }
        ]);
      } finally {
        setIsThinking(false);
      }
    } else {
      // Simulate network lag and respond with premium local data
      setTimeout(() => {
        const fallback = getLocalResponse(userQuery);
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `💡 *Co-pilot Sandbox active. Hook up a real Google Gemini Key in the **Profile -> Settings** card for live custom responses.*\n\n${fallback}`
          }
        ]);
        setIsThinking(false);
      }, 900);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 9999 }}>
      {isOpen ? (
        <div className="card highlight-box" style={{
          width: '360px',
          height: '480px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,0,0,0.85), 0 0 35px rgba(212,175,55,0.2)',
          borderRadius: 'var(--radius-lg)'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'rgba(212, 175, 55, 0.08)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f3e5ab 0%, #d4af37 100%)',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(212,175,55,0.3)'
              }}>
                <Brain size={18} />
              </div>
              <div>
                <h4 style={{ fontWeight: '800', fontSize: '14px', color: '#d4af37' }}>Apex AI</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#10b981' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span> Active
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages list */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, index) => {
              // Very simple parser to translate common markdown formats like **bold** and *italic*
              const formatText = (txt) => {
                if (typeof txt !== 'string') return txt;
                let formatted = txt
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/`(.*?)`/g, '<code style="background: rgba(255,255,255,0.08); padding: 2px 4px; border-radius: 4px;">$1</code>');
                return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
              };

              return (
                <div
                  key={index}
                  className={msg.sender === 'user' ? 'ai-bubble-user' : 'ai-bubble-bot'}
                  style={{
                    whiteSpace: 'pre-wrap',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%'
                  }}
                >
                  {formatText(msg.text)}
                </div>
              );
            })}
            
            {/* Thinking indicator bubble */}
            {isThinking && (
              <div className="ai-bubble-bot" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px', padding: '12px 16px' }}>
                <span className="dot dot-amber" style={{ width: 6, height: 6, animation: 'pulse-glow 1s infinite alternate' }} />
                <span className="dot dot-amber" style={{ width: 6, height: 6, animation: 'pulse-glow 1s infinite alternate 0.2s' }} />
                <span className="dot dot-amber" style={{ width: 6, height: 6, animation: 'pulse-glow 1s infinite alternate 0.4s' }} />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSendMessage} style={{
            padding: '14px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              placeholder={isThinking ? "Apex AI is thinking..." : "Ask Apex AI co-pilot..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="input"
              style={{ padding: '8px 12px', fontSize: '13px' }}
              disabled={isThinking}
            />
            <button type="submit" className="btn btn-violet" style={{ padding: '8px 14px', background: 'linear-gradient(135deg, #d4af37, #aa7c11)', color: '#000' }} disabled={isThinking || !inputText.trim()}>
              <Send size={14} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-violet"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #d4af37, #aa7c11)',
            color: '#000',
            boxShadow: '0 12px 30px rgba(212,175,55,0.4), 0 0 20px rgba(212,175,55,0.2)',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Brain size={24} />
        </button>
      )}
    </div>
  );
}
