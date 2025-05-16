import React, { useEffect, useRef } from "react";

const AuroraBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const waves = Array.from({ length: 5 }).map((_, i) => ({
      amplitude: 30 + i * 15,
      wavelength: 200 + i * 50,
      speed: 0.2 + i * 0.05,
      phase: i * Math.PI * 0.5,
      color: `hsla(${180 + i * 30}, 70%, 70%, 0.07)`,
    }));

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    let animationFrameId;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = (time - startTime) / 1000;

      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const y =
            height / 2 +
            Math.sin(x / wave.wavelength + elapsed * wave.speed + wave.phase) *
              wave.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 150;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default AuroraBackground;
