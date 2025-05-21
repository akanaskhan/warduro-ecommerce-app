import { Link } from "react-router-dom";
import mens from "../assets/images/mens.png";
import womens from "../assets/images/womens.png";
import tester2 from "../assets/images/customize.png";
import BottomLine from "./BottomLine";




export default function ProductCollection() {
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };
  return (
    <>
      <div className="container mt-24">
        <div className="text-3xl  md:text-3xl  lg:text-3xl xl:text-4xl xxl:text-4xl font-bold my-10 md:my-10 lg:my12 xl:my-12  text-black text-center uppercase  ">

          
          <BottomLine text={'OUR Hoodies COLLECTIONS'} />
        </div>
        <div>
          <div className="grid grid-cols-1 h-2/3  md:grid-cols-2 lg:grid-cols-3 lg:h-full gap-x-4   m-0 p-0">
            <Link to="/mens-perfumes" onClick={scrollToTop}>
            <div className="f-image1 ">
              <div className="f-large ">
                <img className="f-img1 hover-img" src={mens} alt="Mens Collection" />
                <div className="f1-content ">
                  <div className="last-line">
                    <p className="text-3xl hover:underline">
                      Men's Collection
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            <Link to="/womens-hoodies" onClick={scrollToTop}>
            <div className="f-image1 ">
              <div className="f-large ">
                <img className="f-img1 hover-img" src={womens} alt="Womens Collecction" />
                <div className="f1-content ">
                  <div className="last-line">
                    <p className="text-3xl hover:underline">
                      Women's Collection
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            <Link to="/perfume-tester-box" onClick={scrollToTop}>
            <div className="f-image1 ">
              <div className="f-large ">
                <img className="f-img1 hover-img" src={tester2} alt="tester box" />
                <div className="f1-content ">
                  <div className="last-line">
                    <p className="text-3xl hover:underline">
                    Customize Hoodie
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            {/* <Link to="">
            <div className="f-image1 ">
              <div className="f-large ">
                <img className="f-img1 hover-img" src={image1} alt="" />
                <div className="f1-content ">
                  <div className="last-line">
                    <p className="text-3xl hover:underline">
                     Tester Box
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            <Link to="">
            <div className="f-image1 ">
              <div className="f-large ">
                <img className="f-img1 hover-img" src={image1} alt="" />
                <div className="f1-content ">
                  <div className="last-line">
                    <p className="text-3xl hover:underline">
                      Perfume Bundles
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            <Link to="">
            <div className="f-image1 ">
              <div className="f-large ">
                <img className="f-img1 hover-img" src={image1} alt="" />
                <div className="f1-content ">
                  <div className="last-line">
                    <p className="text-3xl hover:underline">
                      Men's Perfume
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link> */}

           
          </div>
        </div>
      </div>
    </>
  );
}
