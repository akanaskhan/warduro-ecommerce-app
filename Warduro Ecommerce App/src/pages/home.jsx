import Slider from "/src/components/Slider";
import Intro from "/src/components/Intro";
import GetProducts from "../components/GetProducts";
import ScrollAnimation from "react-animate-on-scroll";
import CustomizeSection from "../components/CustomizeSection";
import ChooseSection from "../components/ChooseSection";
import ProductCollection from "../components/ProductCollection";
import GetMensHoodies from "../components/GetMensHoodies";
import GetWomensHoodies from "./GetWomensHoodies";
import UnderDevelopment from "../components/UnderDevelopment";

function Home() {
  
  return (
    <>
    {/* <UnderDevelopment/> */}
      <Slider />
      <Intro />
      <GetProducts />
      <GetMensHoodies/>
      <GetWomensHoodies/>
      <CustomizeSection />
      <ChooseSection />
    </>
  );
}

export default Home;
