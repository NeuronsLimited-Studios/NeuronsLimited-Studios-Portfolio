"use client";

import { useRef } from "react";
import { CARINA_UNLOCKED, LINKS } from "./games";
import Sonar from "./Sonar";

const STATIONS = [
  {
    role: "Pilot",
    text: "Drives a heavy hull with a lot of inertia. It turns slowly and keeps drifting when you let go. Emergency ballast exists, about three times per run.",
  },
  {
    role: "Sonar & hydrophone",
    text: "Pings the cave to map the walls and the contacts. Listens to tell a school of fish from a single predator. Every sound is a guess.",
  },
  {
    role: "Power & damage control",
    text: "Splits a fixed power budget between engines, lights, sonar, oxygen scrubber and pumps. Ask for too much and the sub browns out.",
  },
];

const INSTRUMENTS = [
  ["Active sonar", "A pulse map of walls and contacts", "The ping can be heard. Predators come."],
  ["Hydrophone", "Direction and “type” of every sound", "No precise distance"],
  ["Depth gauge & hull alarm", "Depth, pressure, breaking points", "Only tells you how bad it is"],
  ["Oxygen reserve", "Time left for the crew", "The scrubber eats power"],
  ["Power bus", "A budget for engines, lights, sonar, pumps", "Overload = blackout"],
  ["Floodlights", "Real, close-range sight", "They make you a target"],
  ["Ballast", "Fast emergency climb or dive", "Limited compressed air"],
  ["Acoustic decoys", "Distract a contact for a few seconds", "Consumable"],
];

const THREATS = [
  ["Skimmers", "React to noise, not light. Cut the engines, keep radio silence, wait."],
  ["Sight hunters", "Follow your floodlights. Go dark and change depth."],
  ["Swarms", "Harmless one by one, lethal in numbers. The hydrophone counts them for you."],
  [
    "The seabed",
    "Currents that drag you, hydrothermal vents, wreck fields that blind the sonar. The map is a character too.",
  ],
];

const ROADMAP = [
  ["M0", "Playable greybox", "Sub with inertia, camera, darkness + lights"],
  ["M1", "Sonar", "Active ping, contacts, occlusion against the cave"],
  ["M2", "Resources", "Oxygen, power, hull integrity + instrument UI"],
  ["M3", "First threat", "A predator that patrols, gets alert and hunts"],
  ["M4", "Online co-op", "Steam lobbies, host + 2 clients, shared stations"],
  ["M5", "Vertical slice", "One full level, down and back up, tested in co-op"],
  ["M6", "Audio & feel", "Hydrophone, creaking hull, a mix that follows the tension"],
];

const LOOP = [
  "Descend",
  "Listen & scan",
  "Read the threat",
  "Pick a route",
  "Manage O₂, power, hull",
];

