import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="projects">
        <ProjectCard
          title="Shrimps"
          description="A fast-paced 2D multiplayer game where you control a heavily armed shrimp. Collect weapons spawning across the map, shoot opponents, and fight to survive. When unarmed, use a push mechanic to deflect bullets and shove enemies away. Every shrimp features unique abilities like a double jump, dash, or teleport. The last survivor wins the round before switching maps. Watch out for the water! Coming soon to Google Play."
          statusLabel="IN DEVELOPMENT"
          statusType="in-development"
          features={["Multiplayer", "Action 2D", "Unique Abilities"]}
          image="/assets/shrimps.jpg"
          imageAlt="Shrimps gameplay screenshot"
          reversed
          contentHoverImage="/assets/Placeholder-shrimps.png"
        />

        <ProjectCard
          title="DIRECTIVE: CARINA"
          description="A multiplayer horror game set in the depths of the ocean. Work together with your crew to survive whatever lurks beneath the surface, where every dive brings you further from safety and closer to something watching in the dark."
          statusLabel="IN DEVELOPMENT"
          statusType="in-development"
          features={["Multiplayer", "Horror", "Ocean"]}
          image="/assets/carina.png"
          imageAlt="carina game screenshot"
          contentHoverImage="/assets/Placeholder-carina.png"
          //downloadButtonImage="/assets/googleplaydownloadbutton.png"
          //downloadButtonLink="https://play.google.com/store/apps/details?id=com.NeuronsLimitedStudios.DirectiveCarina"
          //downloadButtonAlt="Get it on Google Play"
        />

        <ProjectCard
          title="Down to Nothing"
          description="Everything ends up as nothing. You're just speeding it up. Made for Genial gamejam 2026 - Reach the Limit"
          statusLabel="Released on itch.io"
          statusType="released"
          features={["Game-Jam", "Action 2D", "Unique Story"]}
          image="/assets/downtonothing.png"
          imageAlt="Down to Nothing gameplay screenshot"
          reversed
          contentHoverImage="/assets/Placeholder-downtonothing.png"
          downloadButtonImage="/assets/releaseditchbutton.png"
          downloadButtonLink="https://neuronslimited-studios.itch.io/down-to-nothing"
          downloadButtonAlt="Get it on itch.io"
        />

        <ProjectCard
          title="Elite Safety"
          description="A mobile space tycoon developed using the Unity platform. Players build an empire by buying and mining asteroids and planets, each featuring unique minerals with randomized purity. Earnings are calculated dynamically based on mineral types, mine and refinery counts, and vital safety ratings. Safety is a core mechanic influenced by upgrades like protective helmets, safety alarms, oxygen tanks, and safety training. An updated was being worked on but was put aside to work on our next big game. Elite Safety is available to be downloaded on the Google Play Store."
          statusLabel="Released on Google Play"
          statusType="released"
          features={["Management", "Mobile", "Space Tycoon"]}
          image="/assets/elitesafety.jpg"
          imageAlt="Elite Safety game screenshot"
          portrait
          contentHoverImage="/assets/Placeholder-elitesafety.png"
          downloadButtonImage="/assets/googleplaydownloadbutton.png"
          downloadButtonLink="https://play.google.com/store/apps/details?id=com.NeuronsLimitedStudios.EliteSafety"
          downloadButtonAlt="Get it on Google Play"
        />
      </section>
    </>
  );
}