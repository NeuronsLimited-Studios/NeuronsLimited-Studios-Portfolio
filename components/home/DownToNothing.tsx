"use client";

import { useEffect, useRef, useState } from "react";
import { LINKS } from "./games";
import Sea from "./Sea";
import { StoreBadge } from "./ui";

const D = "/assets/games/dtn";

const STAGES = [
  {
    entity: "Star",
    sprite: `${D}/sun.png`,
    size: 340,
    text: "You start immense. Wander through space and let black holes devour you to shrink, but careful: the planets pulled in by your own gravity crash into you and make you grow back.",
    keys: ["W", "A", "S", "D"],
    bg: "space",
  },
  {
    entity: "Planet",
    sprite: `${D}/planet1.png`,
    size: 250,
    text: "Slide from side to side. Collect the energy orbs, dodge the asteroids. The two keys don't move you: they switch the direction you're going.",
    keys: ["A", "D"],
    bg: "space",
  },
  {
    entity: "Asteroid",
    sprite: `${D}/lavaasteroid1.png`,
    size: 190,
    text: "Fall diagonally toward a planet, between satellites and lava asteroids. When the bar is full: the crash.",
    keys: ["W", "S"],
    bg: "space",
  },
  {
    entity: "Iceberg",
    sprite: `${D}/iceberg3.png`,
    size: 230,
    text: "Float on the sea and melt in the sun, while drifting ice floes cool you down. Wind and weather push you around. Watch out for shrimps.",
    keys: ["A", "D"],
    bg: "sea",
  },
  {
    entity: "Drop",
    sprite: `${D}/drop1.png`,
    size: 120,
    text: "The last drop of the iceberg slides down the wall of a glacier. Dry ice wears you down; other drops, frost and streams get in your way.",
    keys: ["A", "D"],
    bg: "glacier",
  },
  {
    entity: "Atom",
    sprite: `${D}/atom.png`,
    size: 100,
    text: "An oxygen atom swings like Tarzan on a rope hooked to the molecules, flying through the protons and dodging the electrons.",
    keys: ["CLICK", "W", "A", "S", "D"],
    bg: "atom",
  },
  {
    entity: "Unstable entity",
    sprite: `${D}/unstable.png`,
    size: 90,
    text: "The microscopic world is getting corrupted. Broken magenta shaders chase you, the rules (keys, gravity, time) stop working, and everything you touch really breaks. Until everything is deleted.",
    keys: ["W", "A", "S", "D"],
    bg: "corrupt",
  },
] as const;

const KEY_SPRITES: Record<string, string> = {
  W: `${D}/w.png`,
  A: `${D}/a.png`,
  S: `${D}/s.png`,
  D: `${D}/d.png`,
  CLICK: `${D}/leftclick.png`,
};

function StageDecor({ stage }: { stage: number }) {
  switch (stage) {
    case 0:
      return (
        <>
          <img src={`${D}/blackhole.png`} className="pixel deco bh1" alt="" />
          <img src={`${D}/blackhole.png`} className="pixel deco bh2" alt="" />
          <img src={`${D}/planet2.png`} className="pixel deco pl1" alt="" />
          <img src={`${D}/planet3.png`} className="pixel deco pl2" alt="" />
        </>
      );
    case 1:
      return (
        <>
          <img src={`${D}/energythingy.png`} className="pixel deco orb1" alt="" />
          <img src={`${D}/energythingy.png`} className="pixel deco orb2" alt="" />
          <img src={`${D}/asteroid1.png`} className="pixel deco ast1" alt="" />
          <img src={`${D}/asteroid4.png`} className="pixel deco ast2" alt="" />
        </>
      );
    case 2:
      return (
        <>
          <img src={`${D}/statellite1.png`} className="pixel deco sat1" alt="" />
          <img src={`${D}/lavaasteroid5.png`} className="pixel deco lava1" alt="" />
          <img src={`${D}/planet3.png`} className="pixel deco target" alt="" />
        </>
      );
    case 3:
      return (
        <>
          <img src="/assets/games/shrimps/classic.png" className="pixel deco peek-shrimp" alt="" />
        </>
      );
    case 4:
      return (
        <>
          <img src={`${D}/walldrop1.png`} className="pixel deco wd1" alt="" />
          <img src={`${D}/walldrop2.png`} className="pixel deco wd2" alt="" />
          <img src={`${D}/walldrop3.png`} className="pixel deco wd3" alt="" />
        </>
      );
    case 5:
      return (
        <>
          <img src={`${D}/moleculeco2.png`} className="pixel deco mol1" alt="" />
          <div className="deco swing">
            <span className="rope" />
            <img src={`${D}/atom.png`} className="pixel" alt="" />
          </div>
          <img src={`${D}/moleculeh2.png`} className="pixel deco mol2" alt="" />
          <img src={`${D}/proton.png`} className="pixel deco prot" alt="" />
          <div className="deco electron-orbit">
            <img src={`${D}/electron.png`} className="pixel" alt="" />
          </div>
        </>
      );
    default:
      return (
        <>
          <img src={`${D}/corrupt1.png`} className="pixel deco cr1" alt="" />
          <img src={`${D}/corrupt2.png`} className="pixel deco cr2" alt="" />
          <img src={`${D}/corrupt3.png`} className="pixel deco cr3" alt="" />
          <img src={`${D}/corrupt1.png`} className="pixel deco cr4" alt="" />
        </>
      );
  }
}

