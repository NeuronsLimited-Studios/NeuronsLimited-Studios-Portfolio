"use client";

import { useState } from "react";
import { LINKS } from "./games";
import Sea, { Iceberg } from "./Sea";
import { StatBar, StoreBadge } from "./ui";

const S = "/assets/games/shrimps";

// Values from the shrimp prefabs in the game, in the same order as the in-game selector
// (unlock = account level needed; 1 = available from the start).
const ROSTER = [
  {
    name: "Classic",
    sprite: "classic",
    skin: { name: "Posh Classic", sprite: "poshclassic" },
    ability: "Double Jump",
    anim: "double-jump",
    unlock: 1,
    speed: 10,
    jump: 9,
    hp: 100,
    text: "The original. Jumps twice, asks questions never. Lower first jump, but nobody reaches higher ground.",
  },
  {
    name: "Nigiri",
    sprite: "nigiri",
    skin: { name: "Tuna Nigiri", sprite: "tunanigiri" },
    ability: "Dash",
    anim: "dash",
    unlock: 1,
    speed: 11.5,
    jump: 8.5,
    hp: 100,
    text: "The fastest shrimp on the ice, and it brought its own rice. Dashes through gaps, bullets and bad decisions.",
  },
  {
    name: "Blue Lobster",
    sprite: "bluelobster",
    skin: null,
    ability: "Low Gravity",
    anim: "float",
    unlock: 10,
    speed: 10,
    jump: 8.5,
    hp: 100,
    text: "Technically not a shrimp. Nobody has dared tell it. Falls slower and floats longer than everyone else.",
  },
  {
    name: "Tempura",
    sprite: "tempura",
    skin: { name: "Sauced Tempura", sprite: "saucedtempura" },
    ability: "Teleport",
    anim: "teleport",
    unlock: 30,
    speed: 10,
    jump: 8.5,
    hp: 100,
    text: "Blinks six units ahead in a puff of cyan smoke. Perfect for skipping a gap, or a grenade.",
  },
  {
    name: "Krill",
    sprite: "krill",
    skin: null,
    ability: "Decoy",
    anim: "decoy",
    unlock: 50,
    speed: 10,
    jump: 8.5,
    hp: 85,
    text: "Smallest of the bunch. Mid-air, it spawns an identical decoy with the same weapon: it draws the fire, but its shots don't hurt anyone.",
  },
] as const;

// Damage, bullet speed and recoil from the weapon prefabs
const ARSENAL = [
  { name: "Desert Eagle", sprite: "deserteagle", dmg: 20, spd: 100, rec: 6, text: "The classic shrimp-held hand cannon. High damage, higher recoil." },
  { name: "Shotgun", sprite: "shotgun", dmg: 8, spd: 80, rec: 10, text: "Just a shotgun. Each pellet hurts, the kick hurts more." },
  { name: "A7", sprite: "a7", dmg: 7, spd: 100, rec: 1, text: "Automatic bursts with almost no recoil. Reliable, boring, effective." },
  { name: "Minigun", sprite: "minigun", dmg: 5, spd: 100, rec: 2, text: "A bullet hose. Small damage, ridiculous volume." },
  { name: "Sniper", sprite: "sniper", dmg: 35, spd: 200, rec: 2, text: "Laser-guided. The laser tells everyone where you're aiming." },
  { name: "Gravity Gun", sprite: "gravitygun", dmg: 5, spd: 50, rec: 0, text: "Makes things that weren't supposed to fly, fly." },
  { name: "Bazooka", sprite: "bazooka", dmg: 20, spd: 20, rec: 3, text: "Slow rocket, big boom. Great for pushing someone off their iceberg." },
  { name: "Grenade Launcher", sprite: "grenadelauncher", dmg: 20, spd: 12, rec: 2, text: "Parabolic shots for when they're hiding behind ice." },
  { name: "Size Gun", sprite: "sizegun", dmg: 5, spd: 50, rec: 0, text: "Changes the size of whatever it hits. Big shrimp, small shrimp." },
  { name: "Grenade", sprite: "grenade", dmg: 0, spd: 0, rec: 0, text: "Pull, count, throw. Bounces off ice, sinks in water." },
];

const RULES = [
  { icon: `${S}/deserteagle.png`, title: "Grab a weapon", text: "Weapons spawn across the map. First come, first shot." },
  { icon: `${S}/classic.png`, title: "Push", text: "Unarmed? Shove enemies away and deflect incoming bullets back." },
  { icon: `${S}/iceberg1.png`, title: "Mind the ice", text: "Icebergs float and tilt under your weight. Stand on the edge at your own risk." },
  { icon: "/assets/games/dtn/drop1.png", title: "Don't fall in", text: "Shrimps can't swim. Well, they can. Not these ones." },
];

