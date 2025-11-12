import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // Fetch all products
  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "api/product/list");
      if (res.data.succes) {
        setList(res.data.product);
      } else {
        toast.error("Invalid data fetching");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Delete product
  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        backendUrl + "api/product/delete",
        { id },
        { headers: { token } }
      );
      if (res.data.succes) {
        toast.success("🗑️ Product removed successfully");
        await fetchList();
      } else {
        toast.error("Unable to remove the product");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div
      className="min-h-screen overflow-y-auto bg-white scrollbar-hide p-4 sm:p-6"
    >
      {/* Header Row (visible only on larger screens) */}
      <div className="hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] border bg-gray-100 border-gray-300 p-4 rounded-md font-semibold">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>SubCategory</b>
        <b className="text-center">Remove</b>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-4 mt-3">
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-gray-50 p-3 rounded-md text-sm sm:text-base
                         flex flex-col sm:grid sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] sm:items-center
                         transition-transform hover:scale-[1.01]"
            >
              {/* Image */}
              <div className="flex justify-center sm:justify-start mb-2 sm:mb-0">
                <img
                  className="w-24 h-24 sm:w-16 sm:h-16 object-cover rounded-md"
                  src={item.image[0]}
                  alt="Product"
                />
              </div>

              {/* Description */}
              <p className="px-2 mb-2 sm:mb-0 sm:truncate">{item.description}</p>

              {/* Category */}
              <p className="text-gray-700 mb-1 sm:mb-0 text-center sm:text-left">
                {item.category}
              </p>

              {/* Subcategory */}
              <p className="text-gray-700 mb-1 sm:mb-0 text-center sm:text-left">
                {item.subCategory}
              </p>

              {/* Remove Button */}
              <p
                onClick={() => removeProduct(item._id)}
                className="text-center text-lg font-bold text-red-500 cursor-pointer hover:text-red-700"
              >
                ✖
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
