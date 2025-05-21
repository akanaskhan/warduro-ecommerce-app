import { useContext } from "react";
import { CartContext } from "../context/CartContext";


export default function AddToCartBtn({
    
    style,
    className,
    onClick,
}) {
    const {cartItems, addItemToCart} = useContext(CartContext);
    
  return (
    <button
     className={className ? className : "learn-btn lg:px-3 p-2  rounded"}
    onClick={()=> addItemToCart(data)}
    style={style}
    >Add to cart</button>
  );
}
