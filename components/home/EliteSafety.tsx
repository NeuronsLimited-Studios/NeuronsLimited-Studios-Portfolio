"use client";

import { useEffect, useState } from "react";
import { LINKS } from "./games";
import { StoreBadge } from "./ui";

const E = "/assets/games/elite";

// John Safety's actual tutorial lines from the game. HAT_FALLS is the line where his hardhat
// falls off; on the next one ("There we go") it drops back on his head.
const HAT_FALLS = 2;
const JOHN_LINES = [
  "Running a mining company is no easy task. So, what are we waiting for? Let's get started!",
  "This is the Safety Meter. It is very important this always stays hig-",
  "Gosh, not again! My hat fell off, give me a sec here…",
  "There we go. Anyway, as I was saying: safety is a very important factor.",
  "If safety gets too low, some bad stuff might happen!",
  "Honestly, I don't know what the rest of this stuff does. You'll figure it out, I'm sure.",
  "To start making some cash, zoom in on those asteroids down there and buy one. Choose carefully!",
];

const MINERALS = [
  { name: "Water", icon: "water", base: 12 },
  { name: "Coal", icon: "coal", base: 18 },
  { name: "Iron", icon: "iron", base: 34 },
  { name: "Hydrogen", icon: "hydrogen", base: 41 },
  { name: "Helium", icon: "helium", base: 57 },
  { name: "Cobalt", icon: "cobalt", base: 88 },
  { name: "Gold", icon: "gold", base: 140 },
  { name: "Platinum", icon: "platinum", base: 215 },
  { name: "Unobtanium", icon: "unobtanium", base: 999 },
];

const UPGRADES = [
  { name: "Hardhat", icon: "hardhat", tier: 2, text: "Step one of not dying. John keeps losing his." },
  { name: "Railings", icon: "railing", tier: 4, text: "Fewer workers wandering off the edge of an asteroid." },
  { name: "Alarm", icon: "alarm", tier: 6, text: "Something is wrong. Now everyone knows." },
  { name: "Gas Mask", icon: "gasmask", tier: 8, text: "For the nebulae that smell like they look." },
  { name: "Oxygen Tank", icon: "oxygentank", tier: 10, text: "Space has famously little air." },
  { name: "Bulkheads", icon: "bulkhead", tier: 12, text: "When a section fails, it fails alone." },
  { name: "Protective Gear", icon: "protectivegear", tier: 14, text: "Head-to-toe. Fashionable? Debatable." },
  { name: "Pickaxe", icon: "pickaxe", tier: 16, text: "A better pickaxe. Somehow also a safety item." },
];

const EVENTS = [
  {
    name: "Market Crash",
    text: "A sector-wide drop of prices for all commodities. They'll recover. Eventually.",
  },
  {
    name: "Found Black Market",
    text: "A hidden market pops up on one of your colonies, outside your control. Safety drops.",
  },
  {
    name: "Active Pirate Cells",
    text: "Pirates take root in your colonies: a temporary 20% income loss, and less safety.",
  },
  {
    name: "Worker Strike",
    text: "Workers demand better safety. Operations halt until next month, or until you fix it.",
  },
];

const BODIES = [
  { name: "Yellow Star", icon: "yellowstar" },
  { name: "Red Star", icon: "redstar" },
  { name: "Blue Star", icon: "bluestar" },
  { name: "White Dwarf", icon: "whitedwarf" },
  { name: "Brown Dwarf", icon: "browndwarf" },
  { name: "Neutron Star", icon: "neutronstar" },
  { name: "Black Hole", icon: "blackhole" },
  { name: "Dyson Sphere", icon: "dysonspere" },
];

const ORBITS = [
  { icon: "planet1", name: "Holyphemus", size: 54, radius: 34, speed: 26, start: 0 },
  { icon: "planet3", name: "Thanalot", size: 44, radius: 52, speed: 38, start: 140 },
  { icon: "planet7", name: "Yggdrasill", size: 62, radius: 72, speed: 54, start: 260 },
  { icon: "moon2", name: "Khrono", size: 30, radius: 88, speed: 70, start: 60 },
];

