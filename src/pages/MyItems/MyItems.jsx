import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../contex/AuthContex/AuthContex";
import { Link } from "react-router-dom";
import axios from "axios";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [lost, setLost] = useState([]);
  const [error, setError] = useState(null); // Error state for handling errors

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/lost/${user.email}`, {
        withCredentials: true,
      })
      .then(res => setLost(res.data))
      .catch((error) => {
        console.error("Error fetching lost items:", error);
        setError("Failed to load lost items."); // Set error message
      });
    }
  }, [user]);

  const handleUpdate = (id) => {
    // Handle update logic here
    console.log("Update item with ID:", id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/lost/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setLost(lost.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        setError("Failed to delete item.");
      });
  };

  return (
    <div className="p-4 container mx-auto mt-28 min-h-[600px]">
      <h1 className="text-2xl font-bold mb-4">My Lost Items</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Show error message if exists */}
      {lost.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Date Lost
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {lost.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-sm">{item.title}</td>
                <td className="px-6 py-4 text-sm">{item.description}</td>
                <td className="px-6 py-4 text-sm">{item.dateLost}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/updateItems/${item._id}`} // Use the item's ID here
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 text-sm"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No lost items found.</p>
      )}
    </div>
  );
};

export default MyItems;
