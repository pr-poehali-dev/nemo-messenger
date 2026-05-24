import { useEffect, useRef, useMemo } from 'react';
import { useApp } from '@/lib/AppContext';

const BUBBLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 7) % 90}%`,
  size: 8 + (i * 11) % 18,
  delay: (i * 1.3) % 8,
  duration: 7 + (i * 2.1) % 9,
}));

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return {r,g,b};
}

// Stars for cosmos/space themes
function Stars({ count = 80 }: { count?: number }) {
  const stars = useMemo(() =>
    Array.from({length: count}, (_,i) => ({
      id: i,
      x: Math.random()*100, y: Math.random()*100,
      size: 0.5 + Math.random()*1.5,
      delay: Math.random()*4, dur: 2+Math.random()*3,
    })), [count]);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map(s => (
        <div key={s.id} className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            opacity: 0.5,
            animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
          }} />
      ))}
    </div>
  );
}

// Falling petals for sakura
function Petals() {
  const petals = useMemo(() =>
    Array.from({length:16}, (_,i) => ({
      id: i, x: Math.random()*100,
      delay: Math.random()*8, dur: 6+Math.random()*6,
    })), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map(p => (
        <div key={p.id} className="absolute w-3 h-3 rounded-full opacity-60"
          style={{
            left: `${p.x}%`, top: '-10px',
            background: 'radial-gradient(circle, #f9a8d4 0%, #ec4899 70%)',
            animation: `petalFall ${p.dur}s ${p.delay}s linear infinite`,
          }} />
      ))}
    </div>
  );
}

// Leaves for forest/summer
function Leaves({ color }: { color: string }) {
  const leaves = useMemo(() =>
    Array.from({length:10}, (_,i) => ({
      id: i, x: Math.random()*100,
      delay: Math.random()*10, dur: 8+Math.random()*8,
    })), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {leaves.map(l => (
        <div key={l.id} className="absolute w-4 h-2 rounded-full opacity-40"
          style={{
            left: `${l.x}%`, top: '-10px',
            background: color,
            animation: `petalFall ${l.dur}s ${l.delay}s linear infinite`,
          }} />
      ))}
    </div>
  );
}

export default function WaveBackground() {
  const { theme, rgb } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  const accentColor = rgb
    ? `rgb(${rgb.r},${rgb.g},${rgb.b})`
    : theme.accentColor;

  const accentRgb = rgb ?? hexToRgb(theme.accentColor);
  const bgRgb     = hexToRgb(theme.bgFrom);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    let t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const {r,g,b} = accentRgb;

      // Wave 1
      ctx2d.beginPath();
      ctx2d.moveTo(0, h * 0.72);
      for (let x = 0; x <= w; x += 4) {
        const y = h * 0.72 + Math.sin(x * 0.005 + t * 0.6) * 28 + Math.sin(x * 0.012 + t * 0.3) * 14;
        ctx2d.lineTo(x, y);
      }
      ctx2d.lineTo(w, h); ctx2d.lineTo(0, h); ctx2d.closePath();
      const g1 = ctx2d.createLinearGradient(0, h*0.65, 0, h);
      g1.addColorStop(0, `rgba(${r},${g},${b},0.3)`);
      g1.addColorStop(1, `rgba(${bgRgb.r},${bgRgb.g},${bgRgb.b},0.85)`);
      ctx2d.fillStyle = g1;
      ctx2d.fill();

      // Wave 2
      ctx2d.beginPath();
      ctx2d.moveTo(0, h * 0.78);
      for (let x = 0; x <= w; x += 4) {
        const y = h * 0.78 + Math.sin(x * 0.008 - t * 0.45) * 22 + Math.cos(x * 0.015 + t * 0.25) * 10;
        ctx2d.lineTo(x, y);
      }
      ctx2d.lineTo(w, h); ctx2d.lineTo(0, h); ctx2d.closePath();
      const g2 = ctx2d.createLinearGradient(0, h*0.72, 0, h);
      g2.addColorStop(0, `rgba(${r},${g},${b},0.18)`);
      g2.addColorStop(1, `rgba(${bgRgb.r},${bgRgb.g},${bgRgb.b},0.7)`);
      ctx2d.fillStyle = g2;
      ctx2d.fill();

      // Wave 3
      ctx2d.beginPath();
      ctx2d.moveTo(0, h * 0.86);
      for (let x = 0; x <= w; x += 4) {
        const y = h * 0.86 + Math.sin(x * 0.01 + t * 0.8) * 14 + Math.sin(x * 0.02 - t * 0.4) * 6;
        ctx2d.lineTo(x, y);
      }
      ctx2d.lineTo(w, h); ctx2d.lineTo(0, h); ctx2d.closePath();
      const g3 = ctx2d.createLinearGradient(0, h*0.8, 0, h);
      g3.addColorStop(0, `rgba(${r},${g},${b},0.1)`);
      g3.addColorStop(1, `rgba(${bgRgb.r},${bgRgb.g},${bgRgb.b},0.6)`);
      ctx2d.fillStyle = g3;
      ctx2d.fill();

      t += 0.012;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [accentRgb, bgRgb]);

  const isSpace  = theme.id === 'cosmos' || theme.id === 'black';
  const isSakura = theme.id === 'sakura';
  const isForest = theme.id === 'forest' || theme.id === 'summer';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 transition-all duration-700">
      {/* Base gradient */}
      <div className="absolute inset-0 transition-all duration-700"
        style={{
          background: `linear-gradient(160deg, ${theme.bgFrom} 0%, ${theme.bgMid} 45%, ${theme.bgTo} 100%)`,
        }}
      />

      {/* Glow orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-15 transition-all duration-700"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`, top: '-8%', left: '-3%' }}
      />
      <div className="absolute w-[350px] h-[350px] rounded-full opacity-10 transition-all duration-700"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`, bottom: '25%', right: '8%' }}
      />

      {/* Theme-specific particle effects */}
      {isSpace  && <Stars count={theme.id === 'black' ? 120 : 80} />}
      {isSakura && <Petals />}
      {isForest && <Leaves color={theme.accentColor} />}

      {/* Canvas waves */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full transition-opacity duration-500" />

      {/* Bubble particles */}
      {!isSpace && BUBBLES.map(b => (
        <div key={b.id} className="absolute rounded-full pointer-events-none bubble-particle"
          style={{
            left: b.left, bottom: '-5%',
            width: b.size, height: b.size,
            background: `radial-gradient(circle, ${accentColor}50 0%, ${accentColor}08 70%)`,
            border: `1px solid ${accentColor}30`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}

      {/* Neon scanlines */}
      {theme.id === 'neon' && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 3px)', backgroundSize: '100% 3px' }}
        />
      )}
    </div>
  );
}
