import React, { useEffect, useRef } from "react";

const AuroraParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particlesCount = 100;
    const particles = [];

    // Membuat partikel dengan posisi, ukuran, kecepatan acak
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 40,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.1,
        hue: 150 + Math.random() * 100, // hijau ke cyan ke biru
        alpha: 0.1 + Math.random() * 0.3,
        blur: 15 + Math.random() * 20,
      });
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    let animationFrameId;

    const drawParticle = (p) => {
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        p.size * 0.1,
        p.x,
        p.y,
        p.size
      );
      gradient.addColorStop(0, `hsla(${p.hue}, 90%, 80%, ${p.alpha})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 90%, 50%, 0)`);

      ctx.fillStyle = gradient;
      ctx.shadowColor = `hsla(${p.hue}, 90%, 80%, ${p.alpha})`;
      ctx.shadowBlur = p.blur;

      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.size * 0.6, p.size * 0.9, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        drawParticle(p);

        // update posisi partikel perlahan dengan arah acak
        p.x += p.speedX;
        p.y += p.speedY;

        // Loop partikel jika keluar layar, pindah ke sisi lain
        if (p.x > width + p.size) p.x = -p.size;
        else if (p.x < -p.size) p.x = width + p.size;
        if (p.y > height + p.size) p.y = -p.size;
        else if (p.y < -p.size) p.y = height + p.size;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%", background: "#0f0f23" }}
    />
  );
};

export default AuroraParticles;
