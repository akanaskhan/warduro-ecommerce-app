import customize from "../assets/images/customize.png";
import CustomizeHoodie2 from "../assets/images/customize.png";
import { Carousel } from "antd";
import { CartContext } from "../context/CartContext";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebase";
import { Spin, Button, Badge, Alert } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AddToCartBtn from "../components/AddToCartBtn";
import Loader from "../loader";
dayjs.extend(relativeTime);

export function CustomizeHoodie() {
  const { addItemToCart, lessQuantityFromCart, isItemAdded, buyNow } =
    useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [CustomizeHoodie, setCustomizeHoodie] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    fetchCustomizeHoodie(
      "Customize, Customize able, Front & Back Customization, Vibrant Prints",
      setCustomizeHoodie
    );
  }, []);

  const fetchCustomizeHoodie = async (ProductCategory, setCustomizeHoodie) => {
    try {
      const prodCollection = collection(db, "WarduroProducts");
      const q = query(
        prodCollection,
        where("ProductCategory", "==", ProductCategory)
      );
      const docs = await getDocs(q);
      const arr = docs.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setCustomizeHoodie(arr);
      setLoader(false);
    } catch (err) {
      console.error("Error fetching customize hoodie", err);
      setLoader(false);
    }
  };
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addItemToCart({ ...data, selectedSize });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 3 seconds
      }, 3000);
      return;
    }

    // WhatsApp message
    const message = `Hey, I want to customize a hoodie. Size: ${selectedSize}`;
    const phoneNumber = "923370791676"; // Replace with your WhatsApp number (e.g., "923001234567")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Check if the user has scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const renderProducts = (products) => (
    <section className="text-gray-600 mt-16 md:mt-20 lg:mt-10 xl:mt-10">
      {showAlert && (
        <Alert
          message="Warning"
          description="Please select a size before adding to the cart."
          type="warning"
          showIcon
          closable
          className={`z-50  top-2 right-1/6 lg:right-1/3 left-1/6 lg:left-1/3 fade-in ${
            isScrolled ? "fixed" : "absolute"
          }`}
          onClose={() => setShowAlert(false)} // Hide alert when closed
        />
      )}
      {products?.map((data) => (
        <div
          key={data?.id}
          className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
        >
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full mb-10 md:mb-0">
            <Carousel effect="fade" autoplay className="rounded">
              <div>
                <img src={customize} className="rounded" />
              </div>
              <div>
                <img src={data?.img} className="rounded" />
              </div>
              <div>
                <img src={customize} className="rounded" />
              </div>
              <div>
                <img src={data?.img} className="rounded" />
              </div>
            </Carousel>
          </div>

          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 sm:w-full flex flex-col md:items-start md:text-left items-center text-center">
            <div className="relative border-b-2 border-gray-100 mb-4">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {data?.title}
                <br className="hidden lg:inline-block" />
              </h1>
              <p className="mb-8 leading-relaxed ">{data?.desc}</p>
              <p className="mb-8 leading-relaxed ">
                For customization contact us on WhatsApp.
              </p>
              <div className=" mt-6 text-center  pb-2 border-b-2 border-gray-100 mb-3">
                <div className="flex ml-6 items-center justify-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      className="rounded border appearance-none border-gray-300 py-2 pl-3 pr-10"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value="">Select Size</option>
                      {data.sizes?.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mb-3 justify-center">
                <del className="text-gray-600 mr-3">
                  {" "}
                  <p className="title-font font-medium text-2xl text-gray-700">
                    Rs. {data?.price}
                  </p>
                </del>
                <p className="title-font font-medium text-2xl text-gray-900">
                  Rs. {data?.SalePrice}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full gap-3">
              <button
                className="w-full  lg:w-2/4 themeBackground  learn-btn transition-all  border-0 py-2 px-6 focus:outline-none  rounded text-lg"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );

  return (
    <div className="container mx-auto">
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Loader className="w-28 h-28" />
        </div>
      ) : (
        <div>
          {CustomizeHoodie.length ? (
            renderProducts(CustomizeHoodie)
          ) : (
            <div className="text-xl text-center">
              <p>Not Found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
