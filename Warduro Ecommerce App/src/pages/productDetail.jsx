import { useNavigate, useParams, Link } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CartContext } from "../context/CartContext";
import AddToCartBtn from "../components/AddToCartBtn";
import { Alert, Spin } from "antd";
import { Button, Image } from "antd";
import NotFound from "../pages/notfound";
import Loader from "../loader";
import { AuthContext } from "../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(""); // State to store selected size
  const { addItemToCart, isItemAdded, buyNow } = useContext(CartContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "WarduroProducts", id);
        const productInfo = await getDoc(docRef);
        if (productInfo.exists()) {
          setProduct(productInfo.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Check if the user has scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader className="w-28 h-28" />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowAlert(true); // Show the alert
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 3 seconds
      }, 3000);
      return;
    }
    addItemToCart({ ...product, selectedSize });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowAlert(true); // Show the alert
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 3 seconds
      }, 3000);

      return;
    } else if (selectedSize && !user) {
      alert("Please login.");
      return;
    } else {
      navigate("/checkout");
      return;
    }
    buyNow({ ...product, selectedSize });
  };
  return (
    <section className="text-gray-600 body-font overflow-hidden mt-16 md:mt-20 lg:mt-20 xl:mt-20">
        {showAlert && (
          <Alert
            message="Warning"
            description="Please select a size before adding to the cart."
            type="warning"
            showIcon
            closable
            className={`z-50  top-2  right-1/6 lg:right-1/3 left-1/6 lg:left-1/3 fade-in ${
              isScrolled ? "fixed" : "absolute"
            }`}
            onClose={() => setShowAlert(false)} // Hide alert when closed
          />
        )}
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 w-full  mx-auto flex flex-wrap lg:flex-row">
          <div className="lg:w-1/2  w-full h-full ">
            <Image
              alt={product.title}
              style={{ width: "100%" }}
              className="lg:w-1/2 md:w-full md:h-full lg:h-full w-full  h-64 object-cover object-center rounded"
              src={product?.img}
            />
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              For {product?.category}
            </h2>
            <h1 className="text-black text-3xl title-font font-medium mb-1">
              {product?.title}
            </h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.ProductCategory}
            </h2>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 themeText"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 themeText"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 themeText"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 themeText"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 themeText"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 pb-0 border-l-2 border-gray-200 space-x-2s ">
                <a
                  className=""
                  href="https://www.facebook.com/warduro-61560668013222"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook text-xl  " />
                </a>
                <a
                  className="text-gray-500 "
                  href="https://api.whatsapp.com/send/?phone=923370791676"
                  target="_blank"
                >
                  <i className="fa-brands fa-whatsapp  text-gray-500 text-xl mx-2 " />
                </a>
                <a
                  className="text-gray-500"
                  href="https://www.instagram.com/warduro_official"
                  target="_blank"
                >
                  <i className="fa-brands fa-instagram  text-xl text-gray-500" />
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product?.desc}</p>
            <div className=" mt-6  pb-2 border-b-2 border-gray-100 mb-3">
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    className="rounded border appearance-none border-gray-300 py-2 pl-3 pr-10"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">Select Size</option>
                    {product.sizes?.map((size, index) => (
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
              <div className="flex gap-2 mt-3">
                <del className="text-gray-600">
                  {" "}
                  <p className="title-font font-medium text-2xl text-gray-700">
                    Rs. {product?.price}
                  </p>
                </del>
                <p className="title-font font-medium text-2xl text-gray-900">
                  Rs. {product?.SalePrice}
                </p>
              </div>
            </div>
            <div className="">
              <button
                className="learn-btn lg:px-3 p-2 w-full  rounded transition-all sticky bottom-1"
                onClick={handleAddToCart}
              >
                {isItemAdded(id)
                  ? `Added in your cart


`
                  : `Add to Cart`}
              </button>

              <button
                className="learn-btn lg:px-3 p-2 my-3 w-full  rounded transition-all themeBackground"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
