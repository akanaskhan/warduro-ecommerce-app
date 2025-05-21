import React from "react";
import { Button } from "antd";
import intro from "../assets/images/intro.png";
import logoText from "../assets/images/logo text.svg";
import { Link } from "react-router-dom";

function Intro() {
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };
  return (
    <>
      {/* <div className="mt-10  sm:mt-20 lg:mt-28 mb-10  sm:mb-20 lg:mb-28">
      <div className="main ">
        <div className="container ">
          <div className="row main-content items-center">
            <div className="left-main   col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6  py-lg-4 py-xl-5 py-xxl-5">
              <div className="main-heading">
                <p>Warduro</p>
              </div>
              <div>
                <p className=" font-semibold my-2">
                  Where Style meets Simplicity
                </p>
              </div>
              <div className="col-xxl-9">
                <p className="para">
                  Discover hoodies that redefine comfort and elevate your style.
                  At WARDURO, we craft high-quality, trend-forward hoodies using
                  premium fabrics designed to last. Perfect for all seasons, our
                  collection blends modern aesthetics with ultimate comfort.
                  Shop now for exclusive designs and nationwide delivery!
                </p>
              </div>
              <div className="mt-3 my-4">
                <Link to="/about-us" onClick={scrollToTop}>
                  <button className="btn  learn-btn themeBackground transition-all">
                    Learn More...
                  </button>
                </Link>
              </div>
            </div>
            <div className="right-main img-div col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <img className="main-img rounded" src={intro} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div> */}
        {/* <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0  lg:text-left  ">
              <h1 className="title-font lg:text-4xl text-3xl mb-2 font-bold blackText ">
                Warduro
              </h1>
              <p className=" font-semibold leading-relaxed  ">
                Where Style meets Simplicity
              </p>
              <p className="mb-8 leading-relaxed ">
                Discover hoodies that redefine comfort and elevate your style. At
                WARDURO, we craft high-quality, trend-forward hoodies using
                premium fabrics designed to last. Perfect for all seasons, our
                collection blends modern aesthetics with ultimate comfort. Shop
                now for exclusive designs and nationwide delivery!
              </p>
              <div className="flex justify-center">
                <Link to="/about-us" onClick={scrollToTop}>
                  <button className="inline-flex text-white learn-btn  border-0 py-2 px-6 focus:outline-none  rounded text-lg">
                    Learn More...
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className="object-cover object-center rounded"
                alt="heroImage"
                src=
                {intro }
            //  "/src/assets/images/intro.png"
            />
            </div>
          </div>
        </section> */}

<section className="text-white body-font bg-black -z-10  ">
      <div className="container  flex justify-between  px-5 py-24 md:flex-row flex-col items-center">
        {/* Left Section: Text and Button */}
        <div className="lg:flex md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 xl:text-left  lg:text-left text-alignment">
          <h1 className="title-font text-4xl md:text-6xl  leading-tight mb-2 lg:mb-3 font-extrabold themeText uppercase">
            Warduro
          </h1>
          <p className="font-semibold text-lg text-white mb-2 lg:mb-5">
            Where Style Meets Simplicity
          </p>
          <p className="mb-8 leading-relaxed text-gray-300 flex text-justify ">
            Discover hoodies that redefine comfort and elevate your style. At
            WARDURO, we craft high-quality, trend-forward hoodies using premium
            fabrics designed to last. Perfect for all seasons, our collection
            blends modern aesthetics with ultimate comfort. Shop now for exclusive
            designs and nationwide delivery!
          </p>
          <div className="flex justify-center md:justify-start">
            <Link to="/about-us">
              <button className="inline-flex text-black btn learn-btn themeBackground  border-0 py-3 px-6 focus:outline-none rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
                Learn More...
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-6/6">
          <img
            className="object-cover object-center rounded shadow-lg"
            alt="heroImage"
            src={intro}
          />
        </div>
      </div>
    </section>
    </>
  );
}

export default Intro;
