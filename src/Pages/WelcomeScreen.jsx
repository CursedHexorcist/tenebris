import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Inisialisasi partikel
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  useEffect(() => {
    // Delay untuk animasi masuk
    setTimeout(() => setShowContent(true), 300);
    
    // Timer untuk loading selesai
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => onLoadingComplete?.(), 1000);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // Varians animasi premium
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

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#050017] overflow-hidden flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          {/* Partikel Background Premium */}
          <Particles
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              particles: {
                number: { value: 80 },
                color: { value: ["#4F46E5", "#EC4899", "#10B981"] },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                move: {
                  enable: true,
                  speed: 1,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out"
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#4F46E5",
                  opacity: 0.3,
                  width: 1
                }
              },
              interactivity: {
                events: {
                  onhover: { enable: true, mode: "repulse" }
                }
              }
            }}
          />

          {/* Konten Utama */}
          {showContent && (
            <div className="relative z-10 text-center px-4">
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
                variants={glowVariants}
              />
              
              {/* Teks Utama */}
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                variants={textVariants}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                  TENEBRIS
                </span>
              </motion.h1>
              
              <motion.h2 
                className="text-2xl md:text-4xl font-medium mb-8 text-gray-300"
                variants={textVariants}
              >
                Digital Experience Studio
              </motion.h2>
              
              {/* Animated Loader */}
              <motion.div
                className="flex justify-center"
                variants={textVariants}
              >
                <div className="relative w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
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
