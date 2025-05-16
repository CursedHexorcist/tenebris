import React, { useEffect, useRef } from "react";

const CloudSmoke = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const cloudCount = 30; // jumlah awan partikel
    const clouds = [];

    // Buat partikel awan dengan posisi acak, ukuran, alpha, dan kecepatan perlahan
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 80 + Math.random() * 120,
        speedX: (Math.random() - 0.5) * 0.03,
        speedY: (Math.random() - 0.3) * 0.01,
        alpha: 0.06 + Math.random() * 0.08,
      });
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    let animationFrameId;

    const drawCloud = (c) => {
      const gradient = ctx.createRadialGradient(
        c.x,
        c.y,
        c.radius * 0.4,
        c.x,
        c.y,
        c.radius
      );
      gradient.addColorStop(0, `rgba(220,220,230,${c.alpha})`);
      gradient.addColorStop(1, `rgba(220,220,230,0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      clouds.forEach((c) => {
        drawCloud(c);

        // update posisi perlahan, loop kalau keluar layar
        c.x += c.speedX;
        c.y += c.speedY;

        if (c.x - c.radius > width) c.x = -c.radius;
        else if (c.x + c.radius < 0) c.x = width + c.radius;

        if (c.y - c.radius > height) c.y = -c.radius;
        else if (c.y + c.radius < 0) c.y = height + c.radius;
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
      style={{ width: "100%", height: "100%", background: "#101024" }}
    />
  );
};

export default CloudSmoke;
