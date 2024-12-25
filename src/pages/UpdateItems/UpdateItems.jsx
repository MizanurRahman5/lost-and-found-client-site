import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../contex/AuthContex/AuthContex";
import { Helmet } from "react-helmet";

const UpdateItems = () => {
  const { id } = useParams(); // Getting the ID of the item to be updated
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to store form data
  const [item, setItem] = useState({
    title: "",
    description: "",
    dateLost: "",
    location: "",
    image: "",
    email: user?.email || "", // Prefilling the email if available
    username: user?.displayName || "", // Prefilling the username if available
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch the existing item details from the server
  useEffect(() => {
    if (id) {
      fetch(`https://lost-and-found-server-ecru.vercel.app/lost/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setItem({
              ...data,
              email: user?.email || data.email, // Ensuring the email is pre-filled but read-only
              username: user?.displayName || data.username, // Ensuring the username is pre-filled but read-only
            });
          }
        })
        .catch((error) => console.error("Error fetching item details:", error));
    }
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated item data to the server
    fetch(`https://lost-and-found-server-ecru.vercel.app/lost/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Item updated successfully") {
          setSuccessMessage("Item updated successfully!");
          setTimeout(() => {
            navigate("/myItems"); // Redirect to My Items page after success
          }, 2000);
        }
      })
      .catch((error) => console.error("Error updating item:", error));
  };

  return (
    <div className="p-4 mt-28 min-h-[600px]">
      <Helmet>
        <title>Update</title> {/* Dynamic title */}
      </Helmet>
      <h1 className="text-2xl text-center font-bold mb-4">Update Lost Item</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={item.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={item.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dateLost"
            className="block text-sm font-medium text-gray-700"
          >
            Date Lost
          </label>
          <input
            type="date"
            id="dateLost"
            name="dateLost"
            value={item.dateLost}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={item.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL (Optional)
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={item.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            User Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={item.email}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={item.username}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Update
        </button>
      </form>

      {successMessage && (
        <p className="text-green-600 mt-4">{successMessage}</p>
      )}
    </div>
  );
};

export default UpdateItems;
