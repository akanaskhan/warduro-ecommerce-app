import { FaHandsHelping } from "react-icons/fa";
import { TbArrowsExchange, TbTruckDelivery } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import BottomLine from "./BottomLine";

export default function ChooseSection() {
  return (
    <div className="themeBackground py-16  ">
      <div className="container mx-auto px-4">
        <h2 className="text-center whiteText text-3xl md:text-5xl font-extrabold uppercase tracking-wide">
          
          <BottomLine text={'Why Choose Warduro?'} TextColor="var(--bs-white)" lineColor="var(--bs-black)" />
        </h2>
        <p className="text-center text-gray-200 mt-4 max-w-2xl mx-auto">
          Discover the reasons why Warduro stands out as your go-to choice for premium hoodies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Feature 1 */}
          <FeatureCard
            icon={<MdVerified className="text-6xl themeText" />}
            title="Premium Quality Assurance"
            description="Our hoodies are crafted with the finest materials for comfort and durability."
          />

          {/* Feature 2 */}
          <FeatureCard
            icon={<TbArrowsExchange className="text-6xl themeText" />}
            title="Hassle-Free Returns"
            description="Exchange or return your purchase within 30 days with ease."
          />

          {/* Feature 3 */}
          <FeatureCard
            icon={<FaHandsHelping className="text-6xl themeText" />}
            title="24/7 Customer Support"
            description="Dedicated support team to assist you anytime, anywhere."
          />

          {/* Feature 4 */}
          <FeatureCard
            icon={<IoIosTimer className="text-6xl themeText" />}
            title="All-Day Comfort"
            description="Designed for style and comfort that lasts all day long."
          />

          {/* Feature 5 */}
          <FeatureCard
            icon={<TbTruckDelivery className="text-6xl themeText" />}
            title="Fast Delivery"
            description="Get your order delivered quickly and reliably to your doorstep."
          />

          {/* Feature 6 */}
          <FeatureCard
            icon={<MdVerified className="text-6xl themeText" />}
            title="Customizable Options"
            description="Create your own unique hoodie with our customization features."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
      <div className="icon-wrapper mb-4">{icon}</div>
      <h3 className="text-lg font-semibold blackText">{title}</h3>
      <p className="text-gray mt-2">{description}</p>
    </div>
  );
}
