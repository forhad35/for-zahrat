import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Check } from 'lucide-react';
import { siteConfig } from '../data/content';

export const LetterSection: React.FC = () => {
  const { letter } = siteConfig;
  
  const fullText = letter.paragraphs.join('\n\n');
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger ONLY when the letter section is actually scrolled into view!
  const isInView = useInView(containerRef, { once: true, amount: 0.35 });

  useEffect(() => {
    if (isInView && !hasStarted) {
      // Small pause (400ms) after scrolling into view so she can see the typing start before her eyes
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, 400);
      return () => clearTimeout(startTimer);
    }
  }, [isInView, hasStarted]);

  useEffect(() => {
    if (!hasStarted || !isTyping) return;

    if (displayedLength < fullText.length) {
      const char = fullText[displayedLength];
      let delay = 28;
      if (char === '.' || char === '!' || char === '?') delay = 320;
      else if (char === ',') delay = 150;
      else if (char === '\n') delay = 250;

      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [displayedLength, hasStarted, isTyping, fullText]);

  const handleSkipOrComplete = () => {
    setDisplayedLength(fullText.length);
    setIsTyping(false);
  };

  const handleRestart = () => {
    setDisplayedLength(0);
    setIsTyping(true);
    setHasStarted(true);
  };

  const currentTypedText = fullText.slice(0, displayedLength);
  const currentParagraphs = currentTypedText.split('\n\n');

  return (
    <section ref={containerRef} className="w-full max-w-2xl mx-auto my-12 px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative glass-card rounded-3xl p-7 sm:p-12 shadow-2xl border-2 border-white/90 overflow-hidden backdrop-blur-xl"
      >
        {/* Animated glowing decorative aura */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-rose-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-pink-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-rose-200/60 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="font-handwriting text-rose-600 text-2xl font-bold tracking-wide">
              A Letter Written Just For You
            </span>
          </div>

          {/* Quick controls: Show all / Replay */}
          <div className="flex items-center gap-2">
            {isTyping && hasStarted ? (
              <button
                onClick={handleSkipOrComplete}
                className="text-xs px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors flex items-center gap-1 font-medium"
                title="Show all text immediately"
              >
                <Check className="w-3 h-3" />
                <span>Show All</span>
              </button>
            ) : (
              <button
                onClick={handleRestart}
                className="text-xs px-2.5 py-1 rounded-full bg-rose-100/70 text-rose-600 hover:bg-rose-200 transition-colors flex items-center gap-1 font-medium"
                title="Replay typing effect"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Replay</span>
              </button>
            )}
          </div>
        </div>

        {/* Greeting with animated bounce */}
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-800 mb-6 flex items-center gap-2"
        >
          <span>{letter.greeting}</span>
          <span className="inline-block animate-bounce text-rose-500">🌸</span>
        </motion.h2>

        {/* Dynamic Typewriter Body */}
        <div className="space-y-4 text-slate-700 leading-relaxed text-base sm:text-lg min-h-[160px]">
          {hasStarted ? (
            currentParagraphs.map((para, idx) => {
              const isLastRendered = idx === currentParagraphs.length - 1;
              const isFinalOriginalParagraph = idx === letter.paragraphs.length - 1;

              return (
                <p
                  key={idx}
                  className={`transition-all duration-300 ${
                    isFinalOriginalParagraph
                      ? 'font-medium text-rose-700 text-lg sm:text-xl py-1'
                      : 'font-light'
                  }`}
                >
                  {para}
                  {isTyping && isLastRendered && (
                    <span className="inline-block w-2 h-5 ml-1 bg-rose-500 animate-pulse rounded-full align-middle"></span>
                  )}
                </p>
              );
            })
          ) : (
            /* Waiting state before scrolling into view */
            <p className="text-slate-400 italic text-sm flex items-center gap-2">
              <span className="inline-block w-2 h-4 bg-rose-400 animate-pulse rounded-full"></span>
              <span>Writing with love...</span>
            </p>
          )}
        </div>

        {/* Closing & Signature (fades in smoothly when done typing) */}
        <motion.div
          animate={{ opacity: !isTyping && hasStarted ? 1 : 0.4, y: !isTyping && hasStarted ? 0 : 5 }}
          transition={{ duration: 0.6 }}
          className="mt-8 pt-6 border-t border-rose-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 font-bold tracking-wide">
              {letter.closing}
            </p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-rose-400" />
              <span>{letter.signature}</span>
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-xs font-semibold shadow-sm border border-rose-200/50">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            <span>Forever Special To Me</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
