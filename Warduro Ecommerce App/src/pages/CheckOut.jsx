import { useForm } from "react-hook-form";
// import { categories } from "../utils/categories";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { Badge, message } from "antd";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WiDegrees } from "react-icons/wi";
import { BiCircle } from "react-icons/bi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from "../context/AuthContext";
import BottomLine from "../components/BottomLine";
dayjs.extend(relativeTime);

function Checkout() {
  const { cartItems, removeItemFromCart, addItemToCart, lessQuantityFromCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const totalAmount = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.SalePrice,
    0
  );
  const totalAmountWithSipping = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.SalePrice + 300,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, obj) => total + obj.quantity,
    0
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const OderRef = collection(db, "WarduroOrders");

    const cartItemsObject = cartItems.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

    const obj = {
      ...data,
      cartItems: cartItemsObject,
      TotalAmount: totalAmountWithSipping,
      Quantity: totalQuantity,
      createdAt: serverTimestamp(),
      OrderBy: auth.currentUser.uid,
      status: "Booked",
    };

    addDoc(OderRef, obj)
      .then(() => {
        localStorage.setItem("cartItems", "0"); // Reset cart items in localStorage
        reset(); // Reset the form
        message.success("Order Booked Successfully");

        // Wait for 2 seconds before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error booking order: ", error);
        message.error("Something went wrong. Please try again.");
      });
  };
