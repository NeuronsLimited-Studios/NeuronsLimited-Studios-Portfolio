import ScrollFX from "@/components/home/ScrollFX";
import Starfield from "@/components/home/Starfield";
import DescentHud from "@/components/home/DescentHud";
import HomeHero from "@/components/home/HomeHero";
import EliteSafety from "@/components/home/EliteSafety";
import DownToNothing from "@/components/home/DownToNothing";
import Shrimps from "@/components/home/Shrimps";
import Carina from "@/components/home/Carina";
import "./home.css";

export default function HomePage() {
  return (
    <div className="descent">
      <Starfield />
      <ScrollFX />
      <DescentHud />
      <HomeHero />
      <EliteSafety />
      <DownToNothing />
      <Shrimps />
      <Carina />
    </div>
  );
}