export default function Shrimps() {
  const [pick, setPick] = useState(0);
  const [skin, setSkin] = useState(false);
  const shrimp = ROSTER[pick];
  const sprite = skin && shrimp.skin ? shrimp.skin.sprite : shrimp.sprite;

  return (
    <section id="shrimps" className="world world-shrimps" data-scroll>
      {/* ── Hero: sky, icebergs and sea ───────── */}
      <div className="sh-hero" data-scroll>
        <div className="sh-sky" aria-hidden="true">
          <div className="sh-bg" />
          <Sea top="var(--sea)" reflect={`${S}/iceberg-bg.png`} glints={36} />
          <Iceberg src={`${S}/iceberg2.png`} name="iceberg2" top="var(--sea)" className="sh-berg b2">
            <img src={`${S}/tempura.png`} alt="" className="pixel sh-side-shrimp b2-tempura" />
            <div className="sh-launcher">
              <img src={`${S}/bazooka.png`} alt="" className="pixel bz-loaded" />
              <img src={`${S}/bazooka-empty.png`} alt="" className="pixel bz-empty" />
              <img src={`${S}/rocket.png`} alt="" className="pixel bz-rocket" />
            </div>
          </Iceberg>
          <Iceberg src={`${S}/iceberg2.png`} name="iceberg2" top="var(--sea)" className="sh-berg b1">
            <img src={`${S}/nigiri.png`} alt="" className="pixel sh-side-shrimp b1-nigiri" />
            <img src={`${S}/shotgun.png`} alt="" className="pixel sh-side-gun b1-shotgun" />
          </Iceberg>
          <Iceberg src={`${S}/iceberg1.png`} name="iceberg1" top="var(--sea)" className="sh-berg hero">
            <img src={`${S}/classic.png`} alt="" className="pixel sh-hero-shrimp" />
            <img src={`${S}/deserteagle.png`} alt="" className="pixel sh-hero-gun" />
          </Iceberg>
        </div>

        <div className="sh-hero-copy">
          <p className="world-index" data-reveal>
            03 / 04 · Sea level
          </p>
          <span className="status-pill released" data-reveal>
            Released on Google Play · v0.2.9
          </span>
          <h2 className="sh-title" data-reveal aria-label="Shrimps">
            {"SHRIMPS".split("").map((c, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.12}s` }} aria-hidden="true">
                {c}
              </span>
            ))}
          </h2>
          <p className="tagline" data-reveal>
            Armed shrimp, up to their claws.
          </p>
          <p className="sh-quote" data-reveal>
            “It's like Worms, but better. But not at all.”
          </p>
          <div data-reveal>
            <StoreBadge href={LINKS.shrimpsPlay} store="play" />
          </div>
        </div>
      </div>

      {/* ── How to play ───────────────────────── */}
      <div className="sh-block sh-howto">
        <h3 className="sh-big" data-reveal>
          The last shrimp standing wins.
          <br />
          <span>The others go to the bottom.</span>
        </h3>
        <p className="lead" data-reveal>
          A real-time PvP platformer for up to four players online. Open a
          private room with a code or jump into a quick match, pick your shrimp
          and fight on maps that move under your feet. The last survivor takes
          the round, then everyone moves on to the next map. Every kill, combo
          and win earns XP: climb up to level 100 to unlock new shrimps.
        </p>
        <div className="rule-grid">
          {RULES.map((r, i) => (
            <div className="rule" key={r.title} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
              <img src={r.icon} alt="" className="pixel" />
              <strong>{r.title}</strong>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Roster ────────────────────────────── */}
      <div className="sh-block sh-roster">
        <h3 className="sh-section-title" data-reveal>
          Choose your shrimp
        </h3>
        <div className="roster" data-reveal>
          <div className="roster-tabs" role="tablist" aria-label="Shrimps">
            {ROSTER.map((r, i) => (
              <button
                key={r.name}
                role="tab"
                aria-selected={pick === i}
                className={pick === i ? "on" : undefined}
                onClick={() => {
                  setPick(i);
                  setSkin(false);
                }}
              >
                <img src={`${S}/${r.sprite}.png`} alt="" className="pixel" />
                <span>{r.name}</span>
              </button>
            ))}
          </div>

          <div className="roster-stage" role="tabpanel">
            <div className={`roster-show anim-${shrimp.anim}`} key={`${pick}-${skin}`}>
              <div className="roster-platform" />
              <img src={`${S}/${sprite}.png`} alt={shrimp.name} className="pixel roster-sprite" />
              {shrimp.anim === "decoy" && (
                <img src={`${S}/${sprite}.png`} alt="" className="pixel roster-sprite roster-ghost" />
              )}
              {shrimp.anim === "teleport" && <span className="tp-puff" />}
              {shrimp.anim === "dash" && <span className="dash-streak" />}
            </div>

            <div className="roster-info" key={`info-${pick}`}>
              <span className="ability-pill">Ability · {shrimp.ability}</span>
              {shrimp.unlock > 1 && <span className="ability-pill">Unlocks at level {shrimp.unlock}</span>}
              <h4>{skin && shrimp.skin ? shrimp.skin.name : shrimp.name}</h4>
              <p>{shrimp.text}</p>
              <div className="roster-stats">
                <StatBar label="Speed" value={shrimp.speed} max={12} />
                <StatBar label="Jump" value={shrimp.jump} max={10} />
                <StatBar label="Health" value={shrimp.hp} max={100} />
              </div>
              {shrimp.skin && (
                <button className="skin-toggle" onClick={() => setSkin((v) => !v)}>
                  {skin ? `◂ Back to ${shrimp.name}` : `Try the ${shrimp.skin.name} skin ▸`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Arsenal ───────────────────────────── */}
      <div className="sh-block sh-arsenal">
        <h3 className="sh-section-title" data-reveal>
          The arsenal of shell-fish destruction
        </h3>
        <div className="arsenal">
          {ARSENAL.map((w, i) => (
            <div className={`weapon weapon-${w.sprite}`} key={w.name} data-reveal style={{ transitionDelay: `${(i % 5) * 0.06}s` }}>
              <div className="weapon-art">
                <img src={`${S}/${w.sprite}.png`} alt="" className="pixel" />
                {w.sprite === "bazooka" ? (
                  <span className="launch">
                    <span className="launch-smoke" />
                    <img src={`${S}/rocket.png`} alt="" className="pixel" />
                  </span>
                ) : w.dmg > 0 ? (
                  <span className="muzzle" />
                ) : (
                  <span className="boom">
                    <span className="boom-ring" />
                    <span className="boom-fire" />
                    <span className="boom-smoke" />
                    {Array.from({ length: 8 }, (_, k) => (
                      <i key={k} style={{ "--a": `${k * 45 + 20}deg` } as React.CSSProperties} />
                    ))}
                  </span>
                )}
              </div>
              <strong>{w.name}</strong>
              <p>{w.text}</p>
              {w.dmg > 0 ? (
                <div className="weapon-stats">
                  <StatBar label="DMG" value={w.dmg} max={35} />
                  <StatBar label="SPD" value={w.spd} max={200} />
                  <StatBar label="KICK" value={w.rec} max={10} />
                </div>
              ) : (
                <div className="weapon-stats thrown">Thrown · area damage</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Maps ──────────────────────────────── */}
      <div className="sh-block sh-maps">
        <h3 className="sh-section-title" data-reveal>
          Maps that fight back
        </h3>
        <div className="maps">
          <div className="map-card map-ice" data-reveal>
            <div className="map-art" aria-hidden="true">
              <Sea top="68%" glints={14} />
              <Iceberg src={`${S}/iceberg6.png`} name="iceberg6" top="68%" className="mb-tall" />
              <Iceberg src={`${S}/iceberg1.png`} name="iceberg1" top="68%" className="mb-mid" />
              <Iceberg src={`${S}/iceberg2.png`} name="iceberg2" top="68%" className="mb-right" />
            </div>
            <div className="map-copy">
              <strong>Icebergs</strong>
              <p>
                Floating chunks of ice that tilt as shrimps land on them. Push
                someone onto the edge and let physics do the rest.
              </p>
            </div>
          </div>
          <div className="map-card map-harbor" data-reveal>
            <div className="map-art" aria-hidden="true">
              <img src={`${S}/crane.png`} alt="" className="pixel crane" />
              <div className="crane-load">
                <span className="cable" />
                <img src={`${S}/cranespreader.png`} alt="" className="pixel" />
                <img src={`${S}/bluecontainer.png`} alt="" className="pixel" />
              </div>
              <div className="stack">
                <img src={`${S}/redcontainer.png`} alt="" className="pixel" />
                <img src={`${S}/greencontainer.png`} alt="" className="pixel" />
                <img src={`${S}/yellowcontainer.png`} alt="" className="pixel" />
              </div>
              <div className="dock">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <Sea top="74%" glints={14} />
            </div>
            <div className="map-copy">
              <strong>
                Harbor <em className="new">New in v0.2.9</em>
              </strong>
              <p>
                Shipping containers, a dock and a crane that actually works: it
                moves its load across the map whether you're standing under it
                or not.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Get it ────────────────────────────── */}
      <div className="sh-block sh-get">
        <div className="sh-cta" data-reveal>
          <StoreBadge href={LINKS.shrimpsPlay} store="play" />
          <a href={LINKS.shrimpsCaseStudy} target="_blank" rel="noopener noreferrer" className="text-link">
            Read the full case study by M-Tre Consulting →
          </a>
        </div>
      </div>
    </section>
  );
}
