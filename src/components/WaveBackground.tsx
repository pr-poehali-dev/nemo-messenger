import { useEffect, useRef } from 'react';

const BUBBLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 7) % 90}%`,
  width: `${8 + (i * 11) % 20}px`,
  height: `${8 + (i * 11) % 20}px`,
  delay: `${(i * 1.3) % 8}s`,
  duration: `${7 + (i * 2.1) % 9}s`,
}));

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const h = canvas.height;
      const w = canvas.width;

      // Wave 1 — deep blue
      ctx.beginPath();
      ctx.moveTo(0, h * 0.72);
      for (let x = 0; x <= w; x += 4) {
        const y = h * 0.72 + Math.sin(x * 0.005 + t * 0.6) * 28 + Math.sin(x * 0.012 + t * 0.3) * 14;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const g1 = ctx.createLinearGradient(0, h * 0.65, 0, h);
      g1.addColorStop(0, 'rgba(21, 101, 192, 0.35)');
      g1.addColorStop(1, 'rgba(2, 11, 24, 0.8)');
      ctx.fillStyle = g1;
      ctx.fill();

      // Wave 2 — cyan
      ctx.beginPath();
      ctx.moveTo(0, h * 0.78);
      for (let x = 0; x <= w; x += 4) {
        const y = h * 0.78 + Math.sin(x * 0.008 - t * 0.45) * 22 + Math.cos(x * 0.015 + t * 0.25) * 10;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const g2 = ctx.createLinearGradient(0, h * 0.72, 0, h);
      g2.addColorStop(0, 'rgba(0, 180, 216, 0.22)');
      g2.addColorStop(1, 'rgba(4, 20, 40, 0.7)');
      ctx.fillStyle = g2;
      ctx.fill();

      // Wave 3 — foam
      ctx.beginPath();
      ctx.moveTo(0, h * 0.85);
      for (let x = 0; x <= w; x += 4) {
        const y = h * 0.85 + Math.sin(x * 0.01 + t * 0.8) * 15 + Math.sin(x * 0.02 - t * 0.4) * 7;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const g3 = ctx.createLinearGradient(0, h * 0.8, 0, h);
      g3.addColorStop(0, 'rgba(144, 224, 239, 0.12)');
      g3.addColorStop(1, 'rgba(4, 20, 40, 0.6)');
      ctx.fillStyle = g3;
      ctx.fill();

      t += 0.012;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Depth gradient */}
      <div className="absolute inset-0 depth-gradient" />

      {/* Radial glow spots */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #1565c0 0%, transparent 70%)',
          top: '-10%',
          left: '-5%',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #00b4d8 0%, transparent 70%)',
          bottom: '20%',
          right: '10%',
        }}
      />

      {/* Canvas waves */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Bubble particles */}
      {BUBBLES.map(b => (
        <div
          key={b.id}
          className="bubble-particle"
          style={{
            left: b.left,
            bottom: '-10%',
            width: b.width,
            height: b.height,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}
    </div>
  );
}
