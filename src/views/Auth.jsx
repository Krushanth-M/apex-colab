import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mail,
  Lock,
  User,
  Building2,
  ChevronRight,
  Sparkles,
  Camera,
  RefreshCw,
  Key,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  Zap,
  TrendingUp,
  X,
  ArrowLeft,
} from 'lucide-react';
import { supabase } from '../supabase';

/* ─────────────────────────────────────────────────────────
   Audio helpers
───────────────────────────────────────────────────────── */
function playTone(ctx, frequency, startTime, duration, type = 'sine', gain = 0.08) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.03);
  gainNode.gain.setValueAtTime(gain, startTime + duration - 0.05);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playSuccessChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    playTone(ctx, 523.25, now,        0.15, 'sine', 0.07);
    playTone(ctx, 659.25, now + 0.10, 0.15, 'sine', 0.07);
    playTone(ctx, 783.99, now + 0.20, 0.30, 'sine', 0.07);
  } catch (_) {}
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    playTone(ctx, 880, now, 0.04, 'sine', 0.03);
  } catch (_) {}
}

/* ─────────────────────────────────────────────────────────
   Apex Logo — Enhanced gold hexagonal mark
───────────────────────────────────────────────────────── */
function ApexLogo({ size = 64 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      {/* Hexagonal badge */}
      <div style={{ position: 'relative', width: size, height: size }}>
        {/* Outer glow ring */}
        <div style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
          animation: 'pulseGlow 3s ease-in-out infinite',
        }} />
        {/* Hexagon shape */}
        <div style={{
          width: size,
          height: size,
          clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
          background: 'linear-gradient(145deg, #fef9e7 0%, #f3e5ab 25%, #d4af37 60%, #8c6a0a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(212,175,55,0.4)',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Inner shadow hex */}
          <div style={{
            width: '78%',
            height: '78%',
            clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.25) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: size * 0.42,
              fontWeight: 900,
              color: '#0a0800',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              textShadow: '0 1px 2px rgba(255,255,255,0.3)',
            }}>A</span>
          </div>
        </div>
      </div>

      {/* Brand text */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Outfit', 'Space Grotesk', sans-serif",
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: '-0.04em',
          background: 'linear-gradient(135deg, #ffffff 0%, #f3e5ab 40%, #d4af37 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}>
          APEX COLAB
        </div>
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.22em',
          color: 'rgba(212,175,55,0.55)',
          textTransform: 'uppercase',
          marginTop: 5,
        }}>
          Student Innovation Platform
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Portal Chooser — Maker / Investor cards
───────────────────────────────────────────────────────── */
function PortalChooser({ value, onChange }) {
  const portals = [
    {
      id: 'maker',
      emoji: '🚀',
      label: 'Maker',
      desc: 'Build & collaborate',
      color: '#d4af37',
    },
    {
      id: 'investor',
      emoji: '💼',
      label: 'Investor',
      desc: 'Discover & fund',
      color: '#10b981',
    },
  ];

  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{
        fontSize: 10.5,
        fontWeight: 800,
        letterSpacing: '0.14em',
        color: 'rgba(148,163,184,0.5)',
        textTransform: 'uppercase',
        marginBottom: 10,
      }}>
        Choose Portal
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        {portals.map((p) => {
          const active = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange(p.id)}
              style={{
                flex: 1,
                padding: '14px 12px',
                borderRadius: 14,
                border: active
                  ? `2px solid ${p.color}55`
                  : '2px solid rgba(255,255,255,0.06)',
                background: active
                  ? `linear-gradient(135deg, ${p.color}14 0%, ${p.color}06 100%)`
                  : 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: active ? `0 0 20px ${p.color}22` : 'none',
                outline: 'none',
              }}
            >
              <span style={{ fontSize: 24, lineHeight: 1 }}>{p.emoji}</span>
              <div>
                <div style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: active ? p.color : 'rgba(148,163,184,0.65)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '-0.01em',
                }}>{p.label}</div>
                <div style={{
                  fontSize: 10,
                  color: active ? `${p.color}99` : 'rgba(148,163,184,0.35)',
                  marginTop: 1,
                }}>{p.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Auth Tab Bar
───────────────────────────────────────────────────────── */
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'signin',   label: 'Sign In'       },
    { id: 'register', label: 'Create Account' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: 4,
      padding: 4,
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12,
      marginBottom: 24,
    }}>
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          style={{
            flex: 1,
            padding: '9px 14px',
            fontSize: 13,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: active === id ? 700 : 500,
            borderRadius: 9,
            cursor: 'pointer',
            border: 'none',
            background: active === id
              ? 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(170,124,17,0.1))'
              : 'transparent',
            color: active === id ? '#f3e5ab' : 'rgba(148,163,184,0.5)',
            boxShadow: active === id ? 'inset 0 0 0 1px rgba(212,175,55,0.3)' : 'none',
            transition: 'all 0.2s ease',
            outline: 'none',
          }}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Field component
