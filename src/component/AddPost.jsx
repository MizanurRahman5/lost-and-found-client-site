import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2';

const AddPost = () => {
  const [formData, setFormData] = useState({
    thumbnail: "",
    title: "",
    postType: "Found", // Default value for the dropdown
    description: "",
    category: "",
    dateLost: "",
    email: "",
    userName: "",
    location: "", // New field for location
  });

  // Firebase Auth setup
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          email: user.email,
          userName: user.displayName || "Anonymous", // Default to 'Anonymous' if displayName is not available
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidUrl = (url) => {
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    return regex.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidUrl(formData.thumbnail)) {
      Swal.fire({
        title: 'Invalid URL',
        text: 'Please enter a valid image URL.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    console.log("New Campaign Data:", formData);

    fetch('http://localhost:5000/lost', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Campaign added successfully!',
            icon: 'success',
            confirmButtonText: 'Cool',
          });

          // Reset form fields
          setFormData({
            thumbnail: "",
            title: "",
            postType: "Found", // Reset type to "Found"
            description: "",
            category: "",
            dateLost: "",
            location: "", // Reset location
            email: formData.email, // Keep email unchanged
            userName: formData.userName, // Keep userName unchanged
          });
        }
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong, please try again.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-32">
      <h2 className="text-2xl font-bold mb-6 text-center">Add lost and found</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image/Thumbnail */}
        <div>
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Thumbnail 
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Campaign Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Campaign Type */}
        <div>
          <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
            Post Type
          </label>
          <select
            id="postType"
            name="postType"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="Found">Found</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., pets, documents, gadgets"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            id="dateLost"
            name="dateLost"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* User Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            User Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* User Name */}
        <div>
          <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            readOnly
            className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Post Lost
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
