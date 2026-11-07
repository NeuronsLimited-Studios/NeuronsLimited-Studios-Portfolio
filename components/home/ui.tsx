"use client";

export function StoreBadge({
  href,
  store,
}: {
  href: string;
  store: "play" | "itch";
}) {
  const play = store === "play";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="store-badge">
      <img
        src={
          play
            ? "/assets/googleplaydownloadbutton-trimmed.png"
            : "/assets/releaseditchbutton-trimmed.png"
        }
        alt={play ? "Get it on Google Play" : "Available on itch.io"}
        height={play ? 64 : 58}
      />
    </a>
  );
}

/** Horizontal stat bar that fills when revealed (parent needs data-reveal). */
export function StatBar({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="stat-bar">
      <span>{label}</span>
      <div className="stat-track">
        <div
          className="stat-fill"
          style={{ "--v": Math.min(1, value / max) } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
