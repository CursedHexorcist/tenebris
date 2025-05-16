import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const centerPositions = [
    { x: 100, y: 100 },
    { x: 300, y: 200 },
    { x: 150, y: 400 },
    { x: 350, y: 350 },
  ];

  useEffect(() => {
    let frameId;
    let startTime = performance.now();

    const animate = (time) => {
      const elapsed = (time - startTime) / 1000; // detik

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;

        const center = centerPositions[index];

        // Gerakan lingkaran dengan radius kecil
        const radius = 40 + index * 10;
        const speed = 0.6 + index * 0.2;

        const x = center.x + Math.cos(elapsed * speed + index) * radius;
        const y = center.y + Math.sin(elapsed * speed + index) * radius;

        // Ukuran berganti-ganti antara 0.8 - 1.2
        const scale = 0.8 + 0.4 * (0.5 + 0.5 * Math.sin(elapsed * 2 + index));

        // Opacity berubah halus antara 0.5 - 0.85
        const opacity = 0.5 + 0.35 * (0.5 + 0.5 * Math.cos(elapsed * 1.5 + index));

        blob.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        blob.style.opacity = opacity;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const blobColors = [
    "bg-purple-500",
    "bg-cyan-400",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {blobColors.map((color, i) => (
        <div
          key={i}
          ref={(el) => (blobRefs.current[i] = el)}
          className={`${color} absolute rounded-full mix-blend-screen filter blur-[48px]`}
          style={{
            width: 160,
            height: 160,
            top: 0,
            left: 0,
            opacity: 0.6,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Background overlay to darken screen */}
      <div
        className="absolute inset-0 bg-black opacity-70"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default AnimatedBackground;
