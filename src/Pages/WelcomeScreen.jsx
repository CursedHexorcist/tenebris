import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css'; // For extra effects (explained below)

const NeonText = ({ text }) => {
  return (
    <div className="neon-text">
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: idx * 0.05,
            duration: 0.5,
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

const WelcomeScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 4000); // screen duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0c1e] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background Glow Layer */}
          <motion.div
            className="absolute w-[200%] h-[200%] bg-gradient-radial from-purple-700/30 via-indigo-900/20 to-black blur-3xl animate-bg-float"
            style={{ zIndex: 0 }}
          />

          {/* Glass Card */}
          <motion.div
            className="relative px-10 py-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ zIndex: 2 }}
          >
            <NeonText text="TENEBRIS HUB" />
            <p className="text-white/60 text-center mt-4 tracking-wide text-sm">loading... please wait</p>

            {/* Loading Bar */}
            <motion.div
              className="mt-6 h-1 w-56 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.2, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
