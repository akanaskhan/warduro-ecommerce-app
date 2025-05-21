import { Button, message } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [icon, setIcon] = useState(eyeOff);

  const [type, setType] = useState("password");

  const handleSignIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        console.log(user);
        if(
          (auth.currentUser?.uid) === (import.meta.env.VITE_USER_UID) ||
          (auth.currentUser?.uid) === (import.meta.env.VITE_USER2_UID)){
            message.success("Admin Login Successfully")
            navigate("/admin")
          
        }else{
          navigate("/");
          message.success("Login Successfully")

        }
        
      })
      .catch((error) => {
        setError(error.message);
        message.error("Invalid Email/Pasword")
      });
     
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className="flex justify-center  login-background-image h-screen items-center  ">
      <div className=" p-7  rounded-xl  border border-black  shadow-2xl drop-shadow-2xl bg-black ">
        <div className="text-center mb-4">
          <p className="text-white font-extrabold text-3xl underline ">LOGIN</p>
        </div>

        <form onSubmit={handleSignIn}>
          <div >
            <label className="text-white">Email:</label>
            <div>
              <input
                className="w-72 rounded  focus:rounded focus:outline-none  focus:border-none py-1 px-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-3 ">
            <label className="text-white">Password:</label>
            <div className="flex">
              <input
                className="w-72 rounded  focus:rounded focus:outline-none focus:border-none py-1 px-2"
                type={type}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="flex justify-around items-center"
                onClick={handleToggle}
              >
                <Icon className="absolute mr-10" icon={icon} size={25} />
              </span>
            </div>
          </div>
          <button
            className="mt-3 py-2.5 w-72 rounded bg-black text-black themeBackground transition-all"
            type="submit"
          >
            Login
          </button>
        </form>
        {error && console.log(error) }
        {user && message.success("Login Succesfully")}
        <div>
          <Link to="/sign-up">
            <button className="w-72  themeBackground transition-all border border-black rounded mt-3 focus:rounded focus:outline-none active:outline-none active:border-none focus:border-none py-1.5 px-2 hover:bg-black hover:text-white ">
              Create an account
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LogIn;