console.log(cartItems);
  return (
    <>
      <div className="container mt-24 md:mt-20 lg:mt-28 xl:mt-28">
        <div className="text-center m-4">
          <p className=""></p>
          <BottomLine
            text={"Check Out"}
            className={
              "text-3xl  md:text-3xl  lg:text-3xl xl:text-4xl xxl:text-4xl font-bold text-black"
            }
          />
        </div>
        <div className="flex lg:flex-row md:flex-row xl:flex-row flex-col-reverse mb-32">
          <div className=" w-full lg:w-2/4 ">
            <form
              className="flex flex-col   "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mt-3">
                <div>
                  <label htmlFor="" className="text-2xl font-bold">
                    Contact:
                  </label>
                </div>
                <CustomInput
                  placeholder={"Email"}
                  value={auth.currentUser.email}
                  obj={{
                    ...register("Email", { required: true, maxLength: 30 }),
                  }}
                  errorMsg={"Email is required"}
                  formKey={"email"}
                  type={"email"}
                  errors={errors}
                />
              </div>

              <div>
                <label htmlFor="" className="text-2xl font-bold mt-4">
                  Delivery Details
                </label>
              </div>

              <div className="">
                <select
                  className="border mt-2 w-full border-purple-600 lg:w-2/3  px-3 py-2.5 rounded-md"
                  {...register("province")}
                >
                  <option value="Sindh">Sindh</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Punjab">Punjab</option>
                  <option value="KPK">KPK</option>
                </select>
              </div>
              <div className="flex justify-stretch">
                <CustomInput
                  placeholder={"First Name"}
                  className={
                    "border mt-2 w-full   h-10 border-purple-600   px-3 py-4 rounded-md"
                  }
                  obj={{ ...register("First Name", { required: true }) }}
                  errorMsg={"First Name is required"}
                  formKey={"First Name"}
                  type={"text"}
                  errors={errors}
                />
                <CustomInput
                  placeholder={"Last Name"}
                  className={
                    "border mt-2 w-full  h-10 border-purple-600 ml-4    px-3 py-4  rounded-md"
                  }
                  obj={{ ...register("Last Name", { required: true }) }}
                  errorMsg={"Last Name is required"}
                  formKey={"Last Name"}
                  type={"text"}
                  errors={errors}
                />
              </div>

              <CustomInput
                placeholder={"Address"}
                obj={{ ...register("Address", { required: true }) }}
                errorMsg={"Address is required"}
                formKey={"Address"}
                errors={errors}
              />

              <div className="flex justify-stretch">
                <CustomInput
                  placeholder={"City"}
                  className={
                    "border mt-2 w-full   h-10 border-purple-600   px-3 py-4 rounded-md"
                  }
                  obj={{ ...register("City", { required: true }) }}
                  errorMsg={"City is required"}
                  formKey={"City"}
                  type={"text"}
                  errors={errors}
                />
                <CustomInput
                  placeholder={"Postal code"}
                  className={
                    "border mt-2 w-full  h-10 border-purple-600 ml-4   px-3 py-4 rounded-md"
                  }
                  obj={{ ...register("Postal code", { required: true }) }}
                  errorMsg={"Postal code is required"}
                  formKey={"Postal code"}
                  type={"number"}
                  errors={errors}
                />
              </div>

              <CustomInput
                placeholder={"Phone Number 03XXXXXXXXX"}
                obj={{
                  ...register("Phone Number", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^03[0-9]{9}$/,
                      message: "Invalid Phone number",
                    },
                  }),
                }}
                errorMsg={errors["Phone Number"]?.message}
                formKey={"Phone Number"}
                type={"text"}
                errors={errors}
              />

              <div>
                <label htmlFor="" className="text-2xl font-bold mt-4">
                  Shipping
                </label>
              </div>
              <CustomInput
                placeholder={"Shipping charges Rs. 300"}
                value={300}
                obj={{
                  ...register("ShippingCharges", {
                    required: true,
                    value: 300,
                  }),
                }}
                errorMsg={"Shipping charges are required"}
                formKey={"ShippingCharges"}
                disabled
                errors={errors}
              />

              <div>
                <label htmlFor="" className="text-2xl font-bold mt-4">
                  Payment Method
                </label>
              </div>
              <div className="">
                <select
                  className="border mt-2 w-full border-purple-600 lg:w-2/3 mx-auto px-3 py-2.5 rounded-md"
                  {...register("COD")}
                >
                  <option value="COD">COD</option>
                </select>
              </div>
              <div className="flex flex-col mt-4 themeBackground rounded py-3 UpperamountSection">
                <div className="flex justify-between px-4">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold">Subtotal</p>
                    <p>
                      <BiCircle
                        className="text-black mx-1"
                        color="#000"
                        size={8}
                      />{" "}
                    </p>
                    <p>
                      {cartItems.reduce(
                        (sum, product) => sum + product.quantity,
                        0
                      )}{" "}
                      Items
                    </p>
                  </div>
                  <p className="font-normal"> Rs. {totalAmount}</p>
                </div>
                <div className="flex justify-between px-4">
                  <p className="font-normal">Shipping</p>
                  <p>Rs. 200</p>
                </div>
                <div className="flex justify-between px-4 font-bold text-lg">
                  <p className="font-semibold">Total</p>
                  <p>PKR Rs. {totalAmountWithSipping}</p>
                </div>
              </div>
              <button
                type="submit"
                className={`learn-btn w-full lg:w-2/3 p-2.5 mt-4 rounded transition-all themeBackground ${
                  cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={cartItems.length === 0} // Disable when cart is empty
              >
                Complete order
              </button>
            </form>
          </div>

          <div className="w-full  lg:w-1/3 flex flex-col  rounded  ">
            <div className="">
              <div className=" min-h-fit max-h-96  overflow-y-auto my-2 px-2  cartInnerShadow drop-shadow-xl rounded-2xl cart">
                {cartItems.map((product, index) => (
                  <div
                    key={product.id || `cart-item-${index}`}
                    className="flex justify-stretch 
                  border my-2 p-2.5  sm:p-2 md:p-2 lg:p-3 xl:p-3 rounded "
                  >
                    <div className="max-w-12 min-w-12  ">
                      <Badge count={product.quantity}>
                        <img
                          className="rounded object-cover w-full h-full "
                          src={product.img}
                        />
                      </Badge>
                    </div>
                    <div className="flex   justify-evenly ">
                      <div className="flex flex-col pl-5">
                        <div className="flex  mb-2 ">
                          <p className="font-bold line-clamp-1">
                            {product.title}
                          </p>
                          <p className="text-sm tracking-widest ml-1">
                            {" "}
                            {`(${product.category.substr(0, 5)}...)`}
                          </p>
                        </div>

                        <p className="font-normal  mb-2">{product.ML}</p>
                      </div>
                    </div>
                    <div className="ml-12 flex  ms-auto ">
                      <p className="font-normal  mb-2 ">
                        Rs: {product.SalePrice}/-
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex flex-col mt-4 themeBackground rounded py-3 amountSection">
                  <div className="flex justify-between px-4">
                    <div className="flex justify-between items-baseline">
                      <p className="font-semibold">Subtotal</p>
                      <p>
                        <BiCircle
                          className="text-black mx-1"
                          color="#000"
                          size={8}
                        />{" "}
                      </p>
                      <p>
                        {cartItems.reduce(
                          (sum, product) => sum + product.quantity,
                          0
                        )}{" "}
                        Items
                      </p>
                    </div>
                    <p className="font-normal"> Rs. {totalAmount}</p>
                  </div>
                  <div className="flex justify-between px-4">
                    <p className="font-normal">Shipping</p>
                    <p>Rs. 300</p>
                  </div>
                  <div className="px-4 mt-3 mb-2">
                    <hr />
                  </div>
                  <div className="flex justify-between px-4 font-bold text-lg">
                    <p className="font-semibold">Total</p>
                    <p>PKR Rs. {totalAmountWithSipping}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
}

export default Checkout;

const CustomInput = ({
  formKey,
  obj,
  placeholder,
  errors,
  errorMsg,
  type,
  disabled,
  className,
  value,
}) => {
  return (
    <div className="flex flex-col ">
      <input
        className={
          className
            ? className
            : "border mt-2 w-full  h-10 border-purple-600 lg:w-2/3  px-3 py-4 rounded-md"
        }
        placeholder={placeholder}
        disabled={disabled}
        type={type ? type : "text"}
        {...obj}
        value={value}
      />
      {errors[formKey] && (
        <span className="text-sm mb-1 text-red-500">{errorMsg}</span>
      )}
    </div>
  );
};
