import FeatureBox from "../../components/HomePage/FeatureBox";
import { IoMdPin } from "react-icons/io";
import { RiProgress5Line } from "react-icons/ri";
import { FaShareAlt } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { PiCityFill } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="pn-10 mx-auto flex h-fit w-full max-w-[1200px] flex-col items-center justify-center px-4 pt-20"
    >
      <h2 className="text-3xl font-bold tracking-wide text-blue-700">
        Main Features
      </h2>
      <div className="flex w-full flex-wrap justify-center gap-4 py-4">
        <FeatureBox>
          <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
            <IoMdPin size={30} color="#4a6cf7" />
          </div>
          <h3 className="text-left text-2xl font-bold text-[#252a35]">
            Report Location
          </h3>
          <p className="text-start text-[#8890a0]">
            Location based reports help ease citizen and officer
          </p>
        </FeatureBox>
        <FeatureBox>
          <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
            <RiProgress5Line size={30} color="#4a6cf7" />
          </div>
          <h3 className="text-left text-2xl font-bold text-[#252a35]">
            Know Progress
          </h3>
          <p className="text-start text-[#8890a0]">
            Know how Executives response toward all those reports
          </p>
        </FeatureBox>
        <FeatureBox>
          <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
            <FaShareAlt size={30} color="#4a6cf7" />
          </div>
          <h3 className="text-left text-2xl font-bold text-[#252a35]">
            Share problems
          </h3>
          <p className="text-start text-[#8890a0]">
            Ineffective reports might need more attention
          </p>
        </FeatureBox>
        <FeatureBox>
          <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
            <FaFilter size={30} color="#4a6cf7" />
          </div>
          <h3 className="text-left text-2xl font-bold text-[#252a35]">
            Filter news
          </h3>
          <p className="text-start text-[#8890a0]">
            Never miss any news about academic, sport, and others
          </p>
        </FeatureBox>
        <FeatureBox>
          <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
            <PiCityFill size={30} color="#4a6cf7" />
          </div>
          <h3 className="text-left text-2xl font-bold text-[#252a35]">
            Area Exclusive
          </h3>
          <p className="text-start text-[#8890a0]">
            Never miss any news in your neighbourhood
          </p>
        </FeatureBox>
        <FeatureBox>
          <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
            <IoIosPeople size={30} color="#4a6cf7" />
          </div>
          <h3 className="text-left text-2xl font-bold text-[#252a35]">
            Community driven
          </h3>
          <p className="text-start text-[#8890a0]">
            Everyone can report, Officer will response
          </p>
        </FeatureBox>
      </div>
    </section>
  );
};

export default FeaturesSection;
