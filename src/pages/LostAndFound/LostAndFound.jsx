import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

const LostAndFound = () => {
  const items = useLoaderData(); // Fetch the items
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search input
  const [filteredItems, setFilteredItems] = useState(items); // Filtered items state

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) || // Filter by title
        item.location.toLowerCase().includes(query) // Filter by location
    );
    setFilteredItems(filtered);
  };

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-20 mx-auto p-6">
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
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
              <Link
                to={`/see-details/${item._id}`} // Link to the item's detailed page
                className="mt-4 inline-block text-center w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LostAndFound;
