import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="relative inline-block text-white font-semibold text-xl sm:text-2xl md:text-3xl tracking-wide">
      {displayText}
      <motion.span
        className="inline-block ml-1 text-purple-400"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        ✨
      </motion.span>
    </div>
  );
};

const BackgroundParticles = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {[...Array(40)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full opacity-20"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{ y: ['0%', '100%'], opacity: [0.2, 0.5, 0.2] }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    const timeout = setTimeout(() => {
      setLoading(false);
      onLoadingComplete?.();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-[#0a0020] via-[#140034] to-[#1c003f] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.8 } }}
        >
          <BackgroundParticles />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-6"
          >
            <TypewriterEffect text="Welcome to" />

            <motion.h1
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 text-5xl sm:text-6xl font-extrabold tracking-widest"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
            >
              TENEBRIS HUB
            </motion.h1>

            <motion.div
              className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.div
                className="absolute h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white/10 blur"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
