import React, { useEffect, useRef, useState } from "react";
import "./SnowfallScene.css";

const SnowfallBackground = () => {
  const blobRefs = useRef([]);
  const [isClient, setIsClient] = useState(false);
  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ];

  useEffect(() => {
    setIsClient(true); // Set client-side rendering
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Blob animation effect
    let currentScroll = window.pageYOffset;
    let requestId;

    const handleScroll = () => {
      const newScroll = window.pageYOffset;
      currentScroll = newScroll;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;
        
        const initialPos = initialPositions[index];
        const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340;
        const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40;

        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;

        blob.style.transform = `translate(${x}px, ${y}px)`;
        blob.style.transition = "transform 1.4s ease-out";
      });

      requestId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScroll);

    // Snowfall animation effect
    const TOTAL_NUM_FLAKES = 150; // Further reduced for performance
    const LAYERS = [
      { 
        layer: 1, 
        sizeMin: 10, 
        sizeMax: 16, 
        speedFactor: 0.06, 
        swayAmpMin: 3, 
        swayAmpMax: 10, 
        opacity: 0.8, 
        blur: 0,
        zIndex: 6 
      },
      { 
        layer: 2, 
        sizeMin: 8, 
        sizeMax: 12, 
        speedFactor: 0.04, 
        swayAmpMin: 3, 
        swayAmpMax: 8, 
        opacity: 0.6, 
        blur: 1,
        zIndex: 5 
      },
    ];

    const canvases = [];
    const ctxs = [];
    const flakes = [];

    // Initialize snow canvases
    LAYERS.forEach(layer => {
      const canvas = document.createElement('canvas');
      canvas.id = `snow-canvas-${layer.layer}`;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = layer.zIndex;
      canvas.style.pointerEvents = 'none';
      document.getElementById('snow-container').appendChild(canvas);
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const ctx = canvas.getContext('2d');
      canvases.push(canvas);
      ctxs.push(ctx);
      
      // Create flakes for this layer
      for (let i = 0; i < Math.floor(TOTAL_NUM_FLAKES / LAYERS.length); i++) {
        flakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          size: Math.random() * (layer.sizeMax - layer.sizeMin) + layer.sizeMin,
          speed: (Math.random() + 0.3) * layer.speedFactor,
          sway: {
            amp: Math.random() * (layer.swayAmpMax - layer.swayAmpMin) + layer.swayAmpMin,
            speed: Math.random() * 0.01 + 0.005,
            offset: Math.random() * Math.PI * 2
          },
          layer: layer
        });
      }
    });

    // Animation loop for snow
    let snowRequestId;
    const animateSnow = () => {
      ctxs.forEach(ctx => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      });

      flakes.forEach(flake => {
        const ctx = ctxs[flake.layer.layer - 1];
        if (!ctx) return;
        
        flake.y += flake.speed;
        flake.x += Math.sin(flake.y * flake.sway.speed + flake.sway.offset) * flake.sway.amp * 0.1;

        // Reset flake if it goes off screen
        if (flake.y > ctx.canvas.height || flake.x < -20 || flake.x > ctx.canvas.width + 20) {
          flake.y = Math.random() * -50;
          flake.x = Math.random() * ctx.canvas.width;
        }

        // Draw flake
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size / 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.layer.opacity})`;
        ctx.filter = `blur(${flake.layer.blur}px)`;
        ctx.fill();
      });

      snowRequestId = requestAnimationFrame(animateSnow);
    };

    const handleResize = () => {
      canvases.forEach(canvas => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };

    window.addEventListener('resize', handleResize);
    animateSnow();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestId);
      cancelAnimationFrame(snowRequestId);
      canvases.forEach(canvas => {
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      });
    };
  }, [isClient]);

  if (!isClient) {
    return <div className="fixed inset-0 bg-gray-900 z-0" />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {/* Blob backgrounds */}
      <div className="absolute inset-0">
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-80 md:opacity-50"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-80 md:opacity-50 hidden sm:block"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-80 md:opacity-50"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-pink-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-60 md:opacity-40 hidden sm:block"
        ></div>
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000099_1px,transparent_1px),linear-gradient(to_bottom,#00000099_1px,transparent_1px)] bg-[size:32px_32px] opacity-80"
        style={{
          backgroundSize: "32px 32px",
          filter: "blur(10px)",
          zIndex: 1
        }}
      ></div>

      {/* Glassmorphism effect */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          zIndex: 2,
        }}
      ></div>

      {/* Snowfall container */}
      <div id="snow-container" className="absolute inset-0" style={{ zIndex: 3 }} />
    </div>
  );
};

export default SnowfallBackground;
