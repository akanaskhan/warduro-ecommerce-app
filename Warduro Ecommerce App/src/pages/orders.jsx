import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import SideMenu from "../components/SideMenu";
import { Spin, Button, Table, message } from "antd";
import Loader from "../loader";

export default function AllOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const orderCollection = collection(db, "WarduroOrders");
      const q = query(orderCollection, orderBy("createdAt", "desc"));
      const docs = await getDocs(q);
      const arr = [];
      docs.forEach((order) => arr.push({ ...order.data(), id: order.id }));
      setOrders([...arr]);
      setLoader(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setLoader(false);
    }
  };

  const markAsShipped = async (order) => {
    try {
      // Ensure the order ID exists and is valid
      if (!order.id) {
        message.error("Invalid order ID. Please try again.");
        return;
      }

      const orderRef = doc(db, "WarduroOrders", order.id);
      const deliveredOrderRef = doc(db, "WardurodeliveredOrders", order.id);

      // Step 1: Update the order status in the orders collection
      await updateDoc(orderRef, { status: "Delivered" });

      // Step 2: Add the order to the deliveredOrders collection
      await setDoc(deliveredOrderRef, { ...order, status: "Delivered" });

      // Step 3: Delete the order from the orders collection
      await deleteDoc(orderRef);

      // Step 4: Update the UI
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));

      message.success("Order marked as delivered.");
      console.log(`Order ${order.id} marked as delivered.`);
    } catch (error) {
      console.error("Error marking order as shipped:", error);
      message.error("Failed to mark order as delivered. Please try again.");
    }
  };

  const deleteOrder = async (order) => {
    try {
      if (!order.id) {
        message.error("Invalid order ID. Please try again.");
        return;
      }

      const orderRef = doc(db, "WarduroOrders", order.id);
      const deletedOrderRef = doc(db, "WardurodeletedOrders", order.id);

      // Update the order's status to "Deleted"
      await updateDoc(orderRef, { status: "Deleted" });

      // Move the order to the deletedOrders collection
      await setDoc(deletedOrderRef, { ...order, status: "Deleted" });

      // Delete the original order
      await deleteDoc(orderRef);

      // Update the UI
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));

      message.success("Order marked as deleted.");
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Failed to delete order. Please try again.");
    }
  };

  const renderNestedFields = (obj) => {
    const requiredFields = ["img", "title", "price", "selectedSize", "quantity", "createdAt"];
    return Object.keys(obj).map((key) => {
      const value = obj[key];
      if (requiredFields.includes(key)) {
        if (key === "img") {
          return (
            <div style={{ padding: "4px 0" }} key={key}>
              <strong>Image:</strong>{" "}
              <img src={value} alt={obj.title || "Order Image"} style={{ width: "50px", height: "50px" }} />
            </div>
          );
        } else if (key === "createdAt") {
          return (
            <div style={{ padding: "4px 0" }} key={key}>
              <strong>Order Booking Date:</strong> {new Date(value.seconds * 1000).toLocaleDateString()}
            </div>
          );
        } else {
          return (
            <div style={{ padding: "4px 0" }} key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </div>
          );
        }
      } else if (typeof value === "object" && value !== null) {
        return (
          <div style={{ padding: "4px 0" }} key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
            <div style={{ paddingLeft: "15px" }}>{renderNestedFields(value)}</div>
          </div>
        );
      }
      return null;
    });
  };

  const renderOrderDetails = (order) => {
    return <div className="pl-4">{renderNestedFields(order)}</div>;
  };

  const renderCustomerDetails = (customer) => {
    return (
      <div className="pl-4">
        <div style={{ padding: "4px 0" }}>
          <strong>Customer Details:</strong>
        </div>
        <div style={{ paddingLeft: "15px" }}>
          {Object.entries(customer).map(([key, value]) => (
            <div style={{ padding: "4px 0" }} key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: "Order No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => `Order ${index + 1}`,
    },
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text) => text,
    },
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (_, order) => renderOrderDetails(order),
    },
    {
      title: "Customer Details",
      dataIndex: "customerDetails",
      key: "customerDetails",
      render: (_, order) => (
        <div>
          <strong>Name:</strong> {order["First Name"]} {order["Last Name"]} <br />
          <strong>Email:</strong> {order.Email} <br />
          <strong>Phone:</strong> {order["Phone Number"]} <br />
          <strong>Address:</strong> {order.Address}, {order.City}, {order.country} <br />
          <strong>Postal Code:</strong> {order["Postal code"]}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span>{text || "Pending"}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, order) => (
        <div className="flex space-x-2">
          <Button type="primary" onClick={() => markAsShipped(order)}>
            Mark as Shipped
          </Button>
          <Button type="danger" onClick={() => deleteOrder(order)} variant="danger" className="danger btn bg-red-600 hover:bg-red-700 whiteText" >
            Delete Order
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Loader className="w-28 h-28" />
        </div>
      ) : (
        <div className="flex mt-24 md:mt-20 lg:mt-24 xl:mt-24">
          <SideMenu />
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center my-4 text-center items-center">
              <h1 className="text-2xl  md:text-3xl  lg:text-3xl xl:text-4xl xxl:text-4xl font-bold text-black ">All Orders</h1>
            </div>
            <Table
              dataSource={orders}
              columns={columns}
              rowKey="id"
              bordered
              expandable={{
                expandedRowRender: (record) => renderCustomerDetails(record.customer || {}),
                rowExpandable: (record) => record.customer !== undefined,
              }}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      )}
    </>
  );
}
