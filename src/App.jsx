import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Creations from "./Pages/Creations";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import CustomCursor from "./components/CustomCursor";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <div className="cursor-none"> {/* Added container div */}
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Creations />
          <ContactPage />
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © 2025{" "}
                <a href="https://flowbite.com/" className="hover:underline">
                  TENEBRIS HUB
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </div>
  );
};

const ProjectPageLayout = () => (
  <div className="cursor-none"> {/* Added container div */}
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            TENEBRIS HUB
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </div>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    setIsTouchDevice(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );
    
    // Add class to HTML element for global cursor control
    document.documentElement.classList.add('custom-cursor-active');
    
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Only show custom cursor on non-touch devices */}
      {!isTouchDevice && <CustomCursor />}
      
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              showWelcome={showWelcome} 
              setShowWelcome={setShowWelcome} 
            />
          } 
        />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
