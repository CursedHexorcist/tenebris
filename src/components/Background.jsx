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

        // Posisi X dan Y berdasarkan gelombang sinusoidal
        const xOffset = Math.sin(elapsed + index * 1.5) * 150;
        const yOffset = Math.cos(elapsed + index * 1.5) * 40;

        // Skala yang berdenyut antara 0.85 sampai 1.15
        const scale = 1 + 0.15 * Math.sin(elapsed * 3 + index);

        // Rotasi perlahan antara -10 sampai 10 derajat
        const rotation = 10 * Math.sin(elapsed * 1.5 + index);

        // Gabungkan transformasi: translate + scale + rotate
        blob.style.transform = `
          translate(${initialPos.x + xOffset}px, ${initialPos.y + yOffset}px)
          scale(${scale})
          rotate(${rotation}deg)
        `;

        // Transisi halus
        blob.style.transition = "transform 0.2s ease-out";
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

      {/* Neon shadow */}
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
