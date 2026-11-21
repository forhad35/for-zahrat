import React, { useEffect, useState } from 'react';

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  symbol: string;
}

const symbols = ['💖', '🌸', '✨', '💕', '🌷', '🤍'];
const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#f472b6'];

export const ClickHeartSparks: React.FC = () => {
  const [hearts, setHearts] = useState<ClickHeart[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const count = Math.floor(Math.random() * 3) + 3; // 3 to 5 hearts
      const newHearts: ClickHeart[] = [];

      for (let i = 0; i < count; i++) {
        newHearts.push({
          id: Date.now() + Math.random(),
          x: clientX + (Math.random() * 40 - 20),
          y: clientY + (Math.random() * 40 - 20),
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.floor(Math.random() * 12) + 14,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }

      setHearts((prev) => [...prev, ...newHearts]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute select-none pointer-events-none animate-float-heart"
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
            fontSize: `${h.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {h.symbol}
        </span>
      ))}
      <style>{`
        @keyframes floatHeart {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 0.9;
            transform: translate(-50%, -90px) scale(1.2) rotate(15deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -140px) scale(1) rotate(-15deg);
          }
        }
        .animate-float-heart {
          animation: floatHeart 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
};
