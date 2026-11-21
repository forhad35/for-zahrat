import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
  opacity: number;
}

export const FloatingPetals: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const symbols = ['🌸', '✨', '💖', '🌷', '🤍', '🌸', '💫'];
    const generated: Particle[] = Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of screen width
      size: Math.random() * 16 + 14,
      duration: Math.random() * 8 + 8, // 8s to 16s
      delay: Math.random() * 8,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${p.x}%`,
            top: '-50px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `fallSway ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.symbol}
        </span>
      ))}
      <style>{`
        @keyframes fallSway {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
          }
          33% {
            transform: translateY(35vh) translateX(30px) rotate(120deg);
          }
          66% {
            transform: translateY(70vh) translateX(-25px) rotate(240deg);
          }
          100% {
            transform: translateY(110vh) translateX(15px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
