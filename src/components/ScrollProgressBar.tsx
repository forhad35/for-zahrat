import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-50 pointer-events-none bg-rose-100/50">
      <motion.div
        className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 origin-left shadow-sm shadow-rose-400"
        style={{ scaleX }}
      />
    </div>
  );
};