───────────────────────────────────────────────────────── */
function Field({ icon: Icon, label, id, type = 'text', value, onChange, placeholder, autoComplete, rightEl }) {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPwd ? 'text' : 'password') : type;

  return (
    <div style={{ marginBottom: 14, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label htmlFor={id} style={{
        fontSize: 11.5,
        fontWeight: 700,
        color: 'rgba(148,163,184,0.6)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        {label}
      </label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <span style={{
            position: 'absolute',
            left: 14,
            color: 'rgba(148,163,184,0.4)',
            display: 'flex',
            pointerEvents: 'none',
            zIndex: 1,
          }}>
            <Icon size={15} />
          </span>
        )}
        <input
          id={id}
          type={inputType}
          className="input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          style={{
            paddingLeft: Icon ? 42 : 14,
            paddingRight: isPassword ? 44 : 14,
            background: 'rgba(8,6,3,0.7)',
            border: '1px solid rgba(212,175,55,0.14)',
            borderRadius: 11,
            fontSize: 14,
            color: '#f6f4ef',
            height: 46,
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            style={{
              position: 'absolute',
              right: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(148,163,184,0.4)',
              display: 'flex',
              padding: 4,
            }}
          >
            {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
        {rightEl && (
          <div style={{ position: 'absolute', right: 12 }}>{rightEl}</div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Divider
───────────────────────────────────────────────────────── */
function Divider({ label = 'or continue with' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0', userSelect: 'none' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      <span style={{
        fontSize: 10.5,
        color: 'rgba(148,163,184,0.35)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Role Selector
───────────────────────────────────────────────────────── */
function RoleSelector({ value, onChange }) {
  const roles = ['Student', 'Organizer'];
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        fontSize: 11.5, fontWeight: 700, color: 'rgba(148,163,184,0.6)',
        letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6,
      }}>
        Account Role
      </label>
      <div style={{ display: 'flex', gap: 8 }}>
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 10,
              border: value === role
                ? '1.5px solid rgba(212,175,55,0.5)'
                : '1.5px solid rgba(255,255,255,0.07)',
              background: value === role
                ? 'rgba(212,175,55,0.12)'
                : 'rgba(255,255,255,0.02)',
              color: value === role ? '#f3e5ab' : 'rgba(148,163,184,0.5)',
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              outline: 'none',
            }}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FACE UNLOCK — Real Camera Access
───────────────────────────────────────────────────────── */
function FaceUnlock({ onLogin }) {
  const videoRef    = useRef(null);
  const streamRef   = useRef(null);
  const intervalRef = useRef(null);

  const [status,   setStatus]   = useState('idle');      // idle | requesting | live | scanning | matching | verifying | success | denied
  const [progress, setProgress] = useState(0);
  const [message,  setMessage]  = useState('Position your face within the frame');

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    clearInterval(intervalRef.current);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const startCamera = async () => {
    setStatus('requesting');
    setMessage('Requesting camera access...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus('live');
      setMessage('Camera active — click Scan to begin');
    } catch (err) {
      console.warn('[Camera] Access denied or unavailable:', err.message);
      setStatus('denied');
      setMessage('Camera access denied. Please allow camera permission and retry.');
    }
  };

  const startScan = () => {
    if (status !== 'live') return;
    setStatus('scanning');
    setProgress(0);
    setMessage('Detecting facial contours...');
    playBeep();

    let step = 0;
    intervalRef.current = setInterval(() => {
      step += 1;
      setProgress(Math.min(100, step * 5));

      if (step === 6)  { setStatus('matching');   setMessage('Mapping biometric keypoints...'); playBeep(); }
      if (step === 13) { setStatus('verifying');  setMessage('Verifying identity signature...'); playBeep(); }
      if (step >= 20) {
        clearInterval(intervalRef.current);
        setStatus('success');
        setMessage('Biometric Access Granted!');
        playSuccessChime();
        setTimeout(() => { stopCamera(); onLogin(); }, 1400);
      }
    }, 160);
  };

  const reset = () => {
    stopCamera();
    setStatus('idle');
    setProgress(0);
    setMessage('Position your face within the frame');
  };

  const isScanning = ['scanning', 'matching', 'verifying'].includes(status);
  const borderColor = status === 'success' ? '#10b981' : isScanning ? '#d4af37' : status === 'denied' ? '#ef4444' : 'rgba(212,175,55,0.25)';
  const glowColor   = status === 'success' ? 'rgba(16,185,129,0.3)' : isScanning ? 'rgba(212,175,55,0.25)' : 'transparent';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      {/* Camera viewport */}
      <div style={{
        position: 'relative',
        width: 220,
        height: 220,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `2.5px solid ${borderColor}`,
        boxShadow: `0 0 0 6px ${glowColor}, 0 0 40px ${glowColor}`,
        transition: 'border-color 0.3s ease, box-shadow 0.4s ease',
        background: '#070504',
        flexShrink: 0,
      }}>
        {/* Live video stream */}
        <video
          ref={videoRef}
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: ['live', 'scanning', 'matching', 'verifying', 'success'].includes(status) ? 'block' : 'none',
            transform: 'scaleX(-1)', // mirror effect
            filter: status === 'success' ? 'hue-rotate(140deg) saturate(1.5)' : 'none',
            transition: 'filter 0.5s ease',
          }}
        />

        {/* Idle / Denied placeholder */}
        {!['live', 'scanning', 'matching', 'verifying', 'success', 'requesting'].includes(status) && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 8,
          }}>
            <Camera size={40} color={status === 'denied' ? '#ef4444' : 'rgba(212,175,55,0.3)'} />
            {status === 'denied' && (
              <span style={{ fontSize: 11, color: '#ef4444', textAlign: 'center', padding: '0 16px' }}>
                Access Denied
              </span>
            )}
          </div>
        )}

        {/* Requesting spinner */}
        {status === 'requesting' && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 36, height: 36,
              border: '2px solid rgba(212,175,55,0.2)',
              borderTop: '2px solid #d4af37',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
          </div>
        )}

        {/* Scanning overlay */}
        {isScanning && (
          <>
            {/* Scan line */}
            <div style={{
              position: 'absolute', left: 0, right: 0,
              height: 3,
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.9), transparent)',
              boxShadow: '0 0 12px #d4af37',
              animation: 'scan-line 2s linear infinite',
              zIndex: 3,
            }} />
            {/* Corner brackets */}
            {[
              { top: 12, left: 12 },
              { top: 12, right: 12 },
              { bottom: 12, left: 12 },
              { bottom: 12, right: 12 },
            ].map((pos, i) => (
              <div key={i} style={{
                position: 'absolute',
                ...pos,
                width: 22, height: 22,
                borderTop: i < 2 ? '2px solid #d4af37' : 'none',
                borderBottom: i >= 2 ? '2px solid #d4af37' : 'none',
                borderLeft: i % 2 === 0 ? '2px solid #d4af37' : 'none',
                borderRight: i % 2 === 1 ? '2px solid #d4af37' : 'none',
                animation: 'cornerPulse 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
                zIndex: 4,
              }} />
            ))}
            {/* Face grid overlay */}
            <svg style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              opacity: 0.5, zIndex: 2, pointerEvents: 'none',
            }}>
              <ellipse cx="50%" cy="45%" rx="30%" ry="36%" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="38%" cy="40%" r="3%" fill="none" stroke="rgba(16,185,129,0.6)" strokeWidth="1" />
              <circle cx="62%" cy="40%" r="3%" fill="none" stroke="rgba(16,185,129,0.6)" strokeWidth="1" />
              <path d="M40% 55% Q50% 62% 60% 55%" fill="none" stroke="rgba(16,185,129,0.6)" strokeWidth="1" />
            </svg>
          </>
        )}

        {/* Success overlay */}
        {status === 'success' && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(16,185,129,0.2)',
            zIndex: 5,
          }}>
            <CheckCircle2 size={60} color="#10b981" strokeWidth={1.5} />
          </div>
        )}

        {/* Spinning ring during scan */}
        {isScanning && (
          <div style={{
            position: 'absolute', inset: 4,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#d4af37',
            borderRightColor: 'rgba(212,175,55,0.3)',
            animation: 'spin 1.6s linear infinite',
            zIndex: 5,
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* Status message */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <span style={{
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "'Space Grotesk', sans-serif",
          color: status === 'success'
            ? '#10b981'
            : status === 'denied'
            ? '#ef4444'
            : isScanning
            ? '#f3e5ab'
            : 'rgba(148,163,184,0.6)',
          display: 'block',
          minHeight: 18,
          transition: 'color 0.3s',
        }}>
          {message}
        </span>

        {/* Progress bar */}
        {(isScanning || status === 'success') && (
          <div style={{
            width: '180px', height: 3,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 99, margin: '10px auto 0', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: status === 'success'
                ? '#10b981'
                : 'linear-gradient(90deg, #aa7c11, #d4af37, #f3e5ab)',
              borderRadius: 99,
              transition: 'width 0.16s ease',
              boxShadow: '0 0 8px rgba(212,175,55,0.5)',
            }} />
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10 }}>
        {status === 'idle' && (
          <button
            type="button"
            className="btn btn-violet"
            onClick={startCamera}
            style={{ borderRadius: 12, padding: '10px 24px', fontSize: 13 }}
          >
            <Camera size={15} />
            Enable Camera
          </button>
        )}

        {status === 'denied' && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={startCamera}
            style={{ borderRadius: 12, padding: '10px 24px', fontSize: 13 }}
          >
            <RefreshCw size={14} />
            Retry Camera
          </button>
        )}

        {status === 'live' && (
          <>
            <button
              type="button"
              className="btn btn-violet"
              onClick={startScan}
              style={{ borderRadius: 12, padding: '10px 24px', fontSize: 13 }}
            >
              <Shield size={14} />
              Begin Face Scan
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={reset}
              style={{ borderRadius: 12, padding: '10px', fontSize: 13 }}
            >
              <X size={14} />
            </button>
          </>
        )}

        {(isScanning) && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={reset}
            style={{ borderRadius: 12, padding: '8px 16px', fontSize: 12 }}
          >
            Cancel
          </button>
        )}

        {(status === 'success') && null}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Sign In Form
───────────────────────────────────────────────────────── */
function SignInForm({ onLogin, triggerOtp, portalMode, authType, setAuthType }) {
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    triggerOtp(email, () => onLogin({ email, mode: 'signin', role: portalMode }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Auth method toggle */}
      <div style={{
        display: 'flex', gap: 6, padding: 4,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: 11,
        marginBottom: 22,
        alignSelf: 'center',
      }}>
        {[
          { id: 'password', icon: Lock, label: 'Password' },
          { id: 'face',     icon: Camera, label: 'Face ID' },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setAuthType(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 16px',
              borderRadius: 8,
              border: 'none',
              background: authType === id ? 'rgba(212,175,55,0.14)' : 'transparent',
              color: authType === id ? '#f3e5ab' : 'rgba(148,163,184,0.4)',
              fontSize: 12.5,
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              boxShadow: authType === id ? 'inset 0 0 0 1px rgba(212,175,55,0.25)' : 'none',
              outline: 'none',
            }}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {authType === 'password' ? (
        <form onSubmit={handleSubmit} noValidate>
          <Field
            icon={Mail}
            label="Email Address"
            id="signin-email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@gmail.com"
            autoComplete="email"
          />
          <Field
            icon={Lock}
            label="Password"
            id="signin-password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••••"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="btn btn-violet"
            disabled={!email.trim() || !password.trim()}
            style={{
              width: '100%',
              padding: '13px 20px',
              borderRadius: 12,
              fontSize: 14.5,
              fontWeight: 800,
              marginTop: 6,
              cursor: (!email.trim() || !password.trim()) ? 'not-allowed' : 'pointer',
              opacity: (!email.trim() || !password.trim()) ? 0.5 : 1,
              letterSpacing: '0.01em',
            }}
          >
            <span>Continue with OTP</span>
            <ChevronRight size={17} />
          </button>
        </form>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          textAlign: 'center',
          padding: '20px 10px',
          animation: 'fade-in 0.3s ease'
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(212,175,55,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#d4af37', marginBottom: 4
          }}>
            <Shield size={20} />
          </div>
          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#f3e5ab', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
            Biometric Scan Active
          </h4>
          <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.5)', margin: 0, lineHeight: 1.5, maxWidth: '280px' }}>
            Please position your face in the circular scanner frame on the left side of the screen.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setAuthType('password')}
            style={{ borderRadius: 10, padding: '8px 18px', fontSize: 12, marginTop: 10 }}
          >
            Use Password Instead
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Register Form
───────────────────────────────────────────────────────── */
function RegisterForm({ onLogin, portalMode }) {
  const [name,     setName]     = useState('');
  const [age,      setAge]      = useState('');
  const [gender,   setGender]   = useState('Male');
  const [skills,   setSkills]   = useState('');
  const [college,  setCollege]  = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [role,     setRole]     = useState('Student');
  const [saving,   setSaving]   = useState(false);

  const isValid = name.trim() && age.trim() && skills.trim() && college.trim() && email.trim() && password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setSaving(true);

    const payload = {
      name, age: parseInt(age, 10) || 20, gender,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      college, email, role,
      createdAt: new Date().toISOString(),
      xp: 120, level: 1,
    };

    try {
      const { error } = await supabase.from('users').insert([payload]);
      if (error) throw error;
    } catch (err) {
      console.warn('[Supabase] Fallback to local cache:', err?.message);
    } finally {
      setSaving(false);
      playSuccessChime();
      onLogin({ ...payload, avatar: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(), role: portalMode });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
        <Field icon={User}     label="Full Name"   id="reg-name"   value={name}    onChange={setName}    placeholder="Krushanth M"   autoComplete="name" />
        <Field                 label="Age"         id="reg-age"    type="number"  value={age}     onChange={setAge}     placeholder="20" />
      </div>

      {/* Gender */}
      <div style={{ marginBottom: 14 }}>
        <label style={{
          fontSize: 11.5, fontWeight: 700, color: 'rgba(148,163,184,0.6)',
          letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6,
        }}>Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="input"
          style={{
            background: 'rgba(8,6,3,0.7)',
            border: '1px solid rgba(212,175,55,0.14)',
            borderRadius: 11, height: 46, fontSize: 14, color: '#f6f4ef',
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      <Field icon={Sparkles}  label="Skills (comma separated)"  id="reg-skills"  value={skills}   onChange={setSkills}  placeholder="React, Python, Figma…" />
      <Field icon={Building2} label="College / University"       id="reg-college" value={college}  onChange={setCollege} placeholder="IIT Bombay, VIT…"       autoComplete="organization" />
      <Field icon={Mail}      label="Email Address"              id="reg-email"   type="email"    value={email}    onChange={setEmail}    placeholder="you@gmail.com" autoComplete="email" />
      <Field icon={Lock}      label="Password"                   id="reg-password" type="password" value={password} onChange={setPassword} placeholder="••••••••••"       autoComplete="new-password" />

      <RoleSelector value={role} onChange={setRole} />

      <button
        type="submit"
        className="btn btn-violet"
        disabled={saving || !isValid}
        style={{
          width: '100%', padding: '13px 20px', borderRadius: 12,
          fontSize: 14.5, fontWeight: 800, marginTop: 6,
          cursor: (saving || !isValid) ? 'not-allowed' : 'pointer',
          opacity: (saving || !isValid) ? 0.5 : 1,
        }}
      >
        {saving ? (
          <>
            <div style={{ width: 15, height: 15, border: '2px solid transparent', borderTop: '2px solid #0a0800', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            <span>Creating Account…</span>
          </>
        ) : (
          <>
            <span>Create Account</span>
            <ChevronRight size={17} />
          </>
        )}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────
   OAuth Buttons
───────────────────────────────────────────────────────── */
function OAuthButtons({ onGoogleTrigger }) {
  const btnStyle = {
    flex: 1, padding: '11px 14px', borderRadius: 11,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(148,163,184,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, fontSize: 13, fontWeight: 600,
    fontFamily: "'Space Grotesk', sans-serif",
    cursor: 'pointer', transition: 'all 0.2s ease',
  };

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {/* GitHub */}
      <button type="button" style={btnStyle}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        GitHub
      </button>

      {/* Google */}
      <button type="button" style={btnStyle} onClick={onGoogleTrigger}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
      >
        <svg width="16" height="16" viewBox="0 0 48 48">
          <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.1 33.6 29.5 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l6.1-6.1C34.2 6.4 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" />
          <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16 19.2 13 24 13c3.1 0 5.8 1.1 8 2.9l6.1-6.1C34.2 6.4 29.4 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z" />
          <path fill="#FBBC05" d="M24 44c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.3C29.5 35.3 26.9 36 24 36c-5.5 0-10.1-3.5-11.8-8.4l-7 5.4C8.9 40.1 15.9 44 24 44z" />
          <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.5-2.6 4.6-4.8 6l6.4 5.3C41.7 36.2 44.5 30.5 44.5 24c0-1.3-.1-2.7-.2-4z" />
        </svg>
        Google
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Google Account Selector Modal
───────────────────────────────────────────────────────── */
function GoogleAccountsModal({ onClose, onConfirm }) {
  const [loading,     setLoading]     = useState(false);
  const [selectedAcc, setSelectedAcc] = useState(null);

  const accounts = [
    { name: 'Krushanth M', email: 'krushanth.m@rathinam.in',    avatar: 'KM', label: 'Rathinam Institute of Technology' },
    { name: 'Guest',       email: 'guest.student@apexcolab.edu', avatar: 'G',  label: 'Apex Colab Guest Profile' },
  ];

  const handleSelect = (acc) => {
    setSelectedAcc(acc);
    setLoading(true);
    playBeep();
    setTimeout(() => { setLoading(false); playSuccessChime(); onConfirm(acc); }, 1400);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(2,0,6,0.75)',
      backdropFilter: 'blur(30px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, padding: 20,
    }}>
      <div className="card highlight-box" style={{
        width: '100%', maxWidth: 380, padding: 32,
        animation: 'scale-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.08)', marginBottom: 14,
          }}>
            <svg width="24" height="24" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.1 33.6 29.5 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l6.1-6.1C34.2 6.4 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" />
            </svg>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#f6f4ef', fontFamily: "'Outfit', sans-serif", margin: 0 }}>Sign In with Google</h3>
          <p style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)', margin: '5px 0 0' }}>Select an account to continue</p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '16px 0' }}>
            <div style={{
              width: 32, height: 32,
              border: '2px solid rgba(212,175,55,0.2)',
              borderTop: '2px solid #d4af37',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            <span style={{ fontSize: 12, color: '#d4af37', fontWeight: 700 }}>Connecting as {selectedAcc?.name}…</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {accounts.map((acc, i) => (
              <button
                key={i}
                onClick={() => handleSelect(acc)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: 12,
                  width: '100%', textAlign: 'left',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer', transition: 'all 0.18s ease', outline: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.06)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: i === 0 ? 'linear-gradient(135deg, #d4af37, #aa7c11)' : 'rgba(255,255,255,0.08)',
                  color: i === 0 ? '#0a0800' : '#f6f4ef',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 12,
                  fontFamily: "'Space Grotesk', sans-serif",
                  flexShrink: 0,
                }}>{acc.avatar}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f6f4ef', fontFamily: "'Space Grotesk', sans-serif" }}>{acc.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', marginTop: 1 }}>{acc.email}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none',
            color: 'rgba(148,163,184,0.4)', fontSize: 12,
            cursor: 'pointer', textAlign: 'center', padding: '4px',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   OTP Modal
───────────────────────────────────────────────────────── */
function OtpModal({ email, onClose, onVerified }) {
  const [otp,      setOtp]      = useState(['', '', '', '', '', '']);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [timer,    setTimer]    = useState(59);
  const [sent,     setSent]     = useState(true);
  const inputRefs  = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    setError('');
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputRefs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(''));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) { setError('Enter the complete 6-digit code'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      playSuccessChime();
      onVerified();
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(2,0,6,0.82)',
      backdropFilter: 'blur(36px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, padding: 20,
    }}>
      <div style={{
        width: '100%', maxWidth: 400,
        background: 'rgba(10,8,5,0.96)',
        border: '1px solid rgba(212,175,55,0.22)',
        borderRadius: 22,
        padding: 36,
        boxShadow: '0 40px 80px rgba(0,0,0,0.9), 0 0 60px rgba(212,175,55,0.08)',
        animation: 'scale-pop 0.38s cubic-bezier(0.34,1.56,0.64,1) both',
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.25)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 14,
          }}>
            <Key size={22} color="#d4af37" />
          </div>
          <h3 style={{
            fontSize: 20, fontWeight: 900,
            fontFamily: "'Outfit', sans-serif",
            color: '#f6f4ef', margin: 0, letterSpacing: '-0.02em',
          }}>Verify Identity</h3>
          <p style={{ fontSize: 12.5, color: 'rgba(148,163,184,0.5)', margin: '6px 0 0', lineHeight: 1.5 }}>
            We sent a 6-digit code to<br />
            <strong style={{ color: 'rgba(212,175,55,0.7)', fontWeight: 700 }}>{email}</strong>
          </p>
        </div>

        {/* OTP inputs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }} onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              style={{
                width: 46, height: 52, textAlign: 'center',
                fontSize: 22, fontWeight: 900,
                fontFamily: "'Outfit', sans-serif",
                background: digit ? 'rgba(212,175,55,0.1)' : 'rgba(8,6,3,0.7)',
                border: `1.5px solid ${digit ? 'rgba(212,175,55,0.45)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 12,
                color: digit ? '#f3e5ab' : '#f6f4ef',
                outline: 'none',
                transition: 'all 0.18s ease',
                caretColor: '#d4af37',
              }}
            />
          ))}
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444', fontSize: 12, fontWeight: 600 }}>
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        {/* Verify button */}
        <button
          className="btn btn-violet"
          onClick={handleVerify}
          disabled={loading || otp.join('').length < 6}
          style={{
            width: '100%', padding: '13px', borderRadius: 12,
            fontSize: 14.5, fontWeight: 800,
            cursor: (loading || otp.join('').length < 6) ? 'not-allowed' : 'pointer',
            opacity: (loading || otp.join('').length < 6) ? 0.5 : 1,
          }}
        >
          {loading ? (
            <>
              <div style={{ width: 15, height: 15, border: '2px solid transparent', borderTop: '2px solid #0a0800', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              Verifying…
            </>
          ) : (
            <>
              <Key size={15} />
              Verify & Enter
            </>
          )}
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              color: 'rgba(148,163,184,0.4)', fontSize: 12,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <ArrowLeft size={12} /> Back
          </button>
          {timer > 0 ? (
            <span style={{ fontSize: 11.5, color: 'rgba(148,163,184,0.4)' }}>
              Resend in {timer}s
            </span>
          ) : (
            <button
              onClick={() => { setTimer(59); playBeep(); }}
              style={{
                background: 'none', border: 'none',
                color: '#d4af37', fontSize: 12, fontWeight: 700,
                cursor: 'pointer', textDecoration: 'underline',
              }}
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Auth Page — main export
───────────────────────────────────────────────────────── */
export default function Auth({ onLogin }) {
  const [tab,        setTab]        = useState('signin');
  const [portalMode, setPortalMode] = useState('maker');
  const [authType,   setAuthType]   = useState('password'); // 'password' | 'face'
  const [showGoogle, setShowGoogle] = useState(false);
  const [showOtp,    setShowOtp]    = useState(false);
  const [otpEmail,   setOtpEmail]   = useState('');
  const [otpCallback,setOtpCallback]= useState(null);

  const handleTriggerOtp = (email, callback) => {
    setOtpEmail(email);
    setOtpCallback(() => callback);
    setShowOtp(true);
  };

  const handleGoogleConfirm = (acc) => {
    setShowGoogle(false);
    onLogin({ name: acc.name, email: acc.email, mode: 'google', role: portalMode });
  };

  return (
    <div className="auth-page">
      {/* ── Card (Laptop Ratio Landscape Container) ── */}
      <div
        className="auth-card"
        role="main"
        aria-label="Apex Colab Authentication"
        style={{
          maxHeight: '92vh',
          maxWidth: '920px',
          width: '90%',
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          padding: '0px',
          overflow: 'hidden',
          borderRadius: '24px',
          boxSizing: 'border-box'
        }}
      >
        {/* Left Side: Branding / Security Checkpoint / Face Biometrics */}
        <div style={{
          background: 'rgba(15, 12, 8, 0.65)',
          borderRight: '1px solid rgba(212, 175, 55, 0.12)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          position: 'relative',
          boxSizing: 'border-box'
        }}>
          {authType === 'face' && tab === 'signin' ? (
            <FaceUnlock onLogin={() => onLogin({ mode: 'biometric', role: portalMode })} />
          ) : (
            <>
              {/* Logo */}
              <div className="auth-logo" style={{ marginBottom: 0 }}>
                <ApexLogo size={72} />
              </div>

              {/* Security info card */}
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10px'
              }}>
                <div style={{
                  background: 'rgba(212,175,55,0.03)',
                  border: '1px dashed rgba(212,175,55,0.2)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '280px',
                  boxSizing: 'border-box'
                }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#d4af37',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: '4px'
                  }}>🔒 Security Protocol</span>
                  <p style={{
                    fontSize: '12px',
                    color: 'rgba(148, 163, 184, 0.6)',
                    margin: 0,
                    lineHeight: 1.4
                  }}>
                    All operations are secured via biometric facial signature matching and end-to-end ledger verification.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side: Interactive Forms & Portal Selector */}
        <div style={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}>
          {/* Portal chooser */}
          <PortalChooser value={portalMode} onChange={setPortalMode} />

          {/* Tab switcher */}
          <TabBar active={tab} onChange={setTab} />

          {/* Forms */}
          <div style={{ flex: 1 }}>
            {tab === 'signin'
              ? <SignInForm onLogin={onLogin} triggerOtp={handleTriggerOtp} portalMode={portalMode} authType={authType} setAuthType={setAuthType} />
              : <RegisterForm onLogin={onLogin} portalMode={portalMode} />
            }
          </div>

          {/* OAuth */}
          <Divider />
          <OAuthButtons onGoogleTrigger={() => setShowGoogle(true)} />

          {/* Demo access */}
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => onLogin({ role: portalMode })}
              style={{
                background: 'none',
                border: '1px dashed rgba(212,175,55,0.2)',
                borderRadius: 10,
                width: '100%',
                padding: '10px 16px',
                fontSize: 12,
                color: 'rgba(148,163,184,0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                transition: 'all 0.2s ease',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.color = 'rgba(212,175,55,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'; e.currentTarget.style.color = 'rgba(148,163,184,0.4)'; }}
            >
              <Sparkles size={13} />
              Demo Access — {portalMode === 'investor' ? 'Investor' : 'Maker'} Portal
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showGoogle && (
        <GoogleAccountsModal
          onClose={() => setShowGoogle(false)}
          onConfirm={handleGoogleConfirm}
        />
      )}
      {showOtp && (
        <OtpModal
          email={otpEmail}
          onClose={() => setShowOtp(false)}
          onVerified={() => {
            setShowOtp(false);
            if (otpCallback) otpCallback();
          }}
        />
      )}
    </div>
  );
}
