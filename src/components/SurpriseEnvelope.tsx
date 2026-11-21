import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, Send } from 'lucide-react';
import { siteConfig } from '../data/content';
import { musicPlayer } from '../utils/audio';

interface Props {
  onOpen: () => void;
}

export const SurpriseEnvelope: React.FC<Props> = ({ onOpen }) => {
  const [isOpenStage, setIsOpenStage] = useState<'closed' | 'opening' | 'opened'>('closed');

  const handleOpen = () => {
    if (isOpenStage !== 'closed') return;
    setIsOpenStage('opening');

    // Auto-start music
    try {
      musicPlayer.init();
      musicPlayer.start();
    } catch {
      // browser policy
    }

    // Burst confetti multiple times
    const triggerConfetti = () => {
      const count = 180;
      const defaults = {
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#fbcfe8', '#ffe4e6', '#ffd1dc'],
      };

      confetti({
        ...defaults,
        particleCount: count * 0.4,
        spread: 40,
        startVelocity: 55,
      });
      confetti({
        ...defaults,
        particleCount: count * 0.35,
        spread: 90,
      });
      confetti({
        ...defaults,
        particleCount: count * 0.25,
        spread: 120,
        startVelocity: 35,
      });
    };

    triggerConfetti();

    // After animation sequence, reveal main site
    setTimeout(() => {
      setIsOpenStage('opened');
      onOpen();
    }, 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-rose-100/95 via-pink-100/90 to-purple-100/95 backdrop-blur-xl overflow-hidden"
    >
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-300/40 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-300/40 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <motion.div
        animate={
          isOpenStage === 'opening'
            ? { scale: [1, 1.08, 0.9], y: -20, opacity: [1, 1, 0] }
            : { scale: 1, y: 0, opacity: 1 }
        }
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        className="relative w-full max-w-md mx-auto"
      >
        {/* Glow border wrapper */}
        <div className="relative glass-card rounded-3xl p-8 sm:p-10 text-center border-2 border-white shadow-2xl overflow-hidden">
          {/* Floating flower accents */}
          <motion.span
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-3 -left-3 text-3xl select-none"
          >
            🌸
          </motion.span>
          <motion.span
            animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, delay: 2 }}
            className="absolute -bottom-3 -right-3 text-3xl select-none"
          >
            🌸
          </motion.span>

          {/* Envelope Icon with Flap animation */}
          <motion.div
            whileHover={{ scale: 1.06, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="relative cursor-pointer mx-auto w-24 h-24 mb-6 rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 p-0.5 shadow-xl shadow-rose-300/60 group"
          >
            <div className="w-full h-full bg-white/90 rounded-[22px] flex items-center justify-center relative overflow-hidden">
              <Mail className="w-12 h-12 text-rose-500 group-hover:scale-110 transition-transform" />
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-2 right-2 text-rose-500"
              >
                <Heart className="w-4 h-4 fill-rose-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Delivery Tag */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold tracking-wider uppercase mb-3 border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Special Delivery for Zahrat</span>
          </div>

          <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
            Open Your Surprise 🌸
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xs mx-auto">
            Today marks exactly <span className="font-semibold text-rose-600">60 Days</span> since we connected. Tap below to unveil what's inside.
          </p>

          <button
            onClick={handleOpen}
            className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-1 shadow-lg shadow-rose-400/40 hover:shadow-rose-400/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-[14px] bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-base sm:text-lg">
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin-slow" />
              <span>Tap to Open Letter</span>
              <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
            </div>
          </button>

          <p className="font-handwriting text-rose-500 text-lg mt-5 tracking-wide">
            Turn your volume up for a sweet melody 🎵✨
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
