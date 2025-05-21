import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Image } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import BottomLine from "../components/BottomLine";
import { Helmet } from "react-helmet-async";

function Cart() {
  const { cartItems, removeItemFromCart, addItemToCart, lessQuantityFromCart } =
    useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.SalePrice,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, obj) => total + obj.quantity,
    0
  );

  return (
    <div className="container-sm mx-auto mb-5 mt-24 md:mt-20 lg:mt-28 xl:mt-28">
      <Helmet>
        <title>Your Cart - Warduro</title>
        <meta name="description" content="View and manage the items in your cart. Checkout your favorite Warduro products easily." />
        <meta name="keywords" content="Warduro, cart, shopping cart, hoodies, checkout" />
        <meta name="author" content="Warduro" />
        <meta property="og:title" content="Your Cart - Warduro" />
        <meta property="og:description" content="Manage your Warduro cart and prepare for checkout." />
        <meta property="og:url" content="https://www.warduro.com/cart" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.warduro.com/assests/images/intro.png" />
      </Helmet>
      <div className="text-center my-4 md:my-6 lg:my-8 xl:my-8">
         <BottomLine text={'Your Cart'} className={'font-bold text-3xl  md:text-3xl lg:text-3xl xl:text-3xl'}/>
         
      </div>
          {
            cartItems.length > 0 ? (
               <div className="flex  gap-2 lg:gap-5 sm:mb-2  md:mb-4 lg:mb-5 xl:mb-8 xxl:mb-5  mt-3 ">
        <div className="flex-grow flex flex-col rounded border p-2.5 md:p-3  lg:p-4 xl:p-4 justify-center items-center     text-center ">
          <h1 className="">Total Qty</h1>
          <h1 className="font-semibold  mt-2 text-md md:text-xl lg:text-3xl xl:text-3xl text-center">
            {totalQuantity}
          </h1>
        </div>
        <div className="flex-grow flex flex-col rounded border p-2.5 md:p-3  lg:p-4 xl:p-4 justify-center items-center  text-center ">
          <h1>Total Amount</h1>
          <h1 className="font-semibold tracking-wider  mt-2 text-md md:text-xl lg:text-3xl xl:text-3xl text-center">
            Rs {Math.round(totalAmount)}/-
          </h1>
        </div>

        <Link
          to="/checkout"
          className="flex-grow flex align-middle whiteText text-md md:text-xl lg:text-xl    rounded  border p-2.5 md:p-3  lg:p-4 xl:p-4 justify-center items-center scale-100  themeBackground hover:text-white transition-all text-center "
        >
          <div className="text-center flex">
            <h1 className="">Checkout
            </h1>
               <BsArrowUpRightCircle className=" p-0 ml-1"></BsArrowUpRightCircle>
          </div>
        </Link>
      </div>
            ):(
              ` `
            )}
          
     
      {
        cartItems.length > 0 ? (
          <div className="h-96 overflow-y-scroll my-2 px-2  cartInnerShadow drop-shadow-xl rounded-2xl cart ">

      {cartItems.map((data, index) => (
        <div
          key={data?.id || `cart-item-${index}`} 
          className="flex items-center border my-2  p-3 rounded  text-md  "
        >
          <div className= "rounded  min-w-20 max-w-full  h-auto min-h-20   max-h-44 object-contain overflow-hidden   size-10" >

          <Image className="rounded  min-w-20 max-w-52 h-auto min-h-20 max-h-max  object-contain " src={data?.img}  />
          </div>
        
          <div className="flex flex-col pl-5 me-auto  ">
            <h1 className="font-semibold  mb-1 line-clamp-1">
              {data?.title} {`(${data?.category})`}
            </h1>
            <p className="  line-clamp-1 lg:line-clamp-2 xl:line-clamp-2  w-full lg:w-2/4  mb-2">{data.desc}</p>
            <h1 className=" font-bold mb-2">Price : {data?.SalePrice}/-</h1>
            
          </div>
          <div className="text-center items-center flex flex-col ">
            <div className="ms-auto">

          <h1 className="  mb-2">Quantity:</h1>
            <div className="flex gap-2 items-center">
              <Button
                onClick={() => addItemToCart(data)}
                icon={<PlusOutlined />}
                className="border border-black text-black w-2 h-7"
                ></Button>

              <h1 className="">{data.quantity}</h1>
              <Button
                danger
                className="border border-black text-black w-4 h-8"
                icon={<MinusOutlined />}
                onClick={() => lessQuantityFromCart(data?.id)}
                disabled={data?.quantity === 1}
                ></Button>
            </div>
                </div>
          <div className="flex justify-end flex-row">

            <Button
              onClick={() => removeItemFromCart(data?.id)}
              danger
              className=" m-2"
              >
              <RiDeleteBin6Line className=" "  />
              {/* Remove item{" "} */}
            </Button>
              </div>
          </div>
        </div>
      ))}
      </div>
        ):(
          <div className="text-xl text-center flex justify-center items-center   blackText h-52  ">
              <p>Your cart is currently empty.</p>
            </div>
        )
      }
    
    </div>
  );
}

export default Cart;