export default function DownToNothing() {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [flash, setFlash] = useState(0);
  const stageRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = Math.min(0.9999, Math.max(0, -r.top / span));
      const next = Math.floor(p * STAGES.length);
      const local = p * STAGES.length - next;
      if (barRef.current) barRef.current.style.transform = `scaleX(${local.toFixed(4)})`;
      if (next !== stageRef.current) {
        stageRef.current = next;
        setStage(next);
        setFlash((f) => f + 1);
      }
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

  const s = STAGES[stage];

  return (
    <section id="down-to-nothing" className="world world-dtn" data-scroll>
      {/* ── Intro ─────────────────────────────── */}
      <div className="dtn-intro">
        <p className="world-index" data-reveal>
          02 / 04 · Everything
        </p>
        <span className="status-pill released" data-reveal>
          Released on itch.io
        </span>
        <h2 className="sr-only">Down to Nothing</h2>
        <img src={`${D}/gamelogo.png`} alt="Down to Nothing" className="pixel dtn-logo" data-reveal />
        <p className="tagline dtn-tagline" data-reveal>
          Everything ends up as nothing. <em>You're just speeding it up.</em>
        </p>
        <p className="lead" data-reveal>
          Start as an immense star and go down, stage after stage, until
          there's nothing left. Seven stages, seven completely different
          gameplays, one bar at the top: the right moves fill it, mistakes
          drain it. When it's full, press <kbd>SPACE</kbd> and go down.
        </p>
        <p className="dtn-jam" data-reveal>
          Made for the <strong>Genial Gamejam 2026</strong> · Theme: <strong>Reach the Limit</strong>
        </p>
        <p className="dtn-hint" data-reveal>
          Keep scrolling. You're the star now.
        </p>
      </div>

      {/* ── Pinned stage run ───────────────────── */}
      <div className="dtn-track" ref={trackRef}>
        <div className={`dtn-stage bg-${s.bg} stage-${stage}`}>
          <div className="dtn-bgs" aria-hidden="true">
            <div className="dtn-bg sea" />
            <div className="dtn-bg glacier" />
            <div className="dtn-bg atom" />
            <div className="dtn-bg corrupt" />
          </div>

          <div className="dtn-hudbar" aria-hidden="true">
            <span>STAGE {stage + 1}/7</span>
            <div className="dtn-bar">
              <div ref={barRef} className="dtn-bar-fill" />
            </div>
            <span className="dtn-bar-hint">SPACE ▸</span>
          </div>

          <div className="dtn-scene" aria-hidden="true" key={`scene-${stage}`}>
            <StageDecor stage={stage} />
            <img
              src={s.sprite}
              alt=""
              className="pixel dtn-entity"
              style={{ "--size": `${s.size}px` } as React.CSSProperties}
            />
            {stage === 3 && <Sea top="var(--dtn-sea)" reflect="/assets/games/shrimps/iceberg-bg.png" glints={30} />}
          </div>

          <div className="dtn-panel" key={`panel-${stage}`} aria-live="polite">
            <span className="dtn-stage-n">Stage {String(stage + 1).padStart(2, "0")}</span>
            <h3 className={stage === 6 ? "glitch-text" : undefined} data-text={s.entity}>
              {s.entity}
            </h3>
            <p>{s.text}</p>
            <div className="dtn-keys">
              {s.keys.map((k) => (
                <img key={k} src={KEY_SPRITES[k]} alt={k} className="pixel" />
              ))}
              {stage === 6 && <small>(while they work)</small>}
            </div>
          </div>

          <ol className="dtn-steps" aria-hidden="true">
            {STAGES.map((st, i) => (
              <li key={st.entity} className={i === stage ? "on" : i < stage ? "done" : undefined} />
            ))}
          </ol>

          {flash > 0 && (
            <div className="dtn-flash" key={`flash-${flash}`} aria-hidden="true">
              <span>REACH THE LIMIT</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Outro ─────────────────────────────── */}
      <div className="dtn-outro">
        <p className="nothing" data-reveal>
          Nothing.
        </p>
        <div data-reveal>
          <StoreBadge href={LINKS.dtnItch} store="itch" />
        </div>
        <p className="bridge" data-reveal>
          …except for one thing. Back in stage four, floating next to that
          iceberg, something was watching.
          <br />
          It had a gun.
        </p>
      </div>
    </section>
  );
}
