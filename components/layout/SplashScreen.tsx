'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/data/profile';

// Module-level flag prevents Strict Mode double-invocation from re-triggering
let splashHandled = false;

export function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Already handled in this JS session (covers Strict Mode re-run + page navigation)
    if (splashHandled) {
      // Attribute may still be set from the inline script — clear it
      document.documentElement.removeAttribute('data-splash');
      return;
    }
    splashHandled = true;

    // Already shown in this browser tab session
    try {
      if (sessionStorage.getItem('splash-done')) {
        document.documentElement.removeAttribute('data-splash');
        return;
      }
      sessionStorage.setItem('splash-done', '1');
    } catch {
      document.documentElement.removeAttribute('data-splash');
      return;
    }

    setVisible(true);
    // No cleanup return — intentional so Strict Mode doesn't cancel the timer
    setTimeout(() => setVisible(false), 2800);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => {
      document.documentElement.removeAttribute('data-splash');
    }}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.75, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] bg-neutral-950 flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Dot-grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute w-[480px] h-[480px] rounded-full blur-[130px]"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)' }}
          />

          {/* Name */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="font-signature text-7xl sm:text-8xl text-white leading-none"
            >
              {profile.name}
              <motion.span
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.3, ease: 'backOut' }}
                className="text-amber-400"
              >
                .
              </motion.span>
            </motion.h1>
          </div>

          {/* Role */}
          <div className="overflow-hidden mt-3 mb-10">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="text-neutral-500 text-xs tracking-[0.25em] uppercase font-medium"
            >
              {profile.role.en}
            </motion.p>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="w-40 h-px bg-white/8 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 2.0, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-amber-400/60 to-amber-300 origin-left rounded-full"
            />
          </motion.div>

          {/* Year tag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute bottom-8 text-[10px] text-neutral-700 tracking-widest uppercase"
          >
            Portfolio {new Date().getFullYear()}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
