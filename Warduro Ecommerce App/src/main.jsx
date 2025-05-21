import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./Route.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import SignOutContextProvider from "./context/SignOut.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./context/CartContext.jsx";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
  

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
     <HelmetProvider>

    <AuthContextProvider>
      
      <CartContextProvider>
        <SignOutContextProvider>
            <AppRouter />
        </SignOutContextProvider>
      </CartContextProvider>
         
    </AuthContextProvider>
     </HelmetProvider>
  </QueryClientProvider>
);
