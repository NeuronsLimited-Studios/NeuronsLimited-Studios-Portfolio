"use client";

import { useEffect, useRef, useState } from "react";

type Format = "km" | "m" | "exp";

interface Zone {
  id: string;
  label: string;
  from: number;
  to: number;
  format: Format;
  /** Rail marker shown for this zone (zones without one belong to the previous game) */
  marker?: { name: string; color: string };
}

const ZONES: Zone[] = [
  { id: "top", label: "Altitude", from: 42000, to: 36000, format: "km" },
  {
    id: "elite-safety",
    label: "Altitude",
    from: 36000,
    to: 400,
    format: "km",
    marker: { name: "Elite Safety", color: "#8f7bff" },
  },
  {
    id: "down-to-nothing",
    label: "Scale",
    from: 9,
    to: -15,
    format: "exp",
    marker: { name: "Down to Nothing", color: "#ffb52e" },
  },
  {
    id: "shrimps",
    label: "Altitude",
    from: 120,
    to: 0,
    format: "m",
    marker: { name: "Shrimps", color: "#ff5a4e" },
  },
  { id: "the-dive", label: "Depth", from: 0, to: 4000, format: "m" },
  {
    id: "directive-carina",
    label: "Depth",
    from: 4000,
    to: 4260,
    format: "m",
    marker: { name: "Directive: Carina", color: "#3dffd0" },
  },
];

const SUPERSCRIPT: Record<string, string> = {
  "-": "⁻",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

function format(value: number, f: Format) {
  if (f === "exp") {
    const e = Math.round(value);
    return `10${String(e)
      .split("")
      .map((c) => SUPERSCRIPT[c])
      .join("")} m`;
  }
  const n = Math.round(value).toLocaleString("en-US");
  return f === "km" ? `${n} km` : `${n} m`;
}

/** Fixed rail on the right: where you are in the descent, and how far down. */
export default function DescentHud() {
  const [active, setActive] = useState(0);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let zoneIndex = 0;
      let progress = 0;
      ZONES.forEach((z, i) => {
        const el = document.getElementById(z.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid) {
          zoneIndex = i;
          progress = Math.min(1, Math.max(0, (mid - r.top) / r.height));
        }
      });
      const z = ZONES[zoneIndex];
      const value = z.from + (z.to - z.from) * progress;
      if (readoutRef.current) {
        const nothing = z.format === "exp" && progress > 0.97;
        readoutRef.current.textContent = nothing ? "NULL" : format(value, z.format);
      }
      if (labelRef.current) labelRef.current.textContent = z.label;

      // Which game marker is lit: the last zone with a marker at or before this one
      let marker = 0;
      let seen = -1;
      ZONES.forEach((zz, i) => {
        if (zz.marker) {
          seen++;
          if (i <= zoneIndex) marker = seen + 1;
        }
      });
      setActive(marker);

      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (fillRef.current)
        fillRef.current.style.transform = `scaleY(${total > 0 ? window.scrollY / total : 0})`;
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  const markers = ZONES.filter((z) => z.marker);

  return (
    <aside className="descent-hud" aria-label="Game navigation">
      <div className="hud-readout" aria-hidden="true">
        <span ref={labelRef} className="hud-label">
          Altitude
        </span>
        <span ref={readoutRef} className="hud-value">
          42,000 km
        </span>
      </div>
      <div className="hud-rail">
        <div className="hud-track">
          <div ref={fillRef} className="hud-fill" />
        </div>
        <ol>
          {markers.map((z, i) => (
            <li key={z.id} className={active === i + 1 ? "is-active" : undefined}>
              <a href={`#${z.id}`} style={{ "--c": z.marker!.color } as React.CSSProperties}>
                <span className="hud-dot" />
                <span className="hud-name">{z.marker!.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
