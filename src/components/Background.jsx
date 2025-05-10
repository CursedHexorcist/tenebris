import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ];

  useEffect(() => {
    let currentScroll = 0;
    let requestId;

    const handleScroll = () => {
      const newScroll = window.pageYOffset;
      const scrollDelta = newScroll - currentScroll;
      currentScroll = newScroll;

      blobRefs.current.forEach((blob, index) => {
        const initialPos = initialPositions[index];

        // Calculating movement in both X and Y direction
        const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340; // Horizontal movement
        const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40; // Vertical movement

        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;

        // Apply transformation with smooth transition
        blob.style.transform = `translate(${x}px, ${y}px)`;
        blob.style.transition = "transform 1.4s ease-out";
      });

      requestId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0">
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-80 md:opacity-50 "
        ></div>
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-80 md:opacity-50 hidden sm:block"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-80 md:opacity-50 "
        ></div>
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-pink-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-60 md:opacity-40 hidden sm:block"
        ></div>
      </div>

      {/* Super Dark Background with Neon-Like Glossy Effect */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000099_1px,transparent_1px),linear-gradient(to_bottom,#00000099_1px,transparent_1px)] bg-[size:32px_32px] opacity-80"
        style={{
          background: "linear-gradient(to right, #00000099 1px, transparent 1px), linear-gradient(to bottom, #00000099 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          filter: "blur(10px)", // Adding a stronger blur effect
        }}
      ></div>

      {/* Neon Glow Effect with Bright Contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.8)", // Darker transparency for overlay
          backdropFilter: "blur(12px)", // Glassmorphism effect with strong blur
          zIndex: 1,
        }}
      ></div>

      {/* Neon Lights for Cyberpunk Effect */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "0 0 30px 10px rgba(0, 255, 255, 0.8), 0 0 30px 10px rgba(255, 0, 255, 0.8)", // Neon blue and pink glow
          zIndex: 2,
        }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
