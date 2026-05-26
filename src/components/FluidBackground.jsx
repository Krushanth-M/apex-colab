import React, { useRef, useEffect } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 100;
const CONNECTION_DIST = 110;   // px
const CURSOR_ORBIT_DIST = 120; // px
const ORBIT_FORCE = 0.05;      // orbit speed factor

export default function FluidBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);

  // ─── Particle class ───────────────────────────────────────────────────────────
  class Particle {
    constructor(w, h, idx) {
      this.w = w;
      this.h = h;
      this.idx = idx;
      this.reset();
      
      // Randomize initial Y to avoid vertical sync lines
      this.y = Math.random() * h;
    }

    reset() {
      this.x = Math.random() * this.w;
      this.y = this.h + 20; // Spawn below screen
      
      // Slow upward drift velocity
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -0.3 - Math.random() * 0.4;
      
      // Random sizes & types ('dot' | 'cross' | 'diamond')
      const types = ['dot', 'cross', 'diamond'];
      this.type = types[this.idx % types.length];
      this.size = 1.5 + Math.random() * 3.5;
      this.alpha = 0.25 + Math.random() * 0.45;
      
      // Light Gold tones
      const goldPalette = [
        `rgba(243, 229, 171, ${this.alpha})`, // Champagne
        `rgba(212, 175, 55, ${this.alpha})`,  // Gold
        `rgba(229, 193, 88, ${this.alpha})`,  // Warm Gold
        `rgba(170, 124, 17, ${this.alpha * 0.5})`  // Darker gold/bronze
      ];
      this.color = goldPalette[this.idx % goldPalette.length];
      
      // Orbit phase offsets
      this.angle = Math.random() * Math.PI * 2;
      this.orbitSpeed = 0.02 + Math.random() * 0.03;
    }

    update(dt, mx, my, mouseActive) {
      // Basic drift motion
      this.x += this.vx;
      this.y += this.vy;

      // Mouse orbit effect
      if (mouseActive) {
        const dx = this.x - mx;
        const dy = this.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CURSOR_ORBIT_DIST && dist > 1) {
          // Calculate orbital perpendicular vectors
          const force = (1 - dist / CURSOR_ORBIT_DIST) * ORBIT_FORCE;
          
          // Orbit angle direction
          this.angle += this.orbitSpeed;
          const targetX = mx + Math.cos(this.angle) * dist;
          const targetY = my + Math.sin(this.angle) * dist;
          
          this.x += (targetX - this.x) * force;
          this.y += (targetY - this.y) * force;
        }
      }

      // Reset when particle drifts off screen
      if (this.y < -20 || this.x < -20 || this.x > this.w + 20) {
        this.reset();
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.color;
      ctx.lineWidth = 1;

      if (this.type === 'dot') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === 'cross') {
        ctx.beginPath();
        ctx.moveTo(this.x - this.size / 2, this.y);
        ctx.lineTo(this.x + this.size / 2, this.y);
        ctx.moveTo(this.x, this.y - this.size / 2);
        ctx.lineTo(this.x, this.y + this.size / 2);
        ctx.stroke();
      } else if (this.type === 'diamond') {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size / 2);
        ctx.lineTo(this.x + this.size / 2, this.y);
        ctx.lineTo(this.x, this.y + this.size / 2);
        ctx.lineTo(this.x - this.size / 2, this.y);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from(
        { length: PARTICLE_COUNT },
        (_, i) => new Particle(canvas.width, canvas.height, i)
      );
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const loop = (timestamp) => {
      if (lastTsRef.current === null) lastTsRef.current = timestamp;
      const dt = Math.min(timestamp - lastTsRef.current, 50);
      lastTsRef.current = timestamp;

      const W = canvas.width;
      const H = canvas.height;
      const { x: mx, y: my, active: mouseActive } = mouseRef.current;

      ctx.clearRect(0, 0, W, H);

      // Check for reduce motion active state
      const isReduced = document.documentElement.classList.contains('reduce-motion');
      if (isReduced) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Draw constellation links
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      for (const p of particles) {
        p.update(dt, mx, my, mouseActive);
        p.draw(ctx);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        /* Slow multi-axis organic paths for living auroral orbs */
        @keyframes blobMotion1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 40px) scale(0.95); }
        }
        @keyframes blobMotion2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 40px) scale(0.95); }
          66% { transform: translate(40px, -50px) scale(1.08); }
        }
        @keyframes blobMotion3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, 30px) scale(1.05); }
          66% { transform: translate(-40px, -40px) scale(0.93); }
        }
        @keyframes blobMotion4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, -30px) scale(1.08); }
          66% { transform: translate(50px, 40px) scale(0.95); }
        }
      `}</style>

      {/* Living background layer with four giant Light Gold organic auroras */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--bg)',
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        {/* Orb 1: Light Gold, 600px, top-left */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(243,229,171,0.18) 0%, rgba(212,175,55,0.06) 60%, rgba(0,0,0,0) 100%)',
          filter: 'blur(120px)',
          opacity: 0.55,
          animation: 'blobMotion1 16s ease-in-out infinite',
          willChange: 'transform'
        }} />

        {/* Orb 2: Light Gold, 500px, bottom-right */}
        <div style={{
          position: 'absolute',
          bottom: '-12%',
          right: '-8%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(170,124,17,0.05) 60%, rgba(0,0,0,0) 100%)',
          filter: 'blur(120px)',
          opacity: 0.5,
          animation: 'blobMotion2 19s ease-in-out infinite',
          willChange: 'transform'
        }} />

        {/* Orb 3: Light Gold, 400px, center-right */}
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(243,229,171,0.16) 0%, rgba(212,175,55,0.04) 60%, rgba(0,0,0,0) 100%)',
          filter: 'blur(120px)',
          opacity: 0.45,
          animation: 'blobMotion3 15s ease-in-out infinite',
          willChange: 'transform'
        }} />

        {/* Orb 4: Light Gold, 300px, bottom-left */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(243,229,171,0.04) 60%, rgba(0,0,0,0) 100%)',
          filter: 'blur(120px)',
          opacity: 0.5,
          animation: 'blobMotion4 20s ease-in-out infinite',
          willChange: 'transform'
        }} />

        {/* Interactive floating particles canvas layer */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block'
          }}
        />
      </div>
    </>
  );
}
