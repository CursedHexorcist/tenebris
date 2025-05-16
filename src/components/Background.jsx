import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const blobCount = 12;

  // Posisi tengah acak untuk blob (menyebar ke seluruh layar)
  const generateCenters = () =>
    Array.from({ length: blobCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));

  const centerPositions = useRef(generateCenters());

  useEffect(() => {
    let frameId;
    let startTime = performance.now();

    const animate = (time) => {
      const elapsed = (time - startTime) / 1000;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;

        const center = centerPositions.current[index];
        const radius = 30 + (index % 3) * 20;
        const speed = 0.4 + (index % 5) * 0.15;

        const x =
          center.x +
          Math.cos(elapsed * speed + index) * radius;
        const y =
          center.y +
          Math.sin(elapsed * speed + index) * radius;

        const scale =
          0.9 + 0.3 * Math.sin(elapsed * 1.3 + index);
        const opacity =
          0.4 + 0.25 * Math.cos(elapsed * 1.1 + index);

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
    "from-blue-400 to-cyan-400",
    "from-rose-400 to-pink-500",
    "from-emerald-400 to-teal-400",
    "from-indigo-400 to-violet-500",
    "from-yellow-300 to-orange-400",
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {Array.from({ length: blobCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (blobRefs.current[i] = el)}
          className={`absolute w-36 h-36 bg-gradient-to-br ${
            blobGradients[i % blobGradients.length]
          } rounded-full blur-xl mix-blend-lighten transition-transform duration-700 ease-in-out`}
          style={{
            top: 0,
            left: 0,
            opacity: 0.5,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Chill dark gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default AnimatedBackground;
