import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { FloatingPetals } from './components/FloatingPetals';
import { MusicButton } from './components/MusicButton';
import { SurpriseEnvelope } from './components/SurpriseEnvelope';
import { TimeCounter } from './components/TimeCounter';
import { LetterSection } from './components/LetterSection';
import { CardsSection } from './components/CardsSection';
import { StoryTimeline } from './components/StoryTimeline';
import { ClickHeartSparks } from './components/ClickHeartSparks';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { siteConfig } from './data/content';
import { Heart, Sparkles, Stars, ChevronDown } from 'lucide-react';

export const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize buttery-smooth Lenis scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  // Scroll parallax for Hero section
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <div className="relative min-h-screen text-slate-800 font-sans pb-24 overflow-x-hidden selection:bg-rose-200">
      {/* Scroll Progress Bar at the top */}
      {isOpened && <ScrollProgressBar />}

      {/* Interactive Heart Sparks on Click/Tap */}
      <ClickHeartSparks />

      {/* Floating Petals / Hearts Background */}
      <FloatingPetals />

      {/* Floating Music Control */}
      <MusicButton />

      {/* Initial Envelope Reveal Overlay */}
      <AnimatePresence>
        {!isOpened && (
          <SurpriseEnvelope onOpen={() => setIsOpened(true)} />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
        {/* Parallax Hero Header */}
        <header ref={heroRef} className="pt-20 sm:pt-28 pb-8 px-4 text-center max-w-3xl mx-auto relative z-10">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isOpened ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 shadow-sm border border-rose-200/80"
            >
              <Sparkles className="w-4 h-4 text-rose-500 animate-spin-slow" />
              <span>Celebrating 2 Months Together</span>
              <Stars className="w-4 h-4 text-rose-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={isOpened ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif-title text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4"
            >
              Happy 2 Months,{' '}
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent">
                {siteConfig.recipientName}
              </span>{' '}
              <span className="inline-block animate-bounce">{siteConfig.flowerEmoji}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isOpened ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-slate-600 text-base sm:text-xl font-light max-w-xl mx-auto leading-relaxed"
            >
              {siteConfig.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isOpened ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center gap-2.5 mt-5 text-rose-600"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span className="font-handwriting text-2xl sm:text-3xl font-bold tracking-wide">
                "You are my happiness"
              </span>
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            </motion.div>

            {/* Scroll down prompt */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-10 flex flex-col items-center justify-center gap-1 text-slate-400 text-xs"
            >
              <span>Scroll to explore</span>
              <ChevronDown className="w-4 h-4 text-rose-400" />
            </motion.div>
          </motion.div>
        </header>

        {/* Live Counter with Pulsing Heartbeat */}
        <TimeCounter />

        {/* The Heartfelt Letter with Dynamic Typewriter Effect */}
        <LetterSection />

        {/* Scroll Story Timeline */}
        <StoryTimeline />

        {/* Sweet Compliment & Thought Cards */}
        <CardsSection />

        {/* Re-wrap envelope button */}
        <div className="text-center mt-12 relative z-10">
          <button
            onClick={() => setIsOpened(false)}
            className="text-xs sm:text-sm text-rose-600/80 hover:text-rose-700 underline underline-offset-4 transition-colors font-medium"
          >
            Re-wrap & view gift envelope again 💌
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-slate-500 space-y-1 relative z-10">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            Handcrafted with <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline animate-pulse" /> specially for {siteConfig.recipientName}
          </p>
          <p className="opacity-75">
            60 Days of Smiles, Conversations & Beautiful Memories
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
