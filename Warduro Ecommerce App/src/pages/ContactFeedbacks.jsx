import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Spin, Table } from "antd";
import SideMenu from "../components/SideMenu";
import Loader from "../loader";

export default function ContactFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const feedbackCollection = collection(db, "WarduroFeedback");
      const q = query(feedbackCollection, orderBy("createdAt", "desc"));
      const docs = await getDocs(q);
      const feedbackList = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFeedbacks(feedbackList);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setLoader(false);
    }
  };

  const columns = [
    {
      title: "Feedback No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => ` ${index + 1}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",render: (text) => (
        <div className="overflow-y-auto w-full h-full m-0 p-0" >
            <textarea name="" id="id" disabled>

            {text}
            </textarea>
        
        </div>
      ),
    },
    {
      title: "Submitted Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : "N/A",
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
              <h1 className="text-2xl  md:text-3xl  lg:text-3xl xl:text-4xl xxl:text-4xl font-bold text-black">Contact Feedbacks</h1>
            </div>
            <Table
            className=""
              dataSource={feedbacks}
              columns={columns}
              rowKey="id"
              bordered
              pagination={{ pageSize: 10 }}
            />
          </div>
        </div>
      )}
    </>
  );
}
