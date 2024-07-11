import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import SvgTopRight from "./SvgTopRight";

const HomePage = () => {
  return (
    <div className="relative grow pt-20">
      <SvgTopRight />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
