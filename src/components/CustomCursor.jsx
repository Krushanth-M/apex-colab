import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hoverType, setHoverType] = useState('default'); // 'default' | 'card' | 'button' | 'grab'
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    // Track hover targets
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isButton = target.closest('button') || target.closest('a') || target.closest('.btn') || target.closest('.sidebar-link');
      const isCard = target.closest('.card') || target.closest('.team-slot') || target.closest('.podium-base');
      const isGrab = target.closest('.grabable') || target.closest('.pomodoro-ring');

      if (isButton) {
        setHoverType('button');
      } else if (isCard) {
        setHoverType('card');
      } else if (isGrab) {
        setHoverType('grab');
      } else {
        setHoverType('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  // Smooth trail lag
  useEffect(() => {
    let animationFrame;
    const updateTrail = () => {
      const dx = position.x - trailRef.current.x;
      const dy = position.y - trailRef.current.y;
      
      // Lag factor (0.15 is smooth lag)
      trailRef.current.x += dx * 0.15;
      trailRef.current.y += dy * 0.15;
      
      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      animationFrame = requestAnimationFrame(updateTrail);
    };
    
    animationFrame = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  if (isHidden) return null;

  // Render cursor states
  const getCursorStyles = () => {
    let dotSize = 12;
    let dotColor = '#7c3aed'; // Brand violet
    let ringSize = 32;
    let ringColor = 'rgba(124, 58, 237, 0.3)';
    let ringBorder = '1.5px solid #7c3aed';
    let ringBorderRadius = '50%';
    let cursorGlow = '0 0 10px #7c3aed';

    if (hoverType === 'card') {
      dotColor = '#06b6d4'; // Cyan
      ringColor = 'rgba(6, 182, 212, 0.15)';
      ringBorder = '1.5px solid #06b6d4';
      ringSize = 48; // Expands on card
      cursorGlow = '0 0 16px #06b6d4, 0 0 30px rgba(6,182,212,0.4)';
    } else if (hoverType === 'button') {
      // Morphs to a pointer beam
      dotSize = 4;
      dotColor = '#d4af37'; // Gold
      ringSize = 20;
      ringColor = 'rgba(212, 175, 55, 0.2)';
      ringBorder = '2px solid #d4af37';
      ringBorderRadius = '4px'; // Rectangular pointer beam vibe
      cursorGlow = '0 0 10px #d4af37';
    } else if (hoverType === 'grab') {
      dotColor = '#10b981'; // Aurora green
      ringSize = 40;
      ringColor = 'rgba(16, 185, 129, 0.15)';
      ringBorder = '1.5px dashed #10b981';
      cursorGlow = '0 0 15px #10b981';
    }

    if (isMouseDown) {
      ringSize = ringSize * 0.7; // Shrinks on click
      dotSize = dotSize * 1.3;
    }

    return { dotSize, dotColor, ringSize, ringColor, ringBorder, ringBorderRadius, cursorGlow };
  };

  const { dotSize, dotColor, ringSize, ringColor, ringBorder, ringBorderRadius, cursorGlow } = getCursorStyles();

  return (
    <>
      {/* Glow dot cursor */}
      <div style={{
        position: 'fixed',
        left: position.x - dotSize / 2,
        top: position.y - dotSize / 2,
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        backgroundColor: dotColor,
        boxShadow: cursorGlow,
        pointerEvents: 'none',
        zIndex: 100000,
        transition: 'width 0.2s, height 0.2s, background-color 0.2s, box-shadow 0.2s'
      }} />

      {/* Trailing cursor ring */}
      <div style={{
        position: 'fixed',
        left: trail.x - ringSize / 2,
        top: trail.y - ringSize / 2,
        width: ringSize,
        height: ringSize,
        borderRadius: ringBorderRadius,
        backgroundColor: ringColor,
        border: ringBorder,
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'width 0.25s, height 0.25s, border-color 0.25s, background-color 0.25s, border-radius 0.25s'
      }} />
    </>
  );
}
