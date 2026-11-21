import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock } from 'lucide-react';
import { siteConfig } from '../data/content';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const TimeCounter: React.FC = () => {
  const [elapsed, setElapsed] = useState<TimeElapsed>({
    days: 60,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const start = new Date(siteConfig.startDate).getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsed({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBoxes = [
    { label: 'Days Together', value: elapsed.days },
    { label: 'Hours', value: elapsed.hours },
    { label: 'Minutes', value: elapsed.minutes },
    { label: 'Seconds', value: elapsed.seconds },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto my-8 px-4 relative z-10"
    >
      <div className="glass-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden border-2 border-white/90 shadow-xl">
        {/* Animated glowing bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 via-rose-500 to-purple-400 animate-pulse-slow"></div>

        <div className="flex items-center justify-center gap-2 text-rose-600 font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2">
          <Clock className="w-4 h-4 animate-spin-slow" />
          <span>Every Moment Since We Connected</span>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          </motion.div>
        </div>

        <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
          60 Days of Smiles & Counting... ✨
        </h3>

        {/* Counter Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 mb-6">
          {timeBoxes.map((box, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex flex-col items-center justify-center bg-white/80 rounded-2xl p-3 sm:p-4 border border-rose-100 shadow-sm relative overflow-hidden"
            >
              <span className="font-serif-title text-2xl sm:text-4xl font-extrabold text-rose-600 tabular-nums">
                {String(box.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider text-center">
                {box.label}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="font-handwriting text-slate-700 text-xl sm:text-2xl font-bold tracking-wide">
          "Two months of you bringing peace to my ordinary world." 🌸
        </p>
      </div>
    </motion.section>
  );
};
