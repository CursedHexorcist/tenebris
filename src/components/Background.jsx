import React, { useEffect, useRef } from "react";

const RealisticClouds = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Jumlah partikel awan yang besar dan sedikit
    const cloudsCount = 7;

    // Fungsi buat satu "blob" awan sebagai kumpulan lingkaran tumpang tindih
    function createCloud() {
      // pos awal acak
      const x = Math.random() * width;
      const y = Math.random() * height;
      // ukuran acak besar
      const baseRadius = 80 + Math.random() * 120;

      // kumpulan lingkaran (offset x,y dan radius relatif) buat bentuk awan
      const circles = [];
      const circlesCount = 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < circlesCount; i++) {
        circles.push({
          x: (Math.random() - 0.5) * baseRadius,
          y: (Math.random() - 0.3) * baseRadius * 0.6,
          r: baseRadius * (0.4 + Math.random() * 0.4),
        });
      }

      // kecepatan drift pelan dan random
      const speedX = (Math.random() - 0.5) * 0.02;
      const speedY = (Math.random() - 0.2) * 0.008;

      // alpha transparansi lembut
      const alpha = 0.07 + Math.random() * 0.06;

      return { x, y, circles, speedX, speedY, alpha };
    }

    const clouds = Array.from({ length: cloudsCount }, () => createCloud());

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    function drawCloud(cloud) {
      ctx.save();
      ctx.translate(cloud.x, cloud.y);
      ctx.fillStyle = `rgba(230, 230, 240, ${cloud.alpha})`;
      ctx.shadowColor = `rgba(230, 230, 240, ${cloud.alpha * 1.5})`;
      ctx.shadowBlur = 25;

      // gambar semua lingkaran tumpang tindih
      ctx.beginPath();
      cloud.circles.forEach((c) => {
        const gradient = ctx.createRadialGradient(c.x, c.y, c.r * 0.3, c.x, c.y, c.r);
        gradient.addColorStop(0, `rgba(255,255,255,${cloud.alpha})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.moveTo(c.x + c.r, c.y);
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }

    let animationFrameId;

    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      clouds.forEach((c) => {
        drawCloud(c);

        c.x += c.speedX;
        c.y += c.speedY;

        // Loop di layar
        if (c.x > width + 150) c.x = -150;
        else if (c.x < -150) c.x = width + 150;

        if (c.y > height + 150) c.y = -150;
        else if (c.y < -150) c.y = height + 150;
      });

      animationFrameId = requestAnimationFrame(animate);
    }

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
      style={{ width: "100%", height: "100%", background: "#0e0e20" }}
    />
  );
};

export default RealisticClouds;
