import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../utils/firebase"; 
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { user } = useContext(AuthContext); 
  const [cartItems, setCartItems] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const itemsFromStorage = localStorage.getItem("cartItems");
    if (itemsFromStorage) {
      try {
        const parsedItems = JSON.parse(itemsFromStorage);
        setCartItems(Array.isArray(parsedItems) ? parsedItems : []);
      } catch (error) {
        console.error("Failed to parse cart items from localStorage:", error);
        setCartItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if (user && user.uid) {
      syncCartWithFirestore(cartItems);
    }
  }, [cartItems, user]);

  const syncCartWithFirestore = async (cart) => {
    if (!user || !user.uid) return;
    try {
      setLoader(true);
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { cart });
      setLoader(false);
    } catch (error) {
      console.error("Error syncing cart with Firestore:", error);
      setLoader(false);
    }
  };

  function addItemToCart(product) {
    const arr = [...cartItems];
    const itemIndex = arr.findIndex((data) => data.id === product.id);
    if (itemIndex === -1) {
      arr.push({ ...product, quantity: 1 });
    } else {
      arr[itemIndex].quantity++;
    }
    setCartItems(arr);
  }

  const buyNow = (item) => {
    addItemToCart(item);
    // Navigate to checkout if needed
  };

  function removeItemFromCart(id) {
    const arr = cartItems.filter((data) => data.id !== id);
    setCartItems(arr);
  }

  function lessQuantityFromCart(id) {
    const arr = [...cartItems];
    const itemIndex = arr.findIndex((data) => data.id === id);
    if (itemIndex !== -1 && arr[itemIndex].quantity > 1) {
      arr[itemIndex].quantity--;
      setCartItems(arr);
    } else if (itemIndex !== -1) {
      removeItemFromCart(id);
    }
  }

  function isItemAdded(id) {
    return cartItems.find((data) => data.id === id) || null;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        buyNow,
        removeItemFromCart,
        lessQuantityFromCart,
        isItemAdded,
        loader,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
