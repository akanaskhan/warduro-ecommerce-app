import Customize from "../assets/images/customize.png";
import banner from "../assets/images/banner.png";
import previous2 from "../assets/images/previous2.png";
import NewYearBanner from "../assets/images/new-year-banner.png";
import previous from "../assets/images/previous.png";
import previous3 from "../assets/images/previous3.png";
function Slider() {
  return (
    <div className="-z-50 mt-16 md:mt-20 lg:mt-12 xl:mt-12   h-vh themeBackground ">
      <div
        id="carouselExampleAutoplaying"
        className="carousel    carousel-fade   h-auto "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner carousel ">
          <div className="carousel-item active h-auto ">
            <img
              src={banner}
              className="d-block w-full object-cover h-full  "
              alt="..."
            />
          </div>
         
          <div className="carousel-item   h-auto ">
            <img
              src={banner}
              className="d-block w-full object-cover h-full"
              alt="..."
            />
          </div>
          <div className="carousel-item h-auto ">
            <img
              src={banner}
              className="d-block w-full object-cover h-full"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        ></button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        ></button>
      </div>
    </div>
  );
}

export default Slider;
