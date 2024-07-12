import { AboutSection } from "./AboutSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import SvgTopRight from "./SvgTopRight";

const HomePage = () => {
  return (
    <div id="home" className="relative grow pt-20">
      <SvgTopRight />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
    </div>
  );
};

export default HomePage;
