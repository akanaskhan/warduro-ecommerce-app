import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Badge, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth, db } from "../utils/firebase";
import { getAuth, signOut } from "firebase/auth";
import { CgShoppingCart } from "react-icons/cg";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../context/CartContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { data } from "autoprefixer";
import logo from "../assets/images/logo.svg";
import { ConfigProvider, Flex, Popover } from "antd";
import { BiShoppingBag, BiUser } from "react-icons/bi";
import { PiMagnifyingGlassLight } from "react-icons/pi";
function NavBar() {
  const [expanded, setExpanded] = useState(false); // State to track toggle status
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  const toggleIcon = (setState) => {
    setState((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { cartItems } = useContext(CartContext);
  const addProduct = () => {
    if (user.isLogin) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const auth = getAuth();
  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        message.success("Log Out successful.");
      })
      .catch((error) => {
        console.log("signout error", error);
      });
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  const content = (
    <div className="flex flex-col text-left  p-0 m-0 ">
      {auth.currentUser ? (
        <>
          <Link
            to="/user-orders"
            className="bg-white p-1  lg:text-lg  text-left text-gray-700 font-semibold   hover:text-black"
          >
            <button>Your Orders</button>
          </Link>
          <button
            className="bg-white p-1  lg:text-lg  text-left text-gray-700 font-semibold   hover:text-black"
            onClick={HandleSignOut}
          >
            Log Out
          </button>
        </>
      ) : (
        <Link to="/login" className=" p-0 m-0">
          <button className=" p-1  lg:text-lg text-left text-gray-700 font-semibold    hover:text-black">
            Login
          </button>
        </Link>
      )}
    </div>
  );
  const [hover, setHover] = useState();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const prodCollection = collection(db, "WarduroProducts");
      const q = query(prodCollection, orderBy("createdAt", "desc"));
      const docs = await getDocs(q);
      const arr = [];
      docs.forEach((product) =>
        arr.push({ ...product.data(), id: product.id })
      );
      setProducts(arr);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  const showProducts = products.filter((data) =>
    data.title.toLowerCase().includes(search.toLowerCase())
  );
  const handleProductClick = (data) => {
    setShowDropdown(false); // Collapse dropdown
    navigate(`/products/${data.id}`); // Navigate to detail page
  };
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };
  const handleToggle = () => {
    // Check if the screen width is below large (e.g., 1024px for large screens)
    if (window.innerWidth < 1024) {
      toggleIcon(setIsOpen4);
      setExpanded(expanded ? false : true);

      // Scroll to top for Safari, Chrome, Firefox, IE, and Opera
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    }
  };
  document.addEventListener("click", () => {
    setShowDropdown(false);
  });


  const [isSticky, setIsSticky] = useState(false); // State to track sticky navbar
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset); // Track previous scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Determine if the navbar should be sticky
      setIsSticky(currentScrollPos > prevScrollPos && currentScrollPos > 50);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  return (
    <div className={`navbar-container bg-black themeShadow  ${isSticky ? "fade-in" : ""}`}>
    <div className="container ">
      {/* <div className="marquees">
        <section className="marquee text-sm md:text-sm lg:text-sm tracking-widest font-bold text-black">
          <div className="marquee--inner">
            <p>
              UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF
            </p>
            <p aria-hidden="true">
            UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF
            </p>
            <p aria-hidden="true">
            UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF
            </p>
            <p aria-hidden="true">
            UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF
            </p>
            <p aria-hidden="true">
            UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF. UPTO 50% OFF
            </p>
          </div>
        </section>
      </div> */}
    

      <Navbar expand="lg" className="bg-black nav-bar items-center  " expanded={expanded}>
        {/* <Container> */}
        {/* <div className="container-none lg:container flex justify-between w-full"> */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setExpanded(expanded ? false : true)} // Toggle state
            aria-controls="basic-navbar-nav"
            aria-expanded={expanded}
            style={{ padding: "0", margin: "0px" }}
          >
            <div
              id="nav-icon4"
              className={isOpen4 ? "open" : ""}
              onClick={() => toggleIcon(setIsOpen4)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <Navbar.Brand
            className="mx-auto text-white  w-12 md:w-18 lg:w-16"
            href="/"
          >
            <img className="text-white" src={logo} alt="Logo" />
          </Navbar.Brand>

          <div className="d-lg-none flex justify-center items-center mb-0 p-0">
            <Link to={"/cart"} className=" mb-0 p-0" >
              <Badge
                count={cartItems.length}
                className={cartItems.length > 0 ? "mr-1.5 " : "m-0 pb-0  "}
              >
                  <BiShoppingBag className="themeText   bg-transparent border-none m-0  pr-0 py-0 mb-0 pb-0  text-2xl"/>
                {/* <i className="fa-solid fa-cart-shopping  themeText fa-lg cursor-pointer m-2" /> */}
              </Badge>
            </Link>

            <ConfigProvider className="p-0 m-0 items-center">
              <Popover placement="bottomRight" content={content}  className="p-0 m-0 items-center">
                  {/* <i className="fa-solid fa-user themeText text-md  cursor-pointer  z-50" /> */}
                  <BiUser className="themeText text-2xl  cursor-pointer  z-50" />
                
              
              </Popover>
            </ConfigProvider>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto ml-0 lg:ml-10 xl:ml-10 items-center">
              <div
                href=""
                className="text-white nav-line nav-link"
                onClick={handleToggle}
              >
                <Link to="/">
                  <div className="">Home</div>
                </Link>
              </div>
              <div
                href=""
                className="text-white  nav-line nav-link"
                onClick={handleToggle}
              >
                <Link to="/mens-hoodies">
                  <div className="">Men's Hoodies</div>
                </Link>
              </div>
              <div
                href=""
                className="text-white  nav-line nav-link"
                onClick={handleToggle}
              >
                <Link to="/womens-hoodies">
                  <div className="">Women's Hoodies</div>
                </Link>
              </div>
              <div
                href=""
                className="text-white  nav-line nav-link"
                onClick={handleToggle}
              >
                <Link to="/customize-hoodie">
                  <div className="">Customize hoodie</div>
                </Link>
              </div>
              <div
                href=""
                className="text-white  nav-line nav-link"
                onClick={handleToggle}
              >
                <Link to="/about-us">
                  <div className="">About Us</div>
                </Link>
              </div>
              <div
                href=""
                className="text-white  nav-line nav-link"
                onClick={handleToggle}
              >
                <Link to="/contact-us">
                  <div className="">Contact Us</div>
                </Link>
              </div>
              <div className="relative d-lg-none mt-3">
                <input
                  type="search"
                  className="text-black  p-1.5 overflow-hidden  w-56 pr-7 pl-3 rounded-2xl focus:outline-none focus:border-none themeBackground placeholder:text-black"
                  placeholder="Search  here..."
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                    setShowDropdown(value.trim().length > 0); // Show dropdown only if search has content
                  }}
                />
                <button className="absolute top-1 right-1.5">
                <PiMagnifyingGlassLight className="cursor-pointer  text-2xl whiteText "/>
                </button>
                {showDropdown && (
                  <div className="size-96 z-50 absolute bg-white border mt-1 rounded-xl w-56 max-h-64 overflow-y-auto">
                    {showProducts.map((data) => (
                      //  <Link to={`/products/${data.id}`} >
                      <div
                        key={data.id}
                        onClick={() => handleProductClick(data)}
                        className="my-1 mx-1 py-2 border-b "
                      >
                        <div className="flex ">
                          <img
                            className="img p-1   rounded-xl  h-20 object-cover"
                            src={data.img}
                            alt={data.title}
                          />
                          <div className="pl-1.5  content-center blackText">
                            <p className=" font-semibold line-clamp-1">
                              {data.title}
                            </p>
                            <p className="text-sm seach-category">
                              {data.category}
                            </p>
                            <p className="text-sm">Rs. {data.price}/-</p>
                          </div>
                        </div>
                      </div>
                     
                    ))}
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>

          <div className="d-sm-none d-lg-block sm-icon ms-auto ">
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="search"
                  className="p-1.5 themeBackground text-black  overflow-hidden w-56 pr-7 pl-3 rounded-2xl focus:outline-none focus:border-none placeholder:text-black"
                  placeholder="Search here..."
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                    setShowDropdown(value.trim().length > 0); // Show dropdown only if search has content
                  }}
                />
                <button className="absolute top-1 right-1.5">
                <PiMagnifyingGlassLight className="cursor-pointer  text-2xl blackText "/>
                </button>

                {showDropdown && (
                  <div className="size-96 z-50 absolute text-black  bg-white border mt-1 rounded-xl w-56 max-h-64 overflow-y-auto">
                    {showProducts.map((data) => (
                      <div
                        key={data.id}
                        onClick={() => handleProductClick(data)}
                        className="my-1 mx-1 py-2 border-b"
                      >
                        <div className="flex " >
                          <img
                            className="img p-1 rounded-xl h-20 object-cover"
                            src={data.img}
                            alt={data.title}
                          />
                        <div className="pl-1.5 content-center blackText " style={{color : 'black !important'}}>
                            <p className="font-semibold line-clamp-1 ">
                              {data.title}
                            </p>
                            <p className="text-sm seach-category">
                              {data.category}
                            </p>
                            <p className="text-sm">Rs. {data.SalePrice}/-</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Badge
                count={cartItems.length}
                className={cartItems.length > 0 ? "mr-2" : "mr-0"}
              >
                <div>
                  <Link to={"/cart"}>
                  <BiShoppingBag className="themeText  ml-2 text-3xl cursor-pointer"/>
                  </Link>
                </div>
              </Badge>
              <ConfigProvider>
                <Popover placement="bottomRight" content={content}>
                  <Button className="bg-transparent border-none m-0 pl-0.5 pr-0 text-lg">
                    {/* <i className="fa-solid fa-user themeText text-md  cursor-pointer  z-50" /> */}
                    <BiUser className="themeText text-3xl  cursor-pointer  z-50" />
                  </Button>
                </Popover>
              </ConfigProvider>
             
            </div>
          </div>
          {/* </div> */}
        {/* </Container> */}
      </Navbar>
    </div>
    </div>
  );
}

export default NavBar;
