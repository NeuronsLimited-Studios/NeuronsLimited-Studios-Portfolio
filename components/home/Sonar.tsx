"use client";

import { useEffect, useRef, useState } from "react";

interface Contact {
  id: string;
  angle: number; // radians
  dist: number; // 0..1
  kind: "single" | "swarm" | "wreck";
  drift: number;
  lit: number; // last time the sweep passed over it
}

const LOG_LINES = [
  "PING · contacts 3 · walls mapped 61%",
  "HYDROPHONE · bearing 214 · single, large · closing",
  "CONTACT B · reacting to engine noise",
  "POWER · lights OFF · sonar ON · scrubber 60%",
  "HULL · creak at 4,112 m · integrity 88%",
  "HYDROPHONE · bearing 090 · swarm, 14 small · passing",
  "CONTACT B · lost. Silent running advised",
  "PING · wreck field ahead · false echoes likely",
];

/**
 * Animated sonar screen: a sweep, the cave walls and a few contacts that
 * light up when the beam passes over them and slowly fade, like the real
 * instrument in the game would show them.
 */
export default function Sonar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [log, setLog] = useState(() => LOG_LINES.slice(0, 3).map((text, id) => ({ id, text })));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const contacts: Contact[] = [
      { id: "A", angle: 0.8, dist: 0.62, kind: "wreck", drift: 0, lit: -10 },
      { id: "B", angle: 3.7, dist: 0.78, kind: "single", drift: -0.0011, lit: -10 },
      { id: "C", angle: 5.3, dist: 0.45, kind: "swarm", drift: 0.0024, lit: -10 },
    ];
    // Cave walls: a noisy ring, fixed per mount
    const wall = Array.from({ length: 90 }, (_, i) => 0.84 + Math.sin(i * 0.7) * 0.05 + Math.sin(i * 2.3) * 0.04);

    let size = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let raf = 0;
    let running = false;
    const start = performance.now();
    const TEAL = "61, 255, 208";

    const draw = (now: number) => {
      raf = running ? requestAnimationFrame(draw) : 0;
      const t = (now - start) / 1000;
      const c = size / 2;
      const R = c * 0.96;
      const sweep = reduce ? 1.2 : (t * 1.6) % (Math.PI * 2);

      ctx.clearRect(0, 0, size, size);

      // Rings and cross
      ctx.strokeStyle = `rgba(${TEAL}, 0.18)`;
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(c, c, (R * i) / 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(c - R, c);
      ctx.lineTo(c + R, c);
      ctx.moveTo(c, c - R);
      ctx.lineTo(c, c + R);
      ctx.stroke();

      // Sweep wedge
      const grad = ctx.createConicGradient
        ? ctx.createConicGradient(sweep - 0.9, c, c)
        : null;
      if (grad) {
        grad.addColorStop(0, `rgba(${TEAL}, 0)`);
        grad.addColorStop(0.143, `rgba(${TEAL}, 0.35)`);
        grad.addColorStop(0.1431, `rgba(${TEAL}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(c, c);
        ctx.arc(c, c, R, sweep - 0.9, sweep);
        ctx.closePath();
        ctx.fill();
      }

      // Walls: brighter right after the sweep
      for (let i = 0; i < wall.length; i++) {
        const a = (i / wall.length) * Math.PI * 2;
        const since = ((sweep - a + Math.PI * 4) % (Math.PI * 2)) / (Math.PI * 2);
        const alpha = Math.max(0.08, 0.9 - since * 1.4);
        ctx.fillStyle = `rgba(${TEAL}, ${alpha})`;
        const r = wall[i] * R;
        ctx.fillRect(c + Math.cos(a) * r - 1.5, c + Math.sin(a) * r - 1.5, 3, 3);
      }

      // Contacts
      for (const k of contacts) {
        k.angle += reduce ? 0 : k.drift;
        const a = ((k.angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const diff = ((sweep - a + Math.PI * 2) % (Math.PI * 2));
        if (diff < 0.05) k.lit = t;
        const age = t - k.lit;
        const alpha = Math.max(0, 1 - age / 3.2);
        if (alpha <= 0) continue;
        const x = c + Math.cos(a) * k.dist * R;
        const y = c + Math.sin(a) * k.dist * R;
        const color = k.kind === "single" ? "255, 90, 90" : TEAL;
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        if (k.kind === "swarm") {
          for (let j = 0; j < 9; j++) {
            ctx.fillRect(x + Math.cos(j * 2.1) * 9 * (j % 3), y + Math.sin(j * 1.7) * 9 * (j % 3), 3, 3);
          }
        } else {
          ctx.beginPath();
          ctx.arc(x, y, k.kind === "single" ? 6 : 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(${color}, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(x, y, 6 + age * 10, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.fillText(k.id, x + 10, y - 8);
      }

      // The sub
      ctx.fillStyle = `rgb(${TEAL})`;
      ctx.fillRect(c - 7, c - 3, 14, 6);
      ctx.fillRect(c - 2, c - 6, 4, 3);
    };

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running && !raf) raf = requestAnimationFrame(draw);
    });
    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);

    let n = 3;
    const logTimer = window.setInterval(() => {
      if (!running) return;
      setLog((prev) => [...prev.slice(-4), { id: n, text: LOG_LINES[n % LOG_LINES.length] }]);
      n++;
    }, 2600);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearInterval(logTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="sonar">
      <div className="sonar-screen">
        <canvas ref={canvasRef} aria-label="Animated sonar screen with three contacts" role="img" />
      </div>
      <div className="sonar-side">
        <div className="gauges">
          <div className="gauge">
            <span>Depth</span>
            <strong>4,112 m</strong>
          </div>
          <div className="gauge">
            <span>Hull</span>
            <strong>88%</strong>
            <i style={{ "--v": 0.88 } as React.CSSProperties} />
          </div>
          <div className="gauge warn">
            <span>Oxygen</span>
            <strong>41%</strong>
            <i style={{ "--v": 0.41 } as React.CSSProperties} />
          </div>
          <div className="gauge">
            <span>Power bus</span>
            <strong>7 / 10</strong>
            <i style={{ "--v": 0.7 } as React.CSSProperties} />
          </div>
        </div>
        <ul className="sonar-log" aria-live="off">
          {log.map((l) => (
            <li key={l.id}>{l.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
