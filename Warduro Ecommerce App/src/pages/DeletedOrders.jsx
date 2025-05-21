import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Spin, Table } from "antd";
import SideMenu from "../components/SideMenu";
import Loader from "../loader";

export default function DeletedOrders() {
  const [deletedOrders, setDeletedOrders] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchDeletedOrders();
  }, []);

  const fetchDeletedOrders = async () => {
    try {
      const deletedOrdersCollection = collection(db, "WardurodeletedOrders");
      const docs = await getDocs(deletedOrdersCollection);
      const arr = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDeletedOrders(arr);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching deleted orders:", error);
      setLoader(false);
    }
  };

  const renderOrderDetails = (order, index) => {
    return (
      <div className="pl-4">
        {deletedOrders.map((order, index) => (
        <div key={index} className="order-item">
          <div><strong>Title:</strong> {order.title || "N/A"}</div>
          <div><strong>Price:</strong> {order.price || "N/A"}</div>
          <div><strong>Quantity:</strong> {order.Quantity || "N/A"}</div>
          <div><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</div>
          <div><strong>Name:</strong> {order.FirstName} {order.LastName}</div>
          <div><strong>Email:</strong> {order.Email}</div>
          <div><strong>Phone:</strong> {order.PhoneNumber}</div>
          <div><strong>Address:</strong> {order.Address}, {order.City}, {order.province}</div>
          <div><strong>Postal Code:</strong> {order.PostalCode}</div>
          <div><strong>Status:</strong> {order.status}</div>
          <hr />
        </div>
      ))}
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
      render: (text) => <span>{text || "Deleted"}</span>,
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
            <SideMenu/>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center my-4 text-center items-center">
            <h1 className="text-2xl  md:text-3xl  lg:text-3xl xl:text-4xl xxl:text-4xl font-bold text-black ">Deleted Orders</h1>
          </div>
          <Table
            dataSource={deletedOrders}
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
