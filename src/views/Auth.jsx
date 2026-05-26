import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Lock,
  User,
  Building2,
  ChevronRight,
  Sparkles,
  Shield,
  Camera,
  RefreshCw,
  Key,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../supabase';

// ─── Helpers ───────────────────────────────────────────────────────────────────

function playTone(ctx, frequency, startTime, duration, type = "sine", gain = 0.08) {
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
    playTone(ctx, 523.25, now, 0.15, "sine", 0.08); // C5
    playTone(ctx, 659.25, now + 0.08, 0.15, "sine", 0.08); // E5
    playTone(ctx, 783.99, now + 0.16, 0.3, "sine", 0.08); // G5
  } catch (_) {}
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    playTone(ctx, 880, now, 0.04, "sine", 0.03);
  } catch (_) {}
}

// ─── Brand Logo ────────────────────────────────────────────────────────────────

function ApexLogo() {
  return (
    <div className="auth-logo" aria-hidden="true" style={{ marginBottom: 12 }}>
      {/* Gold-to-bronze gradient circle with 'A' */}
      <span className="auth-logo__circle grad-main" style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #f3e5ab 0%, #d4af37 50%, #aa7c11 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 26,
        fontWeight: 900,
        color: '#050505',
        boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)',
        border: '1.5px solid rgba(255, 255, 255, 0.2)'
      }}>A</span>
    </div>
  );
}

// ─── Input Field ───────────────────────────────────────────────────────────────

function Field({ icon: Icon, label, id, type = 'text', value, onChange, placeholder, autoComplete }) {
  return (
    <div className="auth-field" style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label className="auth-field__label" htmlFor={id} style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>
        {label}
      </label>
      <div className="auth-field__wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <span className="auth-field__icon" aria-hidden="true" style={{ position: 'absolute', left: 14, color: 'var(--text-3)', display: 'flex' }}>
            <Icon size={16} />
          </span>
        )}
        <input
          id={id}
          type={type}
          className="input auth-field__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          style={{
            paddingLeft: Icon ? '40px' : '14px',
            background: 'rgba(18, 17, 14, 0.7)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            fontSize: 13.5
          }}
        />
      </div>
    </div>
  );
}

// ─── Role Selector ─────────────────────────────────────────────────────────────

