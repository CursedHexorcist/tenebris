import React, { useEffect, useRef } from "react";

const ChillCloudsBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Cloud blobs: posisi dan ukuran awal, jumlah sedikit dan besar
    const clouds = [
      { x: width * 0.15, y: height * 0.3, radius: 200, alpha: 0.14, speedX: 0.01 },
      { x: width * 0.6, y: height * 0.15, radius: 150, alpha: 0.12, speedX: 0.008 },
      { x: width * 0.8, y: height * 0.6, radius: 180, alpha: 0.1, speedX: 0.012 },
      { x: width * 0.3, y: height * 0.7, radius: 220, alpha: 0.1, speedX: 0.009 },
      { x: width * 0.5, y: height * 0.45, radius: 170, alpha: 0.08, speedX: 0.011 },
    ];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Recalculate positions relative to new size
      clouds[0].x = width * 0.15;
      clouds[0].y = height * 0.3;
      clouds[1].x = width * 0.6;
      clouds[1].y = height * 0.15;
      clouds[2].x = width * 0.8;
      clouds[2].y = height * 0.6;
      clouds[3].x = width * 0.3;
      clouds[3].y = height * 0.7;
      clouds[4].x = width * 0.5;
      clouds[4].y = height * 0.45;
    };
    window.addEventListener("resize", resize);

    function drawCloud(x, y, radius, alpha) {
      // Buat gradien lingkaran besar blur seperti awan halus
      const gradient = ctx.createRadialGradient(x, y, radius * 0.4, x, y, radius);
      gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    let animationFrameId;

    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      clouds.forEach((cloud) => {
        drawCloud(cloud.x, cloud.y, cloud.radius, cloud.alpha);
        // Gerakkan perlahan ke kanan, loop kembali jika keluar layar
        cloud.x += cloud.speedX;
        if (cloud.x - cloud.radius > width) cloud.x = -cloud.radius;
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

export default ChillCloudsBackground;
