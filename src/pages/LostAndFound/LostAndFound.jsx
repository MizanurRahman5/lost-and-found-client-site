import React, { useState, useMemo, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Framer Motion import
import { Helmet } from 'react-helmet';
import { TailSpin } from "react-loader-spinner"; // Importing loader from react-loader-spinner

const LostAndFound = () => {
  const items = useLoaderData(); // Fetch the items
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search input
  const [loading, setLoading] = useState(true); // Loading state

  // Memoize the filtered items to optimize performance
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by title
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by location
    );
  }, [items, searchQuery]);

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Simulate a 1-second loading delay before showing the data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="gray" height={50} width={50} />
      </div>
    ); // Show loader while loading
  }

  if (!items) {
    return <div>Loading...</div>; // Show message if items are not available
  }

  return (
    <div className="container mt-20 mx-auto p-6">
      <Helmet>
        <title>All Lost and Found</title> {/* Dynamic title */}
      </Helmet>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Lost & Found Items
      </h2>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by title or location..."
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500">No items found</p> // Show message if no items match
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item._id} // Use _id as key for better performance
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ x: 100, y: -100 }} // Initial state, moving from bottom-left
              animate={{ x: 0, y: 0 }} // Animate to final position
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src={item.thumbnail || "https://via.placeholder.com/400x200"} // Show placeholder image if thumbnail is missing
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <span className="absolute top-4 right-4 px-3 py-1 text-white text-sm bg-blue-500 rounded-full">
                  {item.postType}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Category: {item.category}</p>
                <p>Location: {item.location}</p>
                <p>Date Lost: {new Date(item.dateLost).toLocaleDateString()}</p>
              </div>
              <div className="mt-4">
                <Link
                  to={`/see-details/${item._id}`} // Link to the item's detailed page
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LostAndFound;
