import HeroSlider from "@/components/Home/HeroSlider";
import InfoRibbon from "@/components/Home/InfoRibbon";
import { heroSlides } from "@/config/heroData";
import { infoItems } from "@/config/infoItems";

export default function HomePage() {
  return (
    <div className="pb-20 space-y-20">
      {/* Hero Banner Section Container Block */}
      <section className="">
        <HeroSlider slides={heroSlides} />
        <InfoRibbon infoItems={infoItems} />
      </section>
    </div>
  );
}
