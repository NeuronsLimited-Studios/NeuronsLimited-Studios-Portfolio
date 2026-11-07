/**
 * Directive: Carina is still a prototype.
 * false → the page only shows a "coming soon" teaser;
 * true  → the full section (sonar, crew stations, threats, roadmap…).
 */
export const CARINA_UNLOCKED = false;

/** The four games, in descent order (top of the page → bottom). */
export const GAMES = [
  {
    id: "elite-safety",
    name: "Elite Safety",
    status: "Out on Google Play",
    color: "#8f7bff",
    icon: "/assets/games/elite/planet1.png",
  },
  {
    id: "down-to-nothing",
    name: "Down to Nothing",
    status: "Out on itch.io",
    color: "#ffb52e",
    icon: "/assets/games/dtn/yellowstar.png",
  },
  {
    id: "shrimps",
    name: "Shrimps",
    status: "Out on Google Play",
    color: "#ff5a4e",
    icon: "/assets/games/shrimps/classic.png",
  },
  {
    id: "directive-carina",
    name: "Directive: Carina",
    status: CARINA_UNLOCKED ? "In development" : "Coming soon",
    color: "#3dffd0",
    icon: "/assets/games/carina/sub.svg",
  },
] as const;

export const LINKS = {
  shrimpsPlay:
    "https://play.google.com/store/apps/details?id=com.NeuronsLimitedStudios.Shrimps",
  elitePlay:
    "https://play.google.com/store/apps/details?id=com.NeuronsLimitedStudios.EliteSafety",
  dtnItch: "https://neuronslimited-studios.itch.io/down-to-nothing",
  discord: "https://discord.gg/B9P6v8KmRM",
  youtube: "https://www.youtube.com/@NeuronsLimitedStudios",
  instagram: "https://www.instagram.com/neuronslimitedstudios",
  itch: "https://neuronslimited-studios.itch.io/",
  coffee: "https://buymeacoffee.com/neuronslimitedstudios",
  shrimpsCaseStudy: "https://mtre-consulting.it/progetti/shrimps",
};
