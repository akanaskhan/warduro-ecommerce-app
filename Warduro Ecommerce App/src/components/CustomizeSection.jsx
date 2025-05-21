import { useNavigate } from "react-router-dom";
import { BsArrowClockwise, BsArrowRight, BsArrowUpRightCircle } from "react-icons/bs";
import customize from "../assets/images/customize.png";
import BottomLine from "./BottomLine";


export default function CustomizeSection() {
  const navigate = useNavigate();

  return (
    <div className="bg-black  py-20 -z-50  ">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-alignment">
          <h1 className="text-4xl md:text-6xl font-extrabold whiteText leading-tight">
            Create Your <span className="themeText">Dream Hoodie Design</span>
            
          </h1>

          <p className="text-gray-200 mt-4 text-lg ">
            Design a hoodie that speaks your style. Choose colors, add text, and
            bring your imagination to life with Warduro's customization tools.
          </p>
          <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
            <button
              onClick={() => navigate("/customize-hoodie")}
              className="themeBackground whiteText font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Start Designing <BsArrowUpRightCircle className="inline ml-2 text-2xl" />
            </button>
            <button
              onClick={() => navigate("/products")}
              className="border border-white whiteText font-bold py-3 px-8 rounded-full hover:themeText hover:themeText transition-all"
            >
              Explore Designs
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex justify-center -z-0">
          <div className="relative w-80 h-96 md:w-96 md:h-[28rem]  rounded-lg shadow-xl overflow-hidden">
            <img
              src={customize} // Replace with your hoodie mockup image
              alt="Custom Hoodie Design"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
              <h2 className="text-white text-lg font-semibold">
                Your Design, Your Rules
              </h2>
              <p className="text-gray-300 text-sm">
                Start now and make your hoodie stand out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
