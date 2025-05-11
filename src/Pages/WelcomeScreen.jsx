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
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 blur-3xl"
      animate={{
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div 
      className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-purple-600/20 blur-2xl"
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }}
    />
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer1 = setTimeout(() => setShowContent(true), 300);
    const timer2 = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => onLoadingComplete?.(), 1000);
    }, 2000);

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
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        when: "afterChildren"
      }
    }
  };

  const textVariants = {
    hidden: { 
      y: 40,
      opacity: 0,
      filter: 'blur(5px)'
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      y: -40,
      opacity: 0,
      filter: 'blur(5px)',
      transition: {
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#050017] overflow-hidden flex items-center justify-center font-poppins"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          {showContent && (
            <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
              {/* Main Glow Container */}
              <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-glow-pulse" />
              
              {/* Text Container */}
              <motion.div
                className="text-center mb-6 sm:mb-8 md:mb-12 relative"
                variants={textVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  <div className="mb-2 sm:mb-4 relative">
                    {/* White "Welcome to" with glow */}
                    <div className="relative inline-block">
                      <div className="absolute -inset-1 bg-white/20 rounded-full blur-md" />
                      <TypewriterEffect 
                        text="Welcome to" 
                        className="text-white font-medium tracking-wider"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-center space-x-[2px]">
                    <div className="relative inline-block group">
                      <span className="relative inline-block px-[2px] bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                        TENEBRIS
                      </span>
                    </div>
                    <div className="relative inline-block group">
                      <span className="relative inline-block px-[2px] bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                        HUB
                      </span>
                    </div>
                  </div>
                </h1>
              </motion.div>

              {/* Loading Bar with Glow */}
              <motion.div
                className="flex justify-center relative group"
                variants={textVariants}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1900, ease: "linear" }}
                    />
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
