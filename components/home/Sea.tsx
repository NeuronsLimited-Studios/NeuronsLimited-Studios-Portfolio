import { useId } from "react";

/** Waterline of each iceberg sprite, as a fraction of its height from the top. */
export const WATERLINE: Record<string, number> = {
  iceberg1: 0.325,
  iceberg2: 0.325,
  iceberg3: 0.325,
  iceberg5: 0.495,
  iceberg6: 0.333,
};

// The crest: one wave every 100 units, 8 of them, so the SVG can loop seamlessly
const CREST = `M0 7 ${Array.from({ length: 8 }, (_, i) => `Q ${i * 100 + 25} 2 ${i * 100 + 50} 7 T ${i * 100 + 100} 7`).join(" ")}`;

/**
 * The sea as it looks in Shrimps (colors from the game's Unlit_Water material):
 * a far-sea band drawn behind the icebergs, then a see-through front layer
 * with a three-color gradient, a mirrored reflection of the background,
 * light glints that get denser with depth and a soft crest on the waterline.
 *
 * The wrapper doesn't create a stacking context: the far band sits at z 0,
 * icebergs placed by the parent at z 1 and the front water at z 2, so the
 * submerged part of every iceberg is seen through the water.
 */
export default function Sea({
  top,
  reflect,
  glints = 26,
  className = "",
}: {
  /** CSS top of the waterline inside the positioned parent */
  top: string;
  /** Background image to mirror on the water */
  reflect?: string;
  glints?: number;
  className?: string;
}) {
  const filterId = `ripple-${useId().replace(/:/g, "")}`;

  return (
    <div className={`sea ${className}`} style={{ top }} aria-hidden="true">
      <div className="sea-far" />
      <div className="sea-front">
        {reflect && (
          <>
            <svg width="0" height="0" className="sea-defs">
              <filter id={filterId}>
                <feTurbulence type="fractalNoise" baseFrequency="0.004 0.09" numOctaves="1" seed="4" />
                <feDisplacementMap in="SourceGraphic" scale="14" />
              </filter>
            </svg>
            <div
              className="sea-reflect"
              style={{ backgroundImage: `url(${reflect})`, filter: `url(#${filterId})` }}
            />
          </>
        )}
        <div className="sea-glints">
          {Array.from({ length: glints }, (_, i) => {
            // Few glints near the surface, more and more going down
            const depth = Math.sqrt(((i * 61) % 97) / 97);
            return (
              <i
                key={i}
                style={{
                  left: `${(i * 37 + 11) % 100}%`,
                  top: `${8 + depth * 84}%`,
                  animationDelay: `${((i * 0.73) % 4).toFixed(2)}s`,
                }}
              />
            );
          })}
        </div>
        <svg className="sea-crest" viewBox="0 0 800 12" preserveAspectRatio="none">
          <path d={CREST} />
        </svg>
      </div>
    </div>
  );
}

/** An iceberg sunk to its waterline: place it with `left`/`width`, it floats at `top`. */
export function Iceberg({
  src,
  name,
  top,
  className = "",
  style,
  children,
}: {
  children?: React.ReactNode;
  src: string;
  name: keyof typeof WATERLINE;
  top: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`berg ${className}`}
      style={{ top, "--wl": WATERLINE[name], ...style } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className="berg-body">
        <img src={src} alt="" className="pixel" />
        {children}
      </div>
    </div>
  );
}
