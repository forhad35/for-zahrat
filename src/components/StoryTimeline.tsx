import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircleHeart, Moon, Heart, Stars } from 'lucide-react';

interface TimelineStep {
  day: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

const steps: TimelineStep[] = [
  {
    day: "Day 1",
    tag: "Where It All Began",
    title: "A Sweet Connection 💬",
    description: "Two people crossing paths on a random day. What started as a simple conversation quietly turned into something so treasured.",
    icon: <MessageCircleHeart className="w-5 h-5 text-rose-500" />,
  },
  {
    day: "Day 20",
    tag: "Everyday Warmth",
    title: "Late Night Talks & Smiles ✨",
    description: "Time flying by without noticing. Random chats turning into my favorite notifications, and your texts bringing instant comfort.",
    icon: <Moon className="w-5 h-5 text-indigo-500" />,
  },
  {
    day: "Day 45",
    tag: "Finding Peace",
    title: "My Calm Escape 🕊️",
    description: "In the middle of busy, tiring days, talking to you became the place where everything feels calm, gentle, and effortless.",
    icon: <Stars className="w-5 h-5 text-pink-500" />,
  },
  {
    day: "Day 60",
    tag: "Today & Beyond",
    title: "You Are My Happiness ❤️",
    description: "Two whole months of smiles, warmth, and memories. Genuinely thanking the universe for bringing you into my life, Zahrat.",
    icon: <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />,
  },
];

export const StoryTimeline: React.FC = () => {
  return (
    <section className="w-full max-w-3xl mx-auto my-16 px-4 relative z-10">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm border border-rose-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Scroll Down Memory Lane</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif-title text-3xl sm:text-4xl font-bold text-slate-800"
        >
          Our 60-Day Story Trail 🌸
        </motion.h2>

        <p className="text-slate-500 text-sm sm:text-base mt-2">
          The quiet little moments that led to today
        </p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-rose-200/80 space-y-10 sm:space-y-12 ml-4 sm:ml-8">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative group"
          >
            {/* Glowing Icon Dot on the timeline */}
            <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-rose-400 shadow-md flex items-center justify-center transition-transform group-hover:scale-115">
              {step.icon}
            </div>

            {/* Content Card */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-white/90 shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-serif-title text-base sm:text-lg font-bold text-rose-600">
                  {step.day}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                  {step.tag}
                </span>
              </div>

              <h3 className="font-serif-title text-lg sm:text-xl font-bold text-slate-800 mb-1.5">
                {step.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
