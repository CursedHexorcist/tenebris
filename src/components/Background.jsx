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
    let frameId;
    let startTime = performance.now();

    const animate = (time) => {
      const elapsed = (time - startTime) / 1000; // detik

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;

        const initialPos = initialPositions[index];

        // Kurangi pergerakan supaya lebih halus dan ringan
        const xOffset = Math.sin(elapsed + index * 1.5) * 60;
        const yOffset = Math.cos(elapsed + index * 1.5) * 15;

        // Skala lebih kecil denyutannya
        const scale = 1 + 0.07 * Math.sin(elapsed * 2 + index);

        // Rotasi kecil supaya tetap ada efek tapi ringan
        const rotation = 5 * Math.sin(elapsed + index);

        // Gabungkan transformasi tanpa transition (langsung)
        blob.style.transform = `
          translate(${initialPos.x + xOffset}px, ${initialPos.y + yOffset}px)
          scale(${scale})
          rotate(${rotation}deg)
        `;

        // Hilangkan transition agar animasi lebih ringan
        blob.style.transition = "none";
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0">
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute top-0 -left-4 md:w-72 md:h-72 w-56 h-56 bg-purple-900 rounded-full mix-blend-multiply filter blur-[64px] opacity-90 md:opacity-80"
        />
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-0 -right-4 md:w-72 md:h-72 w-56 h-56 bg-cyan-900 rounded-full mix-blend-multiply filter blur-[64px] opacity-90 md:opacity-80 hidden sm:block"
        />
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute -bottom-8 left-[-40%] md:left-20 md:w-72 md:h-72 w-56 h-56 bg-blue-900 rounded-full mix-blend-multiply filter blur-[64px] opacity-90 md:opacity-80"
        />
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute -bottom-10 right-20 md:w-72 md:h-72 w-56 h-56 bg-pink-900 rounded-full mix-blend-multiply filter blur-[48px] opacity-75 md:opacity-60 hidden sm:block"
        />
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#000000cc_1px,transparent_1px),linear-gradient(to_bottom,#000000cc_1px,transparent_1px)] bg-[size:32px_32px] opacity-90"
        style={{
          filter: "blur(6px)",
          zIndex: 1,
        }}
      />

      {/* Glassmorphism & neon glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(8px)",
          zIndex: 2,
        }}
      />

      {/* Neon shadow */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "0 0 30px 8px rgba(0, 255, 255, 0.4), 0 0 30px 8px rgba(255, 0, 255, 0.4)",
          zIndex: 3,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
