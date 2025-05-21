import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import SaleBadge from "./SaleBadge";
import Loader from "../loader";
import BottomLine from "./BottomLine";

function GetProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({}); // Track loading status for each image

  const { cartItems, addItemToCart, isItemAdded } = useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const prodCollection = collection(db, "WarduroProducts");
      const q = query(prodCollection, orderBy("createdAt", "desc"), limit(5));
      const docs = await getDocs(q);
      const arr = [];
      docs.forEach((product) =>
        arr.push({ ...product.data(), id: product.id })
      );
      setProducts([...arr]);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const handleImageLoad = (id) => {
    setTimeout(() => {
      setImageLoaded((prev) => ({ ...prev, [id]: true }));
    }, 2000); // Simulate 2-second loading delay
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  return (
    <>
      {loader ? (
        <div className="flex h-screen justify-center items-center ">
       
          <Loader className="w-28 h-28" />{" "}
        </div>
      
      ) : (
        <div className="container mx-auto -z-50   ">
          <div className="mb-1">
            <div className="flex justify-center items-center">
              <h1 className="text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold my-10 md:my-10 lg:my12 xl:my-12 ">
                {/* Our Hoodies */}
                <BottomLine text={"Our Hoodies"} />
              </h1>
              <Button
                onClick={() => {
                  navigate("/products");
                  scrollToTop();
                }}
                className="bg-black border-none p-1 py-1 scale-100 hover:scale-105 text-white ml-4 transition-all text-xs md:text-sm hidden md:visible lg:visible xl:visible"
              >
                See All
                <BsArrowUpRightCircle />
              </Button>
            </div>
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
                        <div className="flex justify-center items-center h-full">
                       {/* <Loader className="w-8 h-8" />{" "} */}
                       <Spin size="small" className="text-black " />
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
              <Button
                onClick={() => {
                  navigate("/products");
                  scrollToTop();
                }}
                className="themeBackground border-none p-2 scale-100 hover:scale-105 text-white ml-4 transition-all text-sm md:text-sm d-lg-none"
              >
                See All
                <BsArrowUpRightCircle className="text-lg" />
              </Button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GetProducts;
