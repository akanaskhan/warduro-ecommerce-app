import React, { useState, useEffect, useContext } from 'react';
import aboutImage from "../assets/images/customize.png"; // Replace with your own image
import Loader from '../loader';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { db } from '../utils/firebase';
import SaleBadge from '../components/SaleBadge';
import { Spin } from 'antd';

const AboutUs = () => {
  const aboutData = {
    title: "About Warduro",
    sections: [
      {
        title: "Who We Are",
        content: "At Warduro, we specialize in providing high-quality custom hoodies. We are a passionate team that focuses on delivering premium and normal quality hoodies, perfect for every occasion. Our services extend to personalized designs, allowing you to add your unique touch to every hoodie. Whether you want a simple logo or a full custom print, we bring your ideas to life with precision and care."
      },
      {
        title: "What We Do",
        content: "We offer two types of hoodie collections—premium and normal quality—both crafted for ultimate comfort and style. Our premium collection uses the finest fabrics for a luxurious feel, while our normal collection is perfect for those who want a stylish hoodie at a great price. In addition, we provide full customization options, from custom logos to unique designs, making sure your hoodie is as unique as you are."
      },
      {
        title: "Why Choose Warduro?",
        content: "Warduro stands out for its commitment to quality, creativity, and customer satisfaction. We take pride in using only the best materials for our hoodies and provide a seamless customization process. Whether you're looking for a hoodie for yourself, your team, or an event, our goal is to create a product that reflects your personal style. We offer nationwide delivery and a smooth online shopping experience, ensuring you get the best hoodie, no matter where you are."
      },
      {
        title: "Our Promise",
        content: "Our promise is to deliver hoodies that not only meet but exceed your expectations. We ensure every hoodie is made with the utmost attention to detail, from fabric selection to the final print. With Warduro, you can trust that you're getting a high-quality product that will stand the test of time."
      },
    ],
    image: aboutImage, // Replace with an actual image of your hoodies
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(aboutData);
  }, []);

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
      const q = query(prodCollection, orderBy("createdAt", "desc"), limit(3));
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


  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="about-us-container container bg-gray-50   md:px-12  mt-24 md:mt-20 lg:mt-28 xl:mt-28">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-black mb-6">{data.title}</h1>
        <p className="text-lg text-gray-600 mb-6">
          High-quality, customizable hoodies made just for you.
        </p>
        <a
          href="/shop"
          className="inline-flex items-center justify-center text-white bg-[#FFAA00] hover:bg-[#FF9A00] border-0 py-3 px-8 focus:outline-none rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Shop Now
        </a>
      </div>

      {/* Product Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-black mb-4">Premium Quality Hoodies</h2>
          <p className="text-gray-600 mb-4">
            Our premium collection features the finest fabrics and craftsmanship. These hoodies are designed for comfort, style, and longevity. Ideal for those who want to experience the luxury of high-end fashion.
          </p>
          <a
            href="/premium-hoodies"
            className="text-[#FFAA00] hover:text-[#FF9A00] text-lg font-semibold"
          >
            Explore Premium Collection
          </a>
        </div>
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-black mb-4">Normal Quality Hoodies</h2>
          <p className="text-gray-600 mb-4">
            Our normal quality hoodies offer great value without compromising on style. Made from durable materials, they are perfect for everyday wear and available in a variety of colors and designs.
          </p>
          <a
            href="/normal-hoodies"
            className="text-[#FFAA00] hover:text-[#FF9A00] text-lg font-semibold"
          >
            Explore Normal Collection
          </a>
        </div>
      </div>

      {/* Customization Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-black mb-6">Customize Your Hoodie</h2>
        <p className="text-lg text-gray-600 mb-6">
          Express yourself! Our hoodie customization service lets you design your perfect hoodie. Whether it’s a unique logo, a catchy phrase, or a full design, we’ll make sure it’s exactly how you envision it.
        </p>
        <Link to="/customize-hoodie">
        <buttom
         onClick={scrollToTop}
          className="inline-flex items-center justify-center text-white bg-[#FFAA00] hover:bg-[#FF9A00] border-0 py-3 px-8 focus:outline-none rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
          Start Customizing
        </buttom>
          </Link>
      </div>

      {/* Product Showcase Section */}
      <div className="mb-16">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((data) => (
  <Link
    to={`/products/${data.id}`}
    key={data.id}
    className="hover:text-black"
  >
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        {!imageLoaded[data.id] ? (
          <div className="flex justify-center items-center h-56 bg-gray-200">
            <Loader className={'w-16 h-16'} />
          </div>
        ) : (
          <img
            src={data?.img}
            alt={data?.title}
            className="w-full h-auto object-cover rounded opacity-0 transition-opacity duration-1000 ease-in-out"
            onLoad={(e) => {
              e.target.classList.add("opacity-100");
            }}
          />
        )}
        {!imageLoaded[data.id] && handleImageLoad(data.id)}
        <SaleBadge />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-black mb-4">
          {data?.title || "Premium Hoodie"}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {data?.desc || "A cozy, stylish hoodie made from premium fabric. Perfect for chilly days."}
        </p>
        <div className="flex gap-2 front-page-price text-lg mb-4">
          <p className="font-bold text-gray-600">
            <del>Rs. {data?.price || "0"}/-</del>
          </p>
          <p className="font-bold themeText">
            Rs. {data?.SalePrice || "0"}/-
          </p>
        </div>
        <Link
          to={`/products/${data.id}`}
          className="inline-flex items-center justify-center text-white bg-[#FFAA00] hover:bg-[#FF9A00] border-0 py-2 px-6 focus:outline-none rounded-lg text-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  </Link>
))}

      

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
