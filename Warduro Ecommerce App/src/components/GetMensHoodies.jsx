import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebase";
import { Spin, Button, Badge } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CartContext } from "../context/CartContext";
import AddToCartBtn from "../components/AddToCartBtn";
import Loader from "../loader";
import SaleBadge from "../components/SaleBadge";
dayjs.extend(relativeTime);
import { BsArrowUpRightCircle } from "react-icons/bs";
import BottomLine from "./BottomLine";


export default function GetMensHoodies() {
  const [mensHoddies, setMensHoddies] = useState([]);
  const [loader, setLoader] = useState(true);
  const { addItemToCart, isItemAdded } = useContext(CartContext);
  const [imageLoaded, setImageLoaded] = useState({});
  useEffect(() => {
    fetchCategoryProducts("Men's", setMensHoddies);
  }, []);

  // Function to fetch products by category
  const fetchCategoryProducts = async (category, setProducts) => {
    try {
      const prodCollection = collection(db, "WarduroProducts");
      const q = query(
        prodCollection,
        where("category", "==", category)
      );
      const docs = await getDocs(q);
      const arr = docs.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setProducts(arr);
      setLoader(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoader(false);
    }
  };
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };
  const handleImageLoad = (id) => {
    setTimeout(() => {
      setImageLoaded((prev) => ({ ...prev, [id]: true }));
    }, 2000); // Simulate 2-second loading delay
  };
  const renderProducts = (products) => (
    <div
    className=" flex overflow-x-auto gap-3 items-center -z-0"
    onClick={scrollToTop}
  >

    {products?.map((data) => (
      <Link
        to={`/products/${data.id}`}
        key={data.id}
        className="hover:text-black  "
      >
        <div className="shadow-md  rounded  h-full  relative w-52 lg:w-72 -z-0 ">
          <SaleBadge />
          <div className="image-box rounded-sm">
            {!imageLoaded[data.id] ? (
              <div className="flex justify-center items-center h-full w-full">
             {/* <Loader className="w-8 h-8" />{" "} */}
              <Loader  />
              </div>
            ) : (
              <img
                src={data?.img}
                alt={data?.title}
                className="rounded opacity-0 transition-opacity duration-1000 ease-in-out"
                onLoad={(e) => {
                  e.target.classList.add("opacity-100");
                }}
              />
            )}
            {!imageLoaded[data.id] && handleImageLoad(data.id)}
          </div>
          <div className="p-2 pt-1 sm:pt-0 xl:pt-4 lg:pt-4 md:pt-2 pb-0 ">
            <p className="font-semibold line-clamp-1">
              {data?.title}
            </p>
            <div className="flex justify-between flex-col mb-2">
              <h1 className="my-1 line-clamp-1">{data?.category}</h1>
              <h1 className="text-gray-600 line-clamp-1">
                Quality: {data?.ProductCategory}
              </h1>
              <div className="flex gap-2 front-page-price text-lg ">
                <p className="font-bold mt-2 text-gray-600">
                  <del>Rs. {data?.price}/-</del>
                </p>
                <p className="font-bold mt-2 themeText">
                  Rs. {data?.SalePrice}/-
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
    <Link to={'/mens-hoodies'}>
    <Button
      onClick={() => {
        scrollToTop();
      }}
      className="themeBackground border-none p-2 scale-100 hover:scale-105 text-white ml-4 transition-all text-sm md:text-sm d-lg-none"
      >
      See All
      <BsArrowUpRightCircle className="text-lg" />
    </Button>
      </Link>

  </div>
  );

  return (
    <div className="container mx-auto">
      {loader ? (
        <div className="flex h-screen justify-center items-center">
           <Loader className="w-2 h-2" />
        </div>
      ) : (
        <div className=" mt-16 md:mt-12 lg:mt-16 xl:mt-16">
          <div className="flex justify-center my-6 lg:my-10 text-center items-center ">
                
                <BottomLine text={"Men's Hoodies"} className="text-3xl  md:text-3xl  lg:text-3xl xl:text-4xl xxl:text-4xl font-bold text-black " />
                
          </div>

        
          {mensHoddies.length ? (
            renderProducts(mensHoddies)
          ) : (
            <div className="text-xl text-center">

            <p>No men's hoodies available.</p>
            </div>
          )}

          
        </div>
      )}
    </div>
  );
}

