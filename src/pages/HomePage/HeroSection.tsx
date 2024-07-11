import { NavLink } from "react-router-dom";
import SvgBottomLeft from "./SvgBottomLeft";
import { TypeAnimation } from "react-type-animation";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <section className="relative h-[600px] w-full">
      <SvgBottomLeft />
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center py-4">
          <h1 className="text-3xl font-bold tracking-wide text-blue-700">
            NReport
          </h1>
          <h2 className="text-blue-700">Neighbourhood Report</h2>
        </div>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Report what is going on in your neighbourhood",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Dirty Place?",
            1000,
            "Dirty Place? Burning Trash?",
            1000,
            "Dirty Place? Burning Trash? Broken Lane?",
            1000,
          ]}
          wrapper="h3"
          className="max-w-[70vw] text-center"
          speed={50}
          repeat={Infinity}
        />

        <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 md:gap-8 md:py-12">
          <NavLink to="/reports" className="group">
            <button className="relative aspect-square h-auto w-[150px] rounded-lg md:w-[200px]">
              <div className="absolute -inset-[1px] aspect-auto h-auto w-[152px] rounded-lg bg-gradient-to-tr from-blue-400 to-purple-900 blur-sm duration-200 ease-in group-hover:blur md:w-[202px]" />
              <div className="relative flex h-full w-full flex-col items-center justify-between rounded-lg bg-white p-4 md:p-8">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold uppercase text-blue-800">
                    reports
                  </h2>
                  <FaMapMarkedAlt size={45} color="#60a5fa" />
                </div>
                <p className="text-xs">Report the location here!</p>
              </div>
            </button>
          </NavLink>
          <NavLink to="/news" className="group">
            <button className="relative aspect-square h-auto w-[150px] rounded-lg md:w-[200px]">
              <div className="absolute -inset-[1px] aspect-auto h-auto w-[152px] rounded-lg bg-gradient-to-tr from-blue-400 to-purple-900 blur-sm duration-200 ease-in group-hover:blur md:w-[202px]" />
              <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-white">
                <div className="relative flex h-full w-full flex-col items-center justify-between rounded-lg bg-white p-4 md:p-8">
                  <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold uppercase text-blue-800">
                      News
                    </h2>
                    <FaRegNewspaper size={45} color="#60a5fa" />
                  </div>
                  <p className="text-xs">Know your neighbourhood better!</p>
                </div>
              </div>
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