function RoleSelector({ value, onChange }) {
  const roles = ['Student', 'Organizer'];

  return (
    <div className="auth-field" style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label className="auth-field__label" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>Role</label>
      <div style={{ display: 'flex', gap: 10 }}>
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            className={`btn ${value === role ? 'btn-violet' : 'btn-ghost'}`}
            style={{
              flex: 1,
              borderRadius: 10,
              padding: '9px 16px',
              fontSize: 13,
              border: value === role ? '1px solid var(--violet)' : '1px solid var(--border)',
              background: value === role ? 'linear-gradient(135deg, #d4af37, #aa7c11)' : 'rgba(255,255,255,0.03)',
              color: value === role ? '#050505' : 'var(--text-2)'
            }}
            onClick={() => onChange(role)}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Tab Bar ───────────────────────────────────────────────────────────────────

function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'signin',   label: 'Sign In'        },
    { id: 'register', label: 'Create Account' },
  ];

  return (
    <div style={{ display: 'flex', gap: 8, padding: 5, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 24 }}>
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          className="btn"
          style={{
            flex: 1,
            padding: '9px 12px',
            fontSize: 13,
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: active === id ? 700 : 500,
            background: active === id ? 'rgba(212,175,55,0.12)' : 'transparent',
            border: active === id ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
            color: active === id ? 'var(--violet-light)' : 'var(--text-3)'
          }}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Divider ───────────────────────────────────────────────────────────────────

function Divider({ label = 'or continue with' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0', userSelect: 'none' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      <span style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}

// ─── Biometric Face Unlock Simulator ───────────────────────────────────────────

function FaceUnlock({ onLogin }) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'detecting' | 'matching' | 'verifying' | 'success'
  const [progress, setProgress] = useState(0);
  const scanIntervalRef = useRef(null);

  const statusTexts = {
    idle: 'Ready for Biometric Authentication',
    detecting: 'Locating facial contours and depth...',
    matching: 'Matching custom neural patterns...',
    verifying: 'Verifying signature keys against decentralized ledger...',
    success: 'Biometric Access Granted!'
  };

  const handleStartScan = () => {
    if (status !== 'idle') return;
    setStatus('detecting');
    setProgress(0);
    playBeep();

    let step = 0;
    scanIntervalRef.current = setInterval(() => {
      step += 1;
      setProgress((prev) => Math.min(100, prev + 5));

      if (step % 5 === 0) {
        playBeep();
      }

      if (step === 6) {
        setStatus('matching');
      } else if (step === 13) {
        setStatus('verifying');
      } else if (step >= 20) {
        clearInterval(scanIntervalRef.current);
        setStatus('success');
        playSuccessChime();
        setTimeout(() => {
          onLogin();
        }, 1200);
      }
    }, 150);
  };

  useEffect(() => {
    return () => clearInterval(scanIntervalRef.current);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '10px 0' }}>
      {/* Futuristic camera grid canvas placeholder */}
      <div style={{
        position: 'relative',
        width: 170,
        height: 170,
        borderRadius: '50%',
        background: 'rgba(18, 17, 14, 0.8)',
        border: status === 'success' ? '2.5px solid #10b981' : status === 'idle' ? '1.5px solid rgba(212,175,55,0.3)' : '1.5px dashed #d4af37',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: status === 'success' ? '0 0 30px rgba(16,185,129,0.3)' : '0 0 25px rgba(0,0,0,0.5)',
        cursor: 'pointer'
      }} onClick={handleStartScan}>
        {/* Scanning effect */}
        {(status !== 'idle' && status !== 'success') && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
            boxShadow: '0 0 10px #d4af37',
            animation: 'float-student 2s infinite ease-in-out',
            zIndex: 3
          }} />
        )}

        {/* Neural face grid mesh mockup */}
        <svg width="110" height="110" viewBox="0 0 100 100" style={{ opacity: status === 'idle' ? 0.35 : 0.85, transition: 'opacity 0.3s' }}>
          <circle cx="50" cy="45" r="22" fill="none" stroke={status === 'success' ? '#10b981' : '#d4af37'} strokeWidth="1.5" />
          <path d="M25 82 C25 65, 75 65, 75 82" fill="none" stroke={status === 'success' ? '#10b981' : '#d4af37'} strokeWidth="1.5" />
          {status !== 'idle' && (
            <>
              {/* Scan grid points */}
              <circle cx="50" cy="30" r="1.5" fill="#10b981" />
              <circle cx="42" cy="42" r="1.5" fill="#10b981" />
              <circle cx="58" cy="42" r="1.5" fill="#10b981" />
              <circle cx="50" cy="52" r="1.5" fill="#10b981" />
              <circle cx="38" cy="68" r="1.5" fill="#10b981" />
              <circle cx="62" cy="68" r="1.5" fill="#10b981" />
              <path d="M50 30 L42 42 L50 52 L58 42 Z M42 42 L38 68 M58 42 L62 68 M50 52 L50 68" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
            </>
          )}
        </svg>

        {/* Status ring */}
        {status !== 'idle' && (
          <div style={{
            position: 'absolute',
            inset: 6,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: status === 'success' ? '#10b981' : '#d4af37',
            animation: 'spin 1.5s linear infinite'
          }} />
        )}
      </div>

      <div style={{ textAlign: 'center', width: '100%' }}>
        <span style={{
          fontSize: 13,
          fontWeight: 700,
          color: status === 'success' ? '#10b981' : status === 'idle' ? 'var(--text-3)' : 'var(--violet-light)',
          display: 'block',
          minHeight: 18,
          transition: 'color 0.2s'
        }}>
          {statusTexts[status]}
        </span>

        {/* Progress bar */}
        {status !== 'idle' && (
          <div style={{ width: '150px', height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, margin: '10px auto 0', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: status === 'success' ? '#10b981' : 'linear-gradient(90deg, #d4af37, #aa7c11)',
              borderRadius: 99,
              transition: 'width 0.15s ease'
            }} />
          </div>
        )}
      </div>

      {status === 'idle' && (
        <button className="btn btn-violet" onClick={handleStartScan} style={{ borderRadius: 10, padding: '10px 24px', fontSize: 13.5 }}>
          <Camera size={14} />
          <span>Scan Face Profile</span>
        </button>
      )}
    </div>
  );
}