function useTicker() {
  const [prices, setPrices] = useState(() => MINERALS.map((m) => ({ p: m.base, d: 0 })));
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setPrices((prev) =>
        prev.map((x, i) => {
          if (Math.random() < 0.45) return { ...x, d: 0 };
          const base = MINERALS[i].base;
          const next = Math.max(base * 0.5, x.p + (Math.random() - 0.48) * base * 0.12);
          return { p: next, d: Math.sign(next - x.p) };
        })
      );
    }, 1400);
    return () => window.clearInterval(id);
  }, []);
  return prices;
}

export default function EliteSafety() {
  const [line, setLine] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const prices = useTicker();

  const tickerItems = MINERALS.map((m, i) => (
    <span className="tick" key={m.name}>
      <img src={`${E}/${m.icon}.png`} alt="" className="pixel" />
      {m.name}
      <b>{prices[i].p.toFixed(1)}</b>
      <i className={prices[i].d > 0 ? "up" : prices[i].d < 0 ? "down" : "flat"}>
        {prices[i].d > 0 ? "▲" : prices[i].d < 0 ? "▼" : "■"}
      </i>
    </span>
  ));

  return (
    <section id="elite-safety" className="world world-elite" data-scroll>
      <div className="elite-nebula" aria-hidden="true">
        <img src={`${E}/nebula1.png`} alt="" className="pixel n1" />
        <img src={`${E}/nebula2.png`} alt="" className="pixel n2" />
        <img src={`${E}/nebula3.png`} alt="" className="pixel n3" />
      </div>

      {/* ── Intro ─────────────────────────────── */}
      <div className="world-intro elite-intro">
        <div className="intro-copy">
          <p className="world-index" data-reveal>
            01 / 04 · Orbit
          </p>
          <span className="status-pill released" data-reveal>
            Released on Google Play
          </span>
          <h2 className="sr-only">Elite Safety</h2>
          <img
            src={`${E}/gamelogo.png`}
            alt="Elite Safety"
            className="pixel elite-logo"
            data-reveal
          />
          <p className="tagline" data-reveal>
            Mine the galaxy. Keep your workers alive. <em>Mostly.</em>
          </p>
          <p className="lead" data-reveal>
            A mobile space tycoon built in Unity. Buy asteroids, planets and
            whole nebulae, mine minerals of randomized purity, refine them and
            sell them on a market that never sits still. There's just one
            catch: every rock you own is full of people, and they would very
            much like to go home in one piece.
          </p>
          <div className="tag-row" data-reveal>
            <span>Management</span>
            <span>Mobile</span>
            <span>Space Tycoon</span>
            <span>Unity</span>
          </div>
          <div data-reveal>
            <StoreBadge href={LINKS.elitePlay} store="play" />
          </div>
        </div>

        <div className="phone-wrap" data-reveal>
          <img src={`${E}/planet5.png`} alt="" className="pixel float-planet fp1" />
          <img src={`${E}/moon1.png`} alt="" className="pixel float-planet fp2" />
          <img src={`${E}/asteroidminership.png`} alt="" className="pixel float-ship" />
          <div className="phone">
            <img src="/assets/elitesafety.jpg" alt="Elite Safety: surveying the planet Holyphemus" />
          </div>
        </div>
      </div>

      {/* ── John Safety ─────────────────────────── */}
      <div className="john" data-reveal>
        <div className="john-figure">
          <img src={`${E}/johnsafety.png`} alt="John Safety" className="pixel john-sprite" />
          {/* key restarts the animation every time the hat changes state */}
          <img
            key={line === HAT_FALLS ? "falls" : line === HAT_FALLS + 1 ? "back" : "on"}
            src={`${E}/hardhat.png`}
            alt=""
            className={`pixel john-hat ${line === HAT_FALLS ? "falls" : line === HAT_FALLS + 1 ? "back" : ""}`}
          />
        </div>
        <button
          className="speech"
          onClick={() => setLine((l) => (l + 1) % JOHN_LINES.length)}
          aria-live="polite"
        >
          <span className="speech-name">John Safety · Head of Safety</span>
          <span key={line} className="speech-text">
            {JOHN_LINES[line]}
          </span>
          <span className="speech-next">
            {line + 1}/{JOHN_LINES.length} · tap for more ▸
          </span>
        </button>
      </div>

      {/* ── The loop + orbit diorama ─────────────── */}
      <div className="elite-loop">
        <div className="orbit-system" data-reveal aria-hidden="true">
          <img src={`${E}/yellowstar.png`} alt="" className="pixel orbit-sun" />
          {ORBITS.map((o) => (
            <div
              key={o.name}
              className="orbit-ring"
              style={
                {
                  "--r": `${o.radius}%`,
                  "--speed": `${o.speed}s`,
                  "--start": o.start / 360,
                } as React.CSSProperties
              }
            >
              <div className="orbit-arm">
                <div
                  className="orbit-body"
                  onMouseEnter={() => setHovered(o.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <img
                    src={`${E}/${o.icon}.png`}
                    alt=""
                    className="pixel"
                    style={{ width: o.size, height: o.size }}
                  />
                  <span className={`orbit-label${hovered === o.name ? " on" : ""}`}>
                    {o.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <img src={`${E}/planetcargoship1.png`} alt="" className="pixel orbit-cargo" />
        </div>

        <div className="loop-steps">
          <h3 data-reveal>Build an empire, one rock at a time</h3>
          {[
            ["Survey", "Every body hides something: ore deposits, gas pockets, dark matter, “strange readings”. Scan it before you sink money into it."],
            ["Buy & mine", "Asteroids, planets and nebulae, each with its own minerals and purity. Build mines to pull the stuff out."],
            ["Refine", "Refineries multiply what every ton is worth. Mines × refineries × purity × safety = income."],
            ["Expand", "Unlock the star map and jump to new systems, from red dwarfs to neutron stars. Some of them come with a Dyson Sphere."],
          ].map(([t, d], i) => (
            <div className="loop-step" key={t} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="loop-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong>{t}</strong>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stock market ticker ─────────────────── */}
      <div className="ticker" data-reveal>
        <div className="ticker-head">
          <img src={`${E}/stockmarket.png`} alt="" className="pixel" />
          Galactic Mineral Exchange · live*
        </div>
        <div className="ticker-belt">
          <div className="ticker-track">
            {tickerItems}
            {tickerItems}
          </div>
        </div>
        <p className="ticker-note">
          *Live as in “moving”. Not real money. Prices in the game rise, fall
          and occasionally crash, so timing your sales matters.
        </p>
      </div>

      {/* ── Safety ─────────────────────────────── */}
      <div className="safety">
        <div className="safety-head" data-reveal>
          <h3>Safety is the whole point</h3>
          <p>
            Earnings depend on a single number: the safety rating of your
            operation. Keep it high and the money flows. Let it slide and
            strikes, pirates and black markets start showing up.
          </p>
        </div>

        <div className="safety-meter" data-scroll aria-hidden="true">
          <div className="safety-meter-fill" />
          <span>Safety</span>
        </div>

        <div className="upgrade-grid">
          {UPGRADES.map((u, i) => (
            <div
              className="upgrade"
              key={u.name}
              data-reveal
              style={{ transitionDelay: `${(i % 4) * 0.07}s` }}
            >
              <img src={`${E}/${u.icon}.png`} alt="" className="pixel" />
              <strong>{u.name}</strong>
              <small>Unlocks at level {u.tier}</small>
              <p>{u.text}</p>
            </div>
          ))}
        </div>

        <div className="event-grid">
          {EVENTS.map((ev, i) => (
            <div className="event" key={ev.name} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="event-flag">⚠ Event</span>
              <strong>{ev.name}</strong>
              <p>{ev.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Catalogue ─────────────────────────── */}
      <div className="catalogue" data-reveal>
        <h3>Star catalogue</h3>
        <div className="catalogue-row">
          {BODIES.map((b, i) => (
            <figure key={b.name} style={{ animationDelay: `${i * -0.7}s` }}>
              {b.icon === "dysonspere" ? (
                // The sphere is only the frame: in the game it wraps a star.
                <span className="dyson">
                  <img src={`${E}/yellowstar.png`} alt="" className="pixel dyson-star" />
                  <img src={`${E}/${b.icon}.png`} alt="" className="pixel dyson-frame" />
                </span>
              ) : (
                <img src={`${E}/${b.icon}.png`} alt="" className="pixel" />
              )}
              <figcaption>{b.name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="aside-note">
          An update was in the works, then put aside so the team could focus on
          the next big game. Elite Safety is still out there, and it still
          wants you to wear a hat.
        </p>
      </div>
    </section>
  );
}
