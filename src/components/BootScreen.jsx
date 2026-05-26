import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── Phase definitions ────────────────────────────────────────────────────────
// Phase 0: dark          (0ms   → 400ms)   pure black
// Phase 1: logo-fade-in  (400ms → 1400ms)  APEX fades + scales in
// Phase 2: bar           (1400ms→ 3200ms)  progress bar fills
// Phase 3: tagline       (3200ms→ 4000ms)  tagline fades in
// Phase 4: done          (4000ms→ 4500ms)  brief hold then onComplete fires
// ─────────────────────────────────────────────────────────────────────────────

const PHASES = [
  { name: "dark",       start: 0,    end: 400  },
  { name: "logo",       start: 400,  end: 1400 },
  { name: "bar",        start: 1400, end: 3200 },
  { name: "tagline",    start: 3200, end: 4000 },
  { name: "done",       start: 4000, end: 4500 },
];

const TOTAL_DURATION = 4500; // ms

// ─── Audio tone generator ─────────────────────────────────────────────────────
function playTone(ctx, frequency, startTime, duration, type = "sine", gain = 0.08) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.04);
  gainNode.gain.setValueAtTime(gain, startTime + duration - 0.08);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

function scheduleAudio(ctx) {
  const now = ctx.currentTime;

  // macOS majestic boot chord - rich G major/C major blend with decaying harmonics
  const frequencies = [130.81, 196.00, 261.63, 329.63, 392.00, 523.25, 659.25];
  frequencies.forEach((freq, idx) => {
    // Rich sine base
    playTone(ctx, freq, now + 0.45, 2.8, "sine", 0.04);
    // Warm triangle overlay for vintage resonance
    playTone(ctx, freq * 1.003, now + 0.46, 2.5, "triangle", 0.02);
  });

  // Subtle progress hum — low frequency warm tone
  playTone(ctx, 65.41, now + 1.45, 1.7, "triangle", 0.03);

  // Tagline ting — high organic chime pings
  playTone(ctx, 987.77, now + 3.25, 0.4, "sine", 0.03);
  playTone(ctx, 1318.51, now + 3.40, 0.3, "sine", 0.02);
}

// ─── Inline styles (no CSS imports required) ─────────────────────────────────
const styles = {
  root: {
    position: "fixed",
    inset: 0,
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    userSelect: "none",
    overflow: "hidden",
  },
  centerGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "28px",
  },
  logoText: {
    fontSize: "clamp(72px, 12vw, 144px)",
    fontWeight: 700,
    letterSpacing: "0.18em",
    color: "#fff",
    lineHeight: 1,
    transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
  },
  barTrack: {
    width: "clamp(160px, 28vw, 320px)",
    height: "4px",
    borderRadius: "9999px",
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
    transition: "opacity 0.5s ease",
  },
  barFill: {
    height: "100%",
    borderRadius: "9999px",
    background: "linear-gradient(90deg, rgba(255,255,255,0.6) 0%, #fff 100%)",
    transformOrigin: "left center",
    transition: "transform 0.05s linear",
  },
  tagline: {
    fontSize: "13px",
    fontWeight: 400,
    letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.35)",
    transition: "opacity 0.7s ease",
    textTransform: "uppercase",
  },
  skipBtn: {
    position: "absolute",
    bottom: "32px",
    right: "40px",
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.25)",
    fontSize: "12px",
    letterSpacing: "0.08em",
    cursor: "pointer",
    padding: "6px 10px",
    fontFamily: "inherit",
    transition: "color 0.2s ease",
    textDecoration: "none",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function BootScreen({ onComplete }) {
  const [elapsed, setElapsed]         = useState(0);
  const [skipping, setSkipping]       = useState(false);
  const [skipHover, setSkipHover]     = useState(false);
  const startTimeRef                  = useRef(null);
  const rafRef                        = useRef(null);
  const audioCtxRef                   = useRef(null);
  const doneRef                       = useRef(false);

  // ── Determine current phase from elapsed ───────────────────────────────────
  const phase = PHASES.findLast((p) => elapsed >= p.start)?.name ?? "dark";

  // ── Progress bar fill [0..1] during bar phase ──────────────────────────────
  const barProgress = phase === "bar" || phase === "tagline" || phase === "done"
    ? Math.min(1, (elapsed - 1400) / (3200 - 1400))
    : 0;

  // ── Derived visibility values ──────────────────────────────────────────────
  const logoVisible    = phase !== "dark";
  const barVisible     = phase === "bar" || phase === "tagline" || phase === "done";
  const taglineVisible = phase === "tagline" || phase === "done";

  // ── Animation loop ─────────────────────────────────────────────────────────
  const tick = useCallback((timestamp) => {
    if (startTimeRef.current === null) startTimeRef.current = timestamp;
    const el = timestamp - startTimeRef.current;
    setElapsed(el);

    if (el < TOTAL_DURATION && !doneRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    } else if (!doneRef.current) {
      doneRef.current = true;
      onComplete?.();
    }
  }, [onComplete]);

  // ── Mount: start audio + animation ────────────────────────────────────────
  useEffect(() => {
    // Kick off Web Audio (wrapped in try/catch for browsers without API)
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      scheduleAudio(ctx);
    } catch (_) {
      // Audio not available — silent boot
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      audioCtxRef.current?.close();
    };
  }, [tick]);

  // ── Skip handler ───────────────────────────────────────────────────────────
  const handleSkip = useCallback(() => {
    if (doneRef.current || skipping) return;
    setSkipping(true);
    doneRef.current = true;
    cancelAnimationFrame(rafRef.current);
    audioCtxRef.current?.close();
    // Small delay so the button press feels intentional
    setTimeout(() => onComplete?.(), 80);
  }, [onComplete, skipping]);

  // ── Glow filter definition ────────────────────────────────────────────────
  const glowStyle = {
    textShadow: logoVisible
      ? "0 0 40px rgba(255,255,255,0.25), 0 0 80px rgba(255,255,255,0.12), 0 0 160px rgba(255,255,255,0.06)"
      : "none",
  };

  return (
    <div style={styles.root} aria-label="Apex Colab boot screen" role="status">
      <div style={styles.centerGroup}>
        {/* ── APEX logo ── */}
        <span
          style={{
            ...styles.logoText,
            ...glowStyle,
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? "scale(1) translateY(0)" : "scale(0.92) translateY(12px)",
          }}
          aria-hidden="true"
        >
          APEX
        </span>

        {/* ── Progress bar ── */}
        <div
          style={{
            ...styles.barTrack,
            opacity: barVisible ? 1 : 0,
          }}
          role="progressbar"
          aria-valuenow={Math.round(barProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            style={{
              ...styles.barFill,
              transform: `scaleX(${barProgress})`,
            }}
          />
        </div>

        {/* ── Tagline ── */}
        <span
          style={{
            ...styles.tagline,
            opacity: taglineVisible ? 1 : 0,
          }}
          aria-live="polite"
        >
          Apex Colab
        </span>
      </div>

      {/* ── Skip link ── */}
      <button
        style={{
          ...styles.skipBtn,
          color: skipHover ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)",
        }}
        onClick={handleSkip}
        onMouseEnter={() => setSkipHover(true)}
        onMouseLeave={() => setSkipHover(false)}
        aria-label="Skip boot screen"
        tabIndex={0}
      >
        skip →
      </button>
    </div>
  );
}
