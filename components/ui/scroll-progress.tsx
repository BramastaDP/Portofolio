'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"
      style={{ scaleX }}
    />
  );
}
