import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import logo from "../assets/images/logo.svg";

export default function Footer() {
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="flex flex-col">
            <Link to="/" onClick={() => { navigate("/"); scrollToTop(); }} className="m-0 p-0" >
              <img className="w-20  p-0 " src={logo} alt="Warduro Logo" />
            </Link>
            <p className="uppercase text-[#FFAA00] font-bold mb-2 text-2xl mt-0 pt-0">Warduro</p>
            <p className="text-sm leading-relaxed">
              Discover hoodies that redefine comfort and elevate your style. At WARDURO, we craft high-quality, trend-forward hoodies using premium fabrics designed to last.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold text-[#FFAA00] mb-4 flex flex-col  items-start md:items-center lg:items-center xl:items-center">Quick Links</p>
            <ul className="space-y-2   flex flex-col  items-start md:items-center lg:items-center xl:items-center">
              <li className="nav-line"><Link to="/home" onClick={scrollToTop} className="hover:text-[#FFAA00]">Home</Link></li>
              <li  className="nav-line"><Link to="/mens-hoodies" onClick={scrollToTop} className="hover:text-[#FFAA00]">Men's Hoodies</Link></li>
              <li  className="nav-line"><Link to="/womens-hoodies" onClick={scrollToTop} className="hover:text-[#FFAA00]">Women's Hoodies</Link></li>
              <li  className="nav-line"><Link to="/about-us" onClick={scrollToTop} className="hover:text-[#FFAA00]">About Us</Link></li>
              <li  className="nav-line"><Link to="/contact-us" onClick={scrollToTop} className="hover:text-[#FFAA00]">Contact Us</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className=" ">
            <p className="font-bold text-[#FFAA00] mb-4 flex flex-col  items-start md:items-center lg:items-center xl:items-center ">Policies</p>
            <ul className="space-y-2 flex flex-col  items-start md:items-center lg:items-center xl:items-center  ">
              <li className="nav-line"><Link to="/refund-and-exchange-policy" onClick={scrollToTop} className="hover:text-[#FFAA00]">Refund Policy</Link></li>
              <li className="nav-line"><Link to="/privacy-policy" onClick={scrollToTop} className="hover:text-[#FFAA00]">Privacy Policy</Link></li>
              <li className="nav-line"><Link to="/terms-and-conditions" onClick={scrollToTop} className="hover:text-[#FFAA00]">Terms & Conditions</Link></li>
              <li className="nav-line"><Link to="/blog" onClick={scrollToTop} className="hover:text-[#FFAA00]">Blog</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center lg:text-right ">
            <p className="font-bold text-[#FFAA00] mb-4">Follow Us</p>
            <div className="flex justify-center  space-x-4">
              <a href="https://www.facebook.com/warduro-61560668013222" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-white hover:text-[#FFAA00] text-2xl transition-transform transform hover:scale-110" />
              </a>
              <a href="https://www.instagram.com/warduro_official" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white hover:text-[#FFAA00] text-2xl transition-transform transform hover:scale-110" />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=923370791676" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="text-white hover:text-[#FFAA00] text-2xl transition-transform transform hover:scale-110" />
              </a>
              <a href="https://www.tiktok.com/@warduro" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="text-white hover:text-[#FFAA00] text-2xl transition-transform transform hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} - Warduro. All Rights Reserved.</p>
          <a href="https://www.linkedin.com/in/muhammad-anas-khan786" target="_blank">
            Developed by{" "}
            <span className="underline text-[#FFAA00]">Anas Khan</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
