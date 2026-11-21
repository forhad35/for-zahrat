import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/content';

export const CardsSection: React.FC = () => {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setOpenCard(openCard === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const cardVariants: any = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-14 px-4 relative z-10">
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm border border-rose-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Little Moments That Mean The World</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif-title text-3xl sm:text-4xl font-bold text-slate-800"
        >
          Things That Make You So Special 🌸
        </motion.h2>

        <p className="text-slate-500 text-sm sm:text-base mt-2">
          Tap each card below to reveal a heartfelt thought
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
      >
        {siteConfig.cards.map((card) => {
          const isOpen = openCard === card.id;

          return (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleCard(card.id)}
              className="glass-card rounded-3xl p-6 sm:p-7 cursor-pointer relative overflow-hidden transition-shadow duration-300 border-2 border-white/80 shadow-lg hover:shadow-2xl"
            >
              {/* Dynamic Gradient wash */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} transition-opacity duration-500 ${
                  isOpen ? 'opacity-100' : 'opacity-25'
                }`}
              ></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl select-none inline-block animate-float-slow">
                      {card.emoji}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-rose-600 shadow-sm border border-rose-100">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                    {card.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {card.message}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-rose-200/60 flex items-center justify-between text-xs font-semibold text-rose-600">
                  <span className="flex items-center gap-1">
                    {isOpen ? 'Tap to close' : 'Tap to cherish'}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                  <Heart
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? 'fill-rose-500 text-rose-500 scale-125 animate-pulse' : 'text-rose-400'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