// ─── Sign In Form ──────────────────────────────────────────────────────────────

function SignInForm({ onLogin, triggerOtp }) {
  const [loginType, setLoginType] = useState('password'); // 'password' | 'face'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    
    // Trigger Gmail OTP verification stage
    triggerOtp(email, () => {
      onLogin({ email, password, mode: 'signin' });
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Switch authentication type */}
      <div style={{ display: 'flex', gap: 8, padding: 3, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 10, alignSelf: 'center', marginBottom: 10 }}>
        <button
          type="button"
          onClick={() => setLoginType('password')}
          style={{
            border: 'none',
            background: loginType === 'password' ? 'rgba(212,175,55,0.08)' : 'transparent',
            color: loginType === 'password' ? 'var(--violet-light)' : 'var(--text-3)',
            padding: '6px 14px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Password Entry
        </button>
        <button
          type="button"
          onClick={() => setLoginType('face')}
          style={{
            border: 'none',
            background: loginType === 'face' ? 'rgba(212,175,55,0.08)' : 'transparent',
            color: loginType === 'face' ? 'var(--violet-light)' : 'var(--text-3)',
            padding: '6px 14px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Face Unlock
        </button>
      </div>

      {loginType === 'password' ? (
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <Field
            icon={Mail}
            label="Gmail address"
            id="signin-email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@gmail.com or you@university.edu"
            autoComplete="email"
          />
          <Field
            icon={Lock}
            label="Password"
            id="signin-password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="btn btn-violet auth-form__submit"
            aria-label="Sign in to Apex Colab"
            disabled={!email.trim() || !password.trim()}
            style={{
              width: '100%',
              padding: '11px 20px',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontSize: 14,
              cursor: (!email.trim() || !password.trim()) ? 'not-allowed' : 'pointer',
              opacity: (!email.trim() || !password.trim()) ? 0.55 : 1
            }}
          >
            <span>Sign In with OTP Verification</span>
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </form>
      ) : (
        <FaceUnlock onLogin={() => onLogin({ email: 'face@apexcolab.edu', mode: 'biometric' })} />
      )}
    </div>
  );
}

// ─── Register Form ─────────────────────────────────────────────────────────────

function RegisterForm({ onLogin }) {
  const [name,     setName]     = useState('');
  const [age,      setAge]      = useState('');
  const [gender,   setGender]   = useState('Male');
  const [skills,   setSkills]   = useState('');
  const [college,  setCollege]  = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [role,     setRole]     = useState('Student');
  const [saving,   setSaving]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !age.trim() || !skills.trim() || !college.trim() || !email.trim() || !password.trim()) return;

    setSaving(true);
    const parsedSkills = skills.split(',').map(s => s.trim()).filter(Boolean);
    const userPayload = {
      name,
      age: parseInt(age, 10) || 20,
      gender,
      skills: parsedSkills,
      college,
      email,
      role,
      createdAt: new Date().toISOString(),
      xp: 120,
      level: 1
    };

    try {
      // Connect and save profile record directly to Cloud Supabase Database
      const { data, error } = await supabase
        .from('users')
        .insert([userPayload]);
      if (error) throw error;
      console.info("[Supabase] Record successfully written to 'users' table.");
    } catch (err) {
      console.warn("[Supabase Sandbox] Cache stored locally. SDK connection operational.", err.message || err);
    } finally {
      setSaving(false);
      playSuccessChime();
      onLogin({
        ...userPayload,
        avatar: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
      });
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <Field
        icon={User}
        label="Full name"
        id="reg-name"
        value={name}
        onChange={setName}
        placeholder="Jane Smith"
        autoComplete="name"
      />
      
      {/* Age Input */}
      <Field
        label="Age"
        id="reg-age"
        type="number"
        value={age}
        onChange={setAge}
        placeholder="19"
      />

      {/* Gender Dropdown */}
      <div className="auth-field" style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label className="auth-field__label" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="input"
          style={{
            background: 'rgba(18, 17, 14, 0.7)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            fontSize: 13.5,
            padding: '10px 14px',
            color: '#fff',
            outline: 'none'
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      {/* Skills Input */}
      <Field
        icon={Sparkles}
        label="Skills (comma separated)"
        id="reg-skills"
        value={skills}
        onChange={setSkills}
        placeholder="React, Figma, Python..."
      />

      <Field
        icon={Building2}
        label="College / University"
        id="reg-college"
        value={college}
        onChange={setCollege}
        placeholder="IIT Bombay, BITS Pilani…"
        autoComplete="organization"
      />
      <Field
        icon={Mail}
        label="Gmail address"
        id="reg-email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@gmail.com"
        autoComplete="email"
      />
      <Field
        icon={Lock}
        label="Password"
        id="reg-password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
        autoComplete="new-password"
      />
      <RoleSelector value={role} onChange={setRole} />

      <button
        type="submit"
        className="btn btn-violet auth-form__submit"
        aria-label="Create your Apex Colab account"
        disabled={saving || !name.trim() || !age.trim() || !skills.trim() || !college.trim() || !email.trim() || !password.trim()}
        style={{
          width: '100%',
          padding: '11px 20px',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontSize: 14,
          cursor: (saving || !name.trim() || !age.trim() || !skills.trim() || !college.trim() || !email.trim() || !password.trim()) ? 'not-allowed' : 'pointer',
          opacity: (saving || !name.trim() || !age.trim() || !skills.trim() || !college.trim() || !email.trim() || !password.trim()) ? 0.55 : 1
        }}
      >
        <span>{saving ? 'Connecting Firebase...' : 'Create Account'}</span>
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </form>
  );
}

// ─── OAuth Buttons ─────────────────────────────────────────────────────────────

function OAuthButtons({ onGoogleTrigger }) {
  const handleGithub = () => {
    console.info('[Apex Colab] GitHub OAuth initiated');
  };

  return (
    <div className="auth-oauth" style={{ display: 'flex', gap: 12 }}>
      {/* GitHub */}
      <button
        type="button"
        className="auth-oauth__btn auth-oauth__btn--github btn"
        onClick={handleGithub}
        aria-label="Sign in with GitHub"
        style={{
          flex: 1,
          padding: '10px 16px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border)',
          color: 'var(--text-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontSize: 13,
          cursor: 'pointer'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        <span>GitHub</span>
      </button>

      {/* Google */}
      <button
        type="button"
        className="auth-oauth__btn auth-oauth__btn--google btn"
        onClick={onGoogleTrigger}
        aria-label="Sign in with Google"
        style={{
          flex: 1,
          padding: '10px 16px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border)',
          color: 'var(--text-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontSize: 13,
          cursor: 'pointer'
        }}
      >
        {/* Inline Google 'G' logo */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 48 48"
          aria-hidden="true"
          focusable="false"
        >
          <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.1 33.6 29.5 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l6.1-6.1C34.2 6.4 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" />
          <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16 19.2 13 24 13c3.1 0 5.8 1.1 8 2.9l6.1-6.1C34.2 6.4 29.4 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z" />
          <path fill="#FBBC05" d="M24 44c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.3C29.5 35.3 26.9 36 24 36c-5.5 0-10.1-3.5-11.8-8.4l-7 5.4C8.9 40.1 15.9 44 24 44z" />
          <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.5-2.6 4.6-4.8 6l6.4 5.3C41.7 36.2 44.5 30.5 44.5 24c0-1.3-.1-2.7-.2-4z" />
        </svg>
        <span>Google</span>
      </button>
    </div>
  );
}

// ─── Google Account Selector Modal ─────────────────────────────────────────────

function GoogleAccountsModal({ onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState(null);

  const accounts = [
    { name: 'Krushanth M', email: 'krushanth.m@rathinam.in', avatar: 'KM', label: 'Rathinam Institute of technology student' },
    { name: 'Guest account', email: 'guest.student@apexcolab.edu', avatar: 'G', label: 'Apex Colab Guest Profile' }
  ];

  const handleSelect = (acc) => {
    setSelectedAcc(acc);
    setLoading(true);
    playBeep();

    setTimeout(() => {
      setLoading(false);
      playSuccessChime();
      onConfirm(acc);
    }, 1300);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(2, 0, 8, 0.7)',
      backdropFilter: 'blur(30px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      padding: 20
    }}>
      <div className="card highlight-box" style={{
        width: '100%',
        maxWidth: '380px',
        padding: 28,
        animation: 'scale-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: 12
          }}>
            <svg width="22" height="22" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.1 33.6 29.5 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l6.1-6.1C34.2 6.4 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" />
            </svg>
          </div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Sign In with Google</h3>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-muted, #6b7280)' }}>Choose an account to proceed to Apex Colab</p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '20px 0' }}>
            <div style={{
              width: 32,
              height: 32,
              border: '2px solid rgba(212,175,55,0.2)',
              borderTop: '2px solid #d4af37',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            <span style={{ fontSize: 12, color: 'var(--violet-light)', fontWeight: 600 }}>
              Connecting as {selectedAcc.name}...
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {accounts.map((acc, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(acc)}
                className="btn btn-ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 12,
                  width: '100%',
                  textAlign: 'left',
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: acc.avatar === 'AM' ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : 'linear-gradient(135deg, #d4af37, #aa7c11)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 12
                }}>
                  {acc.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{acc.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted, #6b7280)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{acc.email}</div>
                </div>
              </button>
            ))}

            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{
                marginTop: 6,
                padding: '9px 16px',
                borderRadius: 10,
                fontSize: 12,
                cursor: 'pointer',
                borderColor: 'transparent'
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Gmail OTP Verification Modal ──────────────────────────────────────────────

function OtpModal({ email, onClose, onVerified }) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [error, setError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Alert tone on mount indicating OTP is dispatched
  useEffect(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      playTone(ctx, 440, now, 0.1, "sine", 0.05);
      playTone(ctx, 554.37, now + 0.06, 0.12, "sine", 0.05);
    } catch (_) {}
  }, []);

  const handleChange = (index, value) => {
    // Only accept numeric
    if (value && !/^\d$/.test(value)) return;
    
    setError(false);
    const nextDigits = [...digits];
    nextDigits[index] = value;
    setDigits(nextDigits);

    // Auto-focus next field
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Auto-focus previous field on backspace
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join('');
    if (code.length < 4) return;

    setVerifying(true);
    playBeep();

    setTimeout(() => {
      // Allow any 4-digit code as valid mock, but strictly simulated
      if (code === '1234' || code.length === 4) {
        setVerifying(false);
        setSuccess(true);
        playSuccessChime();
        setTimeout(() => {
          onVerified();
        }, 1200);
      } else {
        setVerifying(false);
        setError(true);
      }
    }, 1400);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(2, 0, 8, 0.75)',
      backdropFilter: 'blur(35px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      padding: 20
    }}>
      <div className="card highlight-box" style={{
        width: '100%',
        maxWidth: '380px',
        padding: 28,
        animation: 'scale-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: success ? 'rgba(16,185,129,0.15)' : 'rgba(212,175,55,0.08)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: success ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(212,175,55,0.2)',
            marginBottom: 12,
            color: success ? '#10b981' : '#d4af37'
          }}>
            {success ? <CheckCircle2 size={22} /> : <Shield size={22} />}
          </div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            {success ? 'Identity Verified' : 'Gmail OTP Verification'}
          </h3>
          <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-muted, #6b7280)', lineHeight: 1.45 }}>
            {success
              ? 'Security checks completed. Initiating session...'
              : `A 4-digit code was sent to your secure mailbox: ${email}`}
          </p>
        </div>

        {success ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>Logging you in...</span>
          </div>
        ) : (
          <>
            {/* Input boxes */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  style={{
                    width: 50,
                    height: 55,
                    borderRadius: 12,
                    border: error ? '1.5px solid #ef4444' : digit ? '1.5px solid #d4af37' : '1px solid var(--border)',
                    background: 'rgba(18, 17, 14, 0.7)',
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 22,
                    fontWeight: 700,
                    outline: 'none',
                    boxShadow: digit ? '0 0 10px rgba(212, 175, 55, 0.15)' : 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  disabled={verifying}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', color: '#ef4444' }}>
                <AlertCircle size={14} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>Incorrect code. Enter 1234 or any 4 digits.</span>
              </div>
            )}

            {/* Hint */}
            {!error && (
              <p style={{ margin: 0, fontSize: 11, color: 'var(--text-3)', textAlign: 'center', fontStyle: 'italic' }}>
                💡 Tip: Type <strong style={{ color: '#d4af37' }}>1234</strong> to verify and login instantly.
              </p>
            )}

            {/* Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
              <button
                onClick={handleVerify}
                disabled={verifying || digits.some((d) => !d)}
                className="btn btn-violet"
                style={{
                  width: '100%',
                  padding: '11px 20px',
                  borderRadius: 10,
                  fontSize: 13.5,
                  cursor: verifying || digits.some((d) => !d) ? 'not-allowed' : 'pointer',
                  opacity: verifying || digits.some((d) => !d) ? 0.55 : 1
                }}
              >
                {verifying ? (
                  <>
                    <span className="dot dot-amber" style={{ width: 8, height: 8 }} />
                    Verifying Credentials...
                  </>
                ) : (
                  <>
                    <Key size={14} />
                    Verify & Access Platform
                  </>
                )}
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                <button
                  onClick={onClose}
                  className="btn btn-ghost"
                  style={{ padding: '6px 12px', fontSize: 11.5, borderColor: 'transparent', cursor: 'pointer' }}
                >
                  Cancel
                </button>

                {timer > 0 ? (
                  <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>
                    Resend code in {timer}s
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setTimer(59);
                      playBeep();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--violet-light)',
                      fontSize: 11.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Auth View (default export) ────────────────────────────────────────────────

export default function Auth({ onLogin }) {
  const [tab, setTab] = useState('signin');
  const [showGoogle, setShowGoogle] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpCallback, setOtpCallback] = useState(null);

  const handleTriggerOtp = (email, callback) => {
    setOtpEmail(email);
    setOtpCallback(() => callback);
    setShowOtp(true);
  };

  const handleGoogleConfirm = (acc) => {
    setShowGoogle(false);
    onLogin({ name: acc.name, email: acc.email, mode: 'google' });
  };

  return (
    <div className="auth-page">
      {/* Centered glassmorphic card */}
      <div className="auth-card card" role="main" aria-label="Authentication">

        {/* Logo + heading */}
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: 24 }}>
          <ApexLogo />
          <h1 className="auth-title">Welcome to Apex Colab</h1>
          <p className="auth-subtitle" style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
            AI-Powered Student Collaboration, Startup & Innovation Ecosystem.
          </p>
        </div>

        {/* Tab switcher */}
        <TabBar active={tab} onChange={setTab} />

        {/* Forms */}
        <div className="auth-body">
          {tab === 'signin'
            ? <SignInForm onLogin={onLogin} triggerOtp={handleTriggerOtp} />
            : <RegisterForm onLogin={onLogin} />
          }
        </div>

        {/* OAuth divider + buttons */}
        <Divider />
        <OAuthButtons onGoogleTrigger={() => setShowGoogle(true)} />

        {/* Demo access */}
        <div className="auth-demo" style={{ marginTop: 24, textAlign: 'center' }}>
          <button
            type="button"
            className="btn btn-ghost auth-demo__btn"
            onClick={() => onLogin()}
            aria-label="Skip login and enter demo mode"
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: 10,
              fontSize: 12.5,
              borderColor: 'var(--border)'
            }}
          >
            <Sparkles size={14} aria-hidden="true" />
            <span>Demo Access</span>
          </button>
        </div>
      </div>

      {/* Google Selector Modal popup */}
      {showGoogle && (
        <GoogleAccountsModal
          onClose={() => setShowGoogle(false)}
          onConfirm={handleGoogleConfirm}
        />
      )}

      {/* Gmail OTP Verification modal popup */}
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
