import { LINKS } from "./games";
import { StoreBadge } from "./ui";

// Fixed layout of the neuron network around the logo (no randomness: same
// markup on server and client).
const NODES: [number, number][] = [
  [300, 300],
  [130, 170], [250, 90], [400, 110], [490, 220],
  [500, 380], [410, 500], [250, 520], [110, 430],
  [40, 290], [170, 290], [430, 300], [300, 190], [300, 420],
  [580, 140], [20, 120], [590, 520], [30, 540],
];

const EDGES: [number, number][] = [
  [0, 10], [0, 11], [0, 12], [0, 13],
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 1],
  [1, 10], [2, 12], [3, 12], [4, 11], [5, 11], [6, 13], [7, 13], [8, 10], [9, 10],
  [3, 14], [4, 14], [1, 15], [9, 15], [5, 16], [6, 16], [8, 17], [7, 17],
];

const edgePath = ([a, b]: [number, number]) =>
  `M${NODES[a][0]} ${NODES[a][1]} L${NODES[b][0]} ${NODES[b][1]}`;

export default function HomeHero() {
  return (
    <section id="top" className="home-hero" data-scroll>
      <div className="hero-network" aria-hidden="true">
        <svg viewBox="0 0 600 600">
          <defs>
            <radialGradient id="pulse-glow">
              <stop offset="0" stopColor="#bfe0ff" />
              <stop offset="1" stopColor="#4f8dff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {EDGES.map((e, i) => (
            <path key={i} d={edgePath(e)} className="neuron-edge" />
          ))}
          {EDGES.filter((_, i) => i % 2 === 0).map((e, i) => (
            <circle key={`p${i}`} r="5" fill="url(#pulse-glow)">
              <animateMotion
                dur={`${2.2 + (i % 5) * 0.55}s`}
                begin={`${(i * 0.37) % 3}s`}
                repeatCount="indefinite"
                path={i % 3 === 0 ? edgePath([e[1], e[0]]) : edgePath(e)}
              />
            </circle>
          ))}
          {NODES.map(([x, y], i) => (
            <circle
              key={`n${i}`}
              cx={x}
              cy={y}
              r={i === 0 ? 0 : i > 13 ? 3 : 5}
              className="neuron-node"
              style={{ animationDelay: `${(i * 0.41) % 3}s` }}
            />
          ))}
        </svg>
        <img src="/assets/logo.png" alt="" className="hero-logo" width={288} height={288} />
      </div>

      <div className="hero-copy">
        <p className="eyebrow" data-reveal>
          NeuronsLimited Studios · Indie game studio
        </p>
        <h1 className="hero-title" data-reveal>
          {"Developing games, one neuron at a time.".split(" ").map((word, i) => (
            <span key={i} style={{ transitionDelay: `${0.08 * i}s` }}>
              {word}
            </span>
          ))}
        </h1>
        <p className="hero-sub" data-reveal>
          We are a small indie team crafting quirky, silly and genuinely fun
          games. Four of them live on this page, and they're stacked in the
          right order: from orbit, all the way down to the bottom of the ocean.
        </p>

        <div className="hero-featured" data-reveal>
          <a href="#shrimps" className="featured-art" aria-label="Dive to Shrimps">
            <img src="/assets/games/shrimps/iceberg1.png" alt="" className="pixel featured-berg" />
            <img src="/assets/games/shrimps/classic.png" alt="" className="pixel featured-shrimp" />
            <img src="/assets/games/shrimps/deserteagle.png" alt="" className="pixel featured-gun" />
          </a>
          <div className="featured-copy">
            <span className="featured-label">
              <i aria-hidden="true" /> Out now · Featured
            </span>
            <strong className="featured-name">Shrimps</strong>
            <p>
              Armed shrimp, up to their claws. Real-time online PvP for up to
              four players, now with the new Harbor map.
            </p>
            <div className="featured-actions">
              <StoreBadge href={LINKS.shrimpsPlay} store="play" />
              <a href="#shrimps" className="featured-dive">
                Dive in ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      <a href="#elite-safety" className="scroll-cue">
        <span>Begin the descent</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
