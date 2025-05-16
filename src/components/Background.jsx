import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const centerPositions = [
    { x: 150, y: 150 },
    { x: 400, y: 250 },
    { x: 200, y: 450 },
    { x: 450, y: 350 },
  ];

  useEffect(() => {
    let frameId;
    let startTime = performance.now();

    const animate = (time) => {
      const elapsed = (time - startTime) / 1000;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;

        const center = centerPositions[index];
        const radius = 50 + index * 15;
        const speed = 0.4 + index * 0.3;

        const x = center.x + Math.cos(elapsed * speed + index) * radius;
        const y = center.y + Math.sin(elapsed * speed + index) * radius;
        const scale = 0.9 + 0.3 * Math.sin(elapsed * 1.5 + index);
        const opacity = 0.4 + 0.25 * Math.cos(elapsed * 1.2 + index);

        blob.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        blob.style.opacity = opacity;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const blobGradients = [
    "from-purple-400 to-pink-400",
    "from-cyan-400 to-blue-500",
    "from-pink-400 to-rose-400",
    "from-indigo-400 to-purple-500",
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {blobGradients.map((gradient, i) => (
        <div
          key={i}
          ref={(el) => (blobRefs.current[i] = el)}
          className={`absolute w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-3xl mix-blend-lighten transition-transform duration-700 ease-in-out`}
          style={{
            top: 0,
            left: 0,
            opacity: 0.5,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Overlay dengan gradient gelap lembut */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default AnimatedBackground;
