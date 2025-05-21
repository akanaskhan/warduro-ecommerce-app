import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Table, Spin } from "antd";
import SideMenu from "../components/SideMenu";
import Loader from "../loader";

export default function DeliveredOrders() {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const deliveredCollection = collection(db, "WardurodeliveredOrders");
        const q = query(deliveredCollection, orderBy("createdAt", "desc"));
        const docs = await getDocs(q);
        const orders = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setDeliveredOrders(orders);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching delivered orders:", error);
        setLoader(false);
      }
    };

    fetchDeliveredOrders();
  }, []);

  const renderNestedFields = (obj) => {
    const requiredFields = ["img", "title", "price", "ml", "quantity", "createdAt"];
    
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

  const renderCustomerDetails = (customer) => {
    return (
      <div className="pl-4">
        <div style={{ padding: "4px 0" }}><strong>Customer Details:</strong></div>
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
  const renderOrderDetails = (order) => {
    return (
      <div className="pl-4">
        {renderNestedFields(order)}
      </div>
    );
  }
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
      render: (text) => text, // Directly display the document ID
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
          <h1 className="text-2xl  md:text-3xl  lg:text-3xl xl:text-4xl xxl:text-4xl font-bold text-black  text-center my-4">Delivered Orders</h1>
          <Table
            dataSource={deliveredOrders}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
        </div>
      )}
    </>
  );
}
