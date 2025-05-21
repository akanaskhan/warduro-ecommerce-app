import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebase.js";
import { Spin, Button, Badge } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CartContext } from "../context/CartContext.jsx";
import AddToCartBtn from "../components/AddToCartBtn.jsx";
import Loader from "../loader.jsx";
import ThemeButton from "../components/ThemeButton.jsx";
import SaleBadge from "../components/SaleBadge.jsx";
import BottomLine from "../components/BottomLine.jsx";
import { Helmet } from "react-helmet-async";
dayjs.extend(relativeTime);

function WomensHoodies() {
  const [femaleHoodies, setFemaleHoodies] = useState([]);
  const [loader, setLoader] = useState(true);
  const { addItemToCart, isItemAdded } = useContext(CartContext);

  useEffect(() => {
    fetchCategoryProducts("Women's", setFemaleHoodies);
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
  

  const renderProducts = (products) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 my-8">
      {products?.map((data) => (
                    // <Badge.Ribbon text="Sale" color="red" key={data.id} className="">


        <div className=" rounded-md overflow-hidden sale-ribbon shadow-md relative" key={data.id}>
          <SaleBadge/>
          <Link to={`/products/${data?.id}`}>
            <div className="image-box rounded">
              
              <img src={data?.img} alt={data?.title} className="hover-img" />
            </div>
          </Link>
          <div className=" bg-white z-50">
                    <div className="p-2">
                      <h1 className=" font-semibold seach-category">{data?.title}</h1>
                      <h1 className="text-sm">For {data?.category}</h1>
                      <div className="flex gap-2 justify-between  mb-0 ">
                     
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
              // </Badge.Ribbon>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Women's Hoodies - Warduro</title>
        <meta name="description" content="Explore the best collection of men's hoodies at Warduro. Premium quality and trendy designs for all seasons." />
        <meta name="keywords" content="men's hoodies, hoodies for men, stylish hoodies, Warduro men's collection" />
        <meta name="author" content="Warduro" />
        <meta property="og:title" content="Women's Hoodies - Warduro" />
        <meta property="og:description" content="Shop the latest Women's hoodies at Warduro. Perfect for casual wear and trendy styles." />
        <meta property="og:url" content="https://www.warduro.com/mens-hoodies" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.warduro.com/assests/images/intro.png" />
      </Helmet>
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Loader className="w-28 h-28" />
        </div>
      ) : (
        <div className=" mt-24 md:mt-20 lg:mt-28 xl:mt-28">
          <div className="flex justify-center my-6 lg:my-10 text-center items-center">
        <BottomLine text={`Women's Hoodies`} className={"text-2xl  md:text-3xl  lg:text-3xl xl:text-4xl xxl:text-4xl font-bold text-black"}/>
          </div>

          

         
          {femaleHoodies.length ? (
            renderProducts(femaleHoodies)
          ) : (
            <div className="text-xl text-center my-96">

            <p>No Women's hoodies available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WomensHoodies;
