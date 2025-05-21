import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState, createContext, useContext } from "react";
import { db } from "../utils/firebase";
// import { categories } from "../../utils/categories";
import { Button, Spin } from "antd";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; 
import ScrollAnimation from "react-animate-on-scroll";
import { CartContext } from "../context/CartContext";
import AddToCartBtn from "../components/AddToCartBtn";
import Loader from "../loader";
import SaleBadge from "../components/SaleBadge";
import BottomLine from "../components/BottomLine";
dayjs.extend(relativeTime);

function AllProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getProducts();
  }, []);
  const { cartItems, addItemToCart, isItemAdded } = useContext(CartContext);
  // console.log("cartItems:==> ", cartItems);

  const getProducts = async () => {
    try {
      const prodCollection = collection(db, "WarduroProducts");
      const q = query(prodCollection, orderBy("createdAt", "desc"));
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
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };
  return (
    <>
      {loader ? (
        <div
          className="flex h-screen
  justify-center items-center"
        >
          <Loader className="w-28 h-28" />{" "}
        </div>
      ) : (
        <div className="container mx-auto mt-24 md:mt-20 lg:mt-28 xl:mt-28">
          <div >
            <div className="flex justify-center my-4 text-center items-center">
              <BottomLine text={'All Hoodies'} className={'text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-black '}/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 my-8 " >
              {products?.map((data) => (
                <div
                  className="shadow-md rounded-md overflow-hidden relative"
                  key={data?.id}
                  
                >
                  <SaleBadge/>
                  {loader ? (
                    <div className="flex h-screen justify-center items-center">
                      <Loader className="" />{" "}
                    </div>
                  ) : (
                    <Link to={`/products/${data?.id}`} key={data.id}>
                      <div className="rounded">
                        <div className="image-box rounded w-auto " onClick={scrollToTop}>
                          <img src={data?.img} className="hover-img" />
                        </div>
                      </div>
                    </Link>
                  )}
                  <div className=" bg-white z-50">
                    <div className="p-2">
                      <h1 className=" font-semibold seach-category">{data?.title}</h1>
                      <h1 className="text-sm">{data?.category}</h1>
                      <div className="flex gap-2 justify-between  mb-1 ">
                     
                        <h1 className="font-semibold my-1.5 text-gray-600"><del>Rs. {data?.price}/-</del></h1>
                        
                        <h1 className="font-semibold my-1.5 themeText">Rs. {data?.SalePrice}/-</h1>

                       
                      </div>
                      <button
                        className="learn-btn transition-all  rounded w-full py-2 text-sm md:text-base lg:text-base xl:text-base "
                        onClick={() => addItemToCart(data)}
                      >
                        {isItemAdded(data.id)
                          ? `Added in your cart`
                          : `Add to Cart`}
                      </button>
                    </div>
                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllProducts;
