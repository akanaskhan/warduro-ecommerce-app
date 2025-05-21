import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { Spin, Input, Button, notification } from "antd";
import SideMenu from "../components/SideMenu";

export default function AllEditableProducts(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const prodCollection = collection(db, "WarduroProducts");
        const docs = await getDocs(prodCollection);
        const productsData = docs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle input change for editing
  const handleInputChange = (e, field, id) => {
    const value = e.target.value;
    setUpdatedData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Save updated data to Firestore
  const saveChanges = async (id) => {
    try {
      const updatedFields = updatedData[id];
      const productDoc = doc(db, "WarduroProducts", id);
      await updateDoc(productDoc, updatedFields);

      // Update the local state
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updatedFields } : product
        )
      );
      setEditingRow(null);
      notification.success({
        message: "Success",
        description: "Product updated successfully!",
      });
    } catch (error) {
      console.error("Error updating product:", error);
      notification.error({
        message: "Error",
        description: "Failed to update product. Please try again.",
      });
    }
  };

  return (
    <>
    <div className=" flex  pt-2  mt-16 md:mt-20 lg:mt-20 xl:mt-20">
        <SideMenu/>
      <div className="container p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Editable Products Table</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200 overflow-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Product Quality</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Sale Price</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                {editingRow === product.id ? (
                  <>
                    <td className="border border-gray-300 p-2">
                      <Input
                        defaultValue={product.title}
                        onChange={(e) =>
                          handleInputChange(e, "title", product.id)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        defaultValue={product.category}
                        onChange={(e) =>
                          handleInputChange(e, "category", product.id)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        defaultValue={product.ProductCategory}
                        onChange={(e) =>
                          handleInputChange(e, "ProductCategory", product.id)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        defaultValue={product.price}
                        onChange={(e) =>
                          handleInputChange(e, "price", product.id)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        defaultValue={product.SalePrice}
                        onChange={(e) =>
                          handleInputChange(e, "SalePrice", product.id)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2 flex ">
                      <Button
                        type="primary"
                        onClick={() => saveChanges(product.id)}
                        >
                        Save
                      </Button>
                      <Button
                        type="default"
                        onClick={() => setEditingRow(null)}
                        className="ml-2"
                      >
                        Cancel
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-300 p-2">
                      {product.title}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.category}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.ProductCategory}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.price}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.SalePrice}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Button
                        type="default"
                        onClick={() => setEditingRow(product.id)}
                      >
                        Edit
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
                        </div>
    </div>
    </>
  );
};