export default function Carina() {
  const darkRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = darkRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--fx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--fy", `${(y * 100).toFixed(1)}%`);
    // Whatever lives down here stays where your light is not
    el.style.setProperty("--ex", `${((1 - x) * 80 + 10).toFixed(1)}%`);
    el.style.setProperty("--ey", `${((1 - y) * 60 + 20).toFixed(1)}%`);
    el.classList.add("lit");
  };

  return (
    <>
      {/* ── The dive: from the surface to the abyss ── */}
      <div id="the-dive" className="dive" data-scroll aria-hidden="true">
        <div className="dive-rays" />
        <div className="bubbles">
          {Array.from({ length: 18 }, (_, i) => (
            <i
              key={i}
              style={
                {
                  left: `${(i * 53) % 100}%`,
                  "--d": `${6 + (i % 5) * 1.7}s`,
                  "--s": `${4 + (i % 4) * 4}px`,
                  animationDelay: `${(i * 0.9) % 7}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <ol className="depth-marks">
          <li style={{ top: "6%" }}>−10 m · last light from the surface</li>
          <li style={{ top: "28%" }}>−200 m · the twilight zone begins</li>
          <li style={{ top: "52%" }}>−1,000 m · no sunlight ever reaches this far</li>
          <li style={{ top: "76%" }}>−4,000 m · the abyss</li>
        </ol>
      </div>

      <section id="directive-carina" className="world world-carina">
        {/* ── Dark hero with flashlight ───────── */}
        <div className="carina-dark" ref={darkRef} onPointerMove={onMove}>
          <img src="/assets/Placeholder-carina.png" alt="" className="carina-sub" />
          <div className="carina-eyes" aria-hidden="true">
            <i />
            <i />
          </div>
          <div className="carina-shade" aria-hidden="true" />

          <div className="carina-hero-copy">
            <p className="world-index" data-reveal>
              04 / 04 · The abyss
            </p>
            {CARINA_UNLOCKED ? (
              <>
                <span className="status-pill in-dev" data-reveal>
                  In development
                </span>
                <h2 className="carina-title" data-reveal data-text="DIRECTIVE: CARINA">
                  DIRECTIVE: CARINA
                </h2>
                <p className="tagline" data-reveal>
                  One submarine. One crew. Something in the dark.
                </p>
                <p className="lead" data-reveal>
                  A 2D top-down underwater survival game for 1 to 3 players in online co-op. At this
                  depth there are no useful windows: you survive by reading your instruments. The
                  monsters aren't meant to be fought. They're meant to be anticipated, avoided and
                  fooled.
                </p>
                <div className="tag-row" data-reveal>
                  <span>Co-op 1–3</span>
                  <span>Horror</span>
                  <span>Survival</span>
                  <span>Steam</span>
                </div>
                <p className="flash-hint" data-reveal>
                  Move your light around. Lights let you see. They also let you be seen.
                </p>
              </>
            ) : (
              <>
                <span className="status-pill in-dev" data-reveal>
                  Coming soon
                </span>
                <h2 className="carina-title" data-reveal data-text="DIRECTIVE: CARINA">
                  DIRECTIVE: CARINA
                </h2>
                <p className="tagline" data-reveal>
                  Something is waiting in the dark.
                </p>
                <p className="lead" data-reveal>
                  A multiplayer horror game set in the depths of the ocean.
                </p>
                <div className="carina-soon" data-reveal>
                  <span className="soon-dot" />
                  <span>
                    <strong>We're working on it.</strong>
                    <br />
                    More when we come back up.
                  </span>
                </div>
                <a
                  href={LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="carina-follow"
                  data-reveal
                >
                  Follow the descent on Discord →
                </a>
              </>
            )}
          </div>
        </div>

        {CARINA_UNLOCKED && (
          <>
            {/* ── Fantasy quote ──────────────────── */}
            <blockquote className="carina-quote" data-reveal>
              <p>
                “I'm blind at 4,000 metres, inside a creaking metal box, and something big is
                circling me. I have thirty seconds to decide: shut everything down and hope, or push
                the engines and run.”
              </p>
              <cite>The scene the whole game is built to create</cite>
            </blockquote>

            {/* ── Sonar ─────────────────────────── */}
            <div className="carina-block">
              <div className="carina-head" data-reveal>
                <span className="console-label">// Instruments</span>
                <h3>You never see the monster. You see data.</h3>
                <p>
                  An echo on the sonar, a bearing from the hydrophone, the hull shaking, a current
                  that shouldn't be there. No enemy health bars, no monster icons: just readings you
                  have to interpret.
                </p>
              </div>
              <div data-reveal>
                <Sonar />
              </div>
            </div>

            {/* ── Crew stations ──────────────────── */}
            <div className="carina-block">
              <div className="carina-head" data-reveal>
                <span className="console-label">// Crew</span>
                <h3>Three stations, up to three friends</h3>
                <p>
                  Everyone shares the same submarine. Alone, you rotate between stations; with
                  friends, everybody has a job and nobody has the full picture. Online through
                  Steam: one player hosts, the others join by invite or lobby code, no port
                  forwarding needed.
                </p>
              </div>
              <div className="stations">
                {STATIONS.map((s, i) => (
                  <div
                    className="station"
                    key={s.role}
                    data-reveal
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <span className="station-n">ST-0{i + 1}</span>
                    <strong>{s.role}</strong>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Instruments table ──────────────── */}
            <div className="carina-block">
              <div className="carina-head" data-reveal>
                <span className="console-label">// Tradeoffs</span>
                <h3>Nothing down here is free</h3>
                <p>
                  Every system that helps you costs something: noise, light, power, compressed air
                  or time.
                </p>
              </div>
              <div className="instruments" data-reveal>
                <div className="instr-row instr-head">
                  <span>System</span>
                  <span>Gives you</span>
                  <span>Costs you</span>
                </div>
                {INSTRUMENTS.map(([n, g, c]) => (
                  <div className="instr-row" key={n}>
                    <span>{n}</span>
                    <span>{g}</span>
                    <span className="cost">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Threats ───────────────────────── */}
            <div className="carina-block">
              <div className="carina-head" data-reveal>
                <span className="console-label">// Contacts</span>
                <h3>What lives in the dark</h3>
              </div>
              <div className="threats">
                {THREATS.map(([n, d], i) => (
                  <div
                    className="threat"
                    key={n}
                    data-reveal
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    <span className="threat-id">CONTACT {String.fromCharCode(65 + i)}</span>
                    <strong>{n}</strong>
                    <p>{d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Loop + death log ───────────────── */}
            <div className="carina-block carina-loop">
              <div className="loop-ring" data-reveal>
                {LOOP.map((l, i) => (
                  <span key={l} style={{ "--i": i } as React.CSSProperties}>
                    {l}
                  </span>
                ))}
                <div className="loop-core">
                  Reach the target.
                  <br />
                  <strong>Come back up alive.</strong>
                </div>
              </div>
              <div className="carina-head" data-reveal>
                <span className="console-label">// Runs</span>
                <h3>The way back is worse than the way down</h3>
                <p>
                  A run lasts 15 to 30 minutes: dive to a wreck, a sample or a signal, then climb
                  back. And when it goes wrong, the game shows you why, as a chain of decisions:
                </p>
                <ol className="death-log">
                  <li>Floodlights on, 12 m from contact B</li>
                  <li>Contact B: hunting</li>
                  <li>Hull impact</li>
                </ol>
                <p className="dim">Death is never bad luck. Next time, you know what to do.</p>
              </div>
            </div>

            {/* ── Dive log (roadmap) ─────────────── */}
            <div className="carina-block">
              <div className="carina-head" data-reveal>
                <span className="console-label">// Dive log</span>
                <h3>Where we are</h3>
                <p>
                  Carina is a prototype, built in Unity 6 with 2D lights, shadows and fake
                  volumetric fog. Here's the road down.
                </p>
              </div>
              <ol className="roadmap">
                {ROADMAP.map(([m, t, d], i) => (
                  <li key={m} data-reveal style={{ transitionDelay: `${i * 0.05}s` }}>
                    <span className="m">{m}</span>
                    <strong>{t}</strong>
                    <p>{d}</p>
                  </li>
                ))}
              </ol>
              <figure className="carina-shot" data-reveal>
                <img
                  src="/assets/carina.png"
                  alt="Directive: Carina main menu with the Begin Descent button"
                />
                <figcaption>
                  Main menu, prototype build. “Begin Descent” is the only button that matters.
                </figcaption>
              </figure>
            </div>
          </>
        )}
      </section>

      {/* ── Seabed outro ─────────────────────── */}
      <section className="seabed">
        <p className="world-index" data-reveal>
          −4,260 m · Bottom
        </p>
        <h2 data-reveal>You reached the bottom. For now.</h2>
        <p className="lead" data-reveal>
          More neurons are firing. Follow the descent while we dig deeper: devlogs, playtests and
          the occasional shrimp.
        </p>
        <div className="seabed-links" data-reveal>
          <a href={LINKS.discord} target="_blank" rel="noopener noreferrer">
            <img src="/assets/discord.png" alt="" /> Join the Discord
          </a>
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
            <img src="/assets/Instagram.svg" alt="" /> Instagram
          </a>
          <a href={LINKS.itch} target="_blank" rel="noopener noreferrer">
            <img src="/assets/itch-io-logo.png" alt="" /> itch.io
          </a>
          <a href={LINKS.coffee} target="_blank" rel="noopener noreferrer">
            <img src="/assets/coffee.png" alt="" /> Buy us a coffee
          </a>
        </div>
        <a href="#top" className="resurface">
          ↑ Resurface
        </a>
      </section>
    </>
  );
}
