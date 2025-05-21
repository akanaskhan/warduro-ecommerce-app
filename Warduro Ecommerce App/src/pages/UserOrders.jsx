import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Loader from "../loader";
import BottomLine from "../components/BottomLine";

dayjs.extend(relativeTime);

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const user = auth?.currentUser?.uid; // Get the current user UID
      if (user) {
        const ordersQuery = query(collection(db, "WarduroOrders"), where("OrderBy", "==", user));
        const ordersDocs = await getDocs(ordersQuery);
        const ordersData = ordersDocs.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate(), // Convert Firestore Timestamp to JS Date
          collection: "WarduroOrders",
        }));

        const deletedOrdersQuery = query(
          collection(db, "WardurodeletedOrders"),
          where("OrderBy", "==", user)
        );
        const deletedOrdersDocs = await getDocs(deletedOrdersQuery);
        const deletedOrdersData = deletedOrdersDocs.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate(),
          collection: "WardurodeletedOrders",
        }));

        const deliveredOrdersQuery = query(
          collection(db, "WardurodeliveredOrders"),
          where("OrderBy", "==", user)
        );
        const deliveredOrdersDocs = await getDocs(deliveredOrdersQuery);
        const deliveredOrdersData = deliveredOrdersDocs.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate(),
          collection: "WardurodeliveredOrders",
        }));

        // Combine and sort orders by date (most recent first)
        const allOrders = [...ordersData, ...deletedOrdersData, ...deliveredOrdersData].sort(
          (a, b) => b.createdAt - a.createdAt
        );

        setOrders(allOrders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoader(false);
    }
  };

  const renderOrders = (orders) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-6">
      {orders.map((order) => (
        <div
          className="border rounded-lg p-6 shadow-md themeCard hover:shadow-lg transition-shadow duration-300"
          key={order.id}
        >
          <h1 className="text-xl font-bold themeText">Order ID: {order.id}</h1>
          <p className="mt-2">
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded ${
                order.status === "Delivered"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {order.status}
            </span>
          </p>
          <p>
            <strong>Date:</strong> {dayjs(order.createdAt).fromNow()}
          </p>
          <p>
            <strong>Address:</strong> {order.Address}
          </p>
          <p>
            <strong>Phone:</strong> {order["Phone Number"]}
          </p>
          <p>
            <strong>Total Price:</strong> Rs. {order.TotalAmount || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto   ">
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Loader className="w-16 h-16 text-primary" />
        </div>
      ) : error ? (
        <div className="text-center my-40 text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <div className="mt-24 md:mt-20 lg:mt-28 xl:mt-28">
          <div className="flex justify-center  text-center items-center">
            <BottomLine
              text={"Your Orders"}
              className={"text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold"}
            />
          </div>
          {orders.length ? (
            renderOrders(orders)
          ) : (
            <div className="text-center my-40 text-gray-600">
              <p>No orders found.</p>
              <Link
                to="/products"
                className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserOrders;
