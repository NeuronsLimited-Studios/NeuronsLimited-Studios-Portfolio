"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth 0.15 (far) → 1 (near)
  tw: number; // twinkle phase
}

/**
 * Fixed starfield behind the space part of the page (hero, Elite Safety,
 * Down to Nothing). Stars drift with the scroll and stretch into streaks
 * when the visitor scrolls fast, then fade out once the sky of Shrimps
 * takes over.
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 4200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.15 + Math.random() ** 2 * 0.85,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    let lastY = window.scrollY;
    let velocity = 0;
    let raf = 0;
    let t = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      velocity += (dy - velocity) * 0.18;

      // Fade the whole field out as the Shrimps sky scrolls in
      const fadeTarget = document.getElementById("shrimps");
      let alpha = 1;
      if (fadeTarget) {
        const top = fadeTarget.getBoundingClientRect().top;
        alpha = Math.min(1, Math.max(0, top / h));
      }
      canvas.style.opacity = alpha.toFixed(3);
      if (alpha <= 0.001) return;

      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const streak = reduce ? 0 : Math.min(Math.abs(velocity) * 0.9, 60);
      const dir = Math.sign(velocity) || 1;

      for (const s of stars) {
        // Parallax: near stars move more with the scroll
        s.y -= dy * s.z * 0.35;
        if (!reduce) s.y -= 0.04 * s.z; // slow idle drift
        if (s.y < -60) s.y += h + 120;
        if (s.y > h + 60) s.y -= h + 120;

        const twinkle = reduce ? 1 : 0.65 + 0.35 * Math.sin(t * (1 + s.z * 2) + s.tw);
        const size = 0.4 + s.z * 1.6;
        ctx.globalAlpha = (0.25 + s.z * 0.75) * twinkle;

        if (streak > 2) {
          const len = streak * s.z;
          ctx.strokeStyle = s.z > 0.8 ? "#cfe3ff" : "#ffffff";
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x, s.y + len * dir);
          ctx.stroke();
        } else {
          ctx.fillStyle = s.z > 0.85 ? "#cfe3ff" : "#ffffff";
          ctx.fillRect(s.x, s.y, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
