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
    let requestId;
    let currentScroll = window.scrollY;

    const handleScroll = () => {
      currentScroll = window.scrollY;

      blobRefs.current.forEach((blob, index) => {
        const initialPos = initialPositions[index];
        const xOffset = Math.sin(currentScroll / 100 + index * 0.5) * 340;
        const yOffset = Math.cos(currentScroll / 100 + index * 0.5) * 40;

        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;

        if (blob) {
          blob.style.transform = `translate(${x}px, ${y}px)`;
          blob.style.transition = "transform 1.4s ease-out";
        }
      });

      requestId = requestAnimationFrame(handleScroll);
    };

    requestId = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(requestId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Blob layers */}
      <div className="absolute inset-0">
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-80 md:opacity-50"
        />
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-80 md:opacity-50 hidden sm:block"
        />
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-80 md:opacity-50"
        />
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-pink-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-60 md:opacity-40 hidden sm:block"
        />
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000099_1px,transparent_1px),linear-gradient(to_bottom,#00000099_1px,transparent_1px)] bg-[size:32px_32px] opacity-80"
        style={{
          filter: "blur(10px)",
          zIndex: 1,
        }}
      />

      {/* Glassmorphism & neon glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(12px)",
          zIndex: 2,
        }}
      />

      {/* Optional neon shadow layer */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "0 0 40px 10px rgba(0, 255, 255, 0.3), 0 0 40px 10px rgba(255, 0, 255, 0.3)",
          zIndex: 3,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
