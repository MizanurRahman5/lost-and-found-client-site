import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import AuthContext from "../contex/AuthContex/AuthContex";

const LatestLostAndFound = () => {
  const { setLoading } = useContext(AuthContext); // Access setLoading from context
  const [lostItems, setLostItems] = useState([]); // State for storing the items
  const [error, setError] = useState(null); // State for error
  const [isLoading, setIsLoading] = useState(true); // State to track the loading status

  // Fetch data from the backend
  useEffect(() => {
    const fetchLostItems = async () => {
      setLoading(true); // Set loading state to true while fetching
      setIsLoading(true); // Start loading state

      try {
        const response = await fetch("http://localhost:5000/lost"); // Correct URL for your server
        if (!response.ok) {
          throw new Error("Failed to fetch lost items");
        }
        const data = await response.json();

        // Sort items by latest dateLost and take the first 6 items
        const sortedItems = data
          .sort((a, b) => new Date(b.dateLost) - new Date(a.dateLost))
          .slice(0, 6);

        setLostItems(sortedItems); // Set the fetched data
      } catch (error) {
        setError(error.message); // Set the error message
      } finally {
        setTimeout(() => {
          setLoading(false); // Set loading to false once data is fetched
          setIsLoading(false); // Stop loading state after 1 second
        }, 1000); // Ensure at least 1 second loading time
      }
    };

    fetchLostItems();
  }, [setLoading]); // Depend on setLoading to ensure it’s correctly used

  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Show error message if fetching fails
  }

  // Show loading spinner while data is loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg"></div> {/* DaisyUI spinner */}
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }} // Initial state for opacity
      animate={{ opacity: 1 }} // Animated state
      transition={{ duration: 1 }} // Transition duration
    >
      <h2 className="text-4xl font-bold mb-6 text-center">
        Latest Lost & Found Items
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostItems.map((item) => (
          <motion.div
            key={item._id} // Use the unique _id of each item as the key
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
            initial={{ x: 100, y: -100 }} // Initial state, moving from bottom-left
            animate={{ x: 0, y: 0 }} // Animate to final position
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img
                src={item.thumbnail || "https://via.placeholder.com/400x200"} // Placeholder image if thumbnail is missing
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <span className="absolute top-4 right-4 px-3 py-1 text-white text-sm bg-blue-500 rounded-full">
                {item.postType}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-gray-600 flex-grow">{item.description}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Category: {item.category}</p>
              <p>Location: {item.location}</p>
              <p>
                Date Lost: {new Date(item.dateLost).toLocaleDateString()}
              </p>
            </div>

            {/* Button always at the bottom */}
            <div className="mt-auto flex justify-center">
              <Link
                to={`/see-details/${item._id}`} // Link to the item's detailed page
                className="px-4 py-2 bg-blue-500 text-white font-bold text-sm rounded-full hover:bg-blue-600 hover:scale-105 transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See All Button */}
      <div className="mt-6 flex justify-center">
        <Link
          to="/allItems" // Route to show all lost items
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          See All
        </Link>
      </div>
    </motion.div>
  );
};

export default LatestLostAndFound;
