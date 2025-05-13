import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TypewriterEffect = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-indigo-700/50 via-purple-700/30 to-pink-600/40 blur-2xl"
      animate={{
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </div>
);

const HoverButton = ({ children, className = "" }) => (
  <motion.button
    className={`py-2 px-4 text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-300 transform ${className}`}
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 5px 30px rgba(255, 255, 255, 0.2)",
      backgroundColor: "rgba(0,0,0,0.4)",
    }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </motion.button>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
    });

    const timer1 = setTimeout(() => setShowContent(true), 300);
    const timer2 = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => onLoadingComplete?.(), 1500);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onLoadingComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      }
    }
  };

  const textVariants = {
    hidden: { 
      y: 100,
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 25
      }
    },
    exit: {
      y: -100,
      opacity: 0,
      filter: 'blur(5px)',
      scale: 0.9,
      transition: {
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#0a0011] flex items-center justify-center text-white font-poppins"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          {showContent && (
            <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
              {/* Main Glowing Background */}
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/30 via-purple-600/20 to-pink-500/20 rounded-full blur-3xl animate-glow-pulse" />
              
              {/* Text Container */}
              <motion.div
                className="text-center mb-8 sm:mb-12 md:mb-16 relative"
                variants={textVariants}
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-widest">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="absolute inset-0 bg-white/25 rounded-lg blur-2xl" />
                    <TypewriterEffect 
                      text="Welcome to" 
                      className="text-white font-semibold tracking-wide text-shadow-xl"
                    />
                  </div>
                  <div className="mt-10 flex items-center justify-center space-x-2">
                    <div className="relative inline-block group">
                      <span className="relative inline-block px-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
                        TENEBRIS
                      </span>
                    </div>
                    <div className="relative inline-block group">
                      <span className="relative inline-block px-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
                        HUB
                      </span>
                    </div>
                  </div>
                </h1>
              </motion.div>

              {/* Premium Button */}
              <motion.div
                className="flex justify-center mt-6"
                variants={textVariants}
              >
                <HoverButton>Enter the Hub</HoverButton>
              </motion.div>

            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
