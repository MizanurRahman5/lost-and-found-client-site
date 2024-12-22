import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../contex/AuthContex/AuthContex"; // Assuming you are using AuthContext for logged in user data

// Modal component to show detailed information and handle recovery form
const Modal = ({ item, closeModal, user }) => {
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  const handleSubmit = async () => {
    const recoveredData = {
      recoveredLocation,
      recoveredDate,
      recoveredPerson: {
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
      },
      itemId: item._id,
    };

    try {
      // API call to send recovered information to server
      const response = await fetch('http://localhost:5000/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recoveredData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Recovery data submitted successfully:', result);
        // Close modal after successful submission
        closeModal();
      } else {
        console.error('Error submitting recovery data:', result);
      }
    } catch (error) {
      console.error('Error submitting recovery data:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>

        <div className="flex space-x-8">
          {/* পোস্টের তথ্য */}
          <div className="w-1/2">
            <img
              src={item.thumbnail || "https://via.placeholder.com/400x200"}
              alt={item.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <p className="mt-4 text-gray-600">{item.description}</p>
            <p className="mt-4 text-gray-500">Category: {item.category}</p>
            <p className="text-gray-500">Location: {item.location}</p>
            <p className="text-gray-500">
              Date Lost: {new Date(item.dateLost).toLocaleDateString()}
            </p>
            <p className="text-gray-500">Name: {item.name}</p>
            <p className="text-gray-500">Contact: {item.email}</p>
          </div>

          {/* রিকভারি তথ্য */}
          <div className="w-1/2">
            <div className="mt-6">
              <label className="block mb-2">Recovered Location:</label>
              <input
                type="text"
                value={recoveredLocation}
                onChange={(e) => setRecoveredLocation(e.target.value)}
                className="border p-2 w-full rounded-md"
                placeholder="Enter recovery location"
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2">Recovered Date:</label>
              <DatePicker
                selected={recoveredDate}
                onChange={(date) => setRecoveredDate(date)}
                className="border p-2 w-full rounded-md"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2">Recovered Person Info:</label>
              <div className="mb-2">
                <strong>Email:</strong>
                <input
                  type="text"
                  value={user?.email || "No Email Available"}
                  readOnly
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div className="mb-2">
                <strong>Name:</strong>
                <input
                  type="text"
                  value={user?.displayName || "No Name Available"}
                  readOnly
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div className="mb-2">
                <strong>Image:</strong>
                {user?.photoURL ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={user?.photoURL}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center">
                    <span className="text-white">No Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Submit
          </button>
          <button
            onClick={closeModal}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Details = () => {
  const item = useLoaderData(); // Fetch the item details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext); // Access the logged-in user information

  if (!item) {
    return <div>Loading...</div>; // Loading state
  }

  const handleButtonClick = () => {
    setIsModalOpen(true); // Open modal on button click
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="container mt-20 mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">{item.title}</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img
          src={item.thumbnail || "https://via.placeholder.com/400x200"}
          alt={item.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <p className="mt-4 text-gray-600">{item.description}</p>
        <p className="mt-4 text-gray-500">Category: {item.category}</p>
        <p className="text-gray-500">Location: {item.location}</p>
        <p className="text-gray-500">
          Date Lost: {new Date(item.dateLost).toLocaleDateString()}
        </p>
        <p className="text-gray-500">Name: {item.name}</p>
        <p className="text-gray-500">Contact: {item.email}</p>

        {/* Conditional Button */}
        {item.postType === "Lost" ? (
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Found This!
          </button>
        ) : (
          <button
            onClick={handleButtonClick}
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
          >
            This is Mine!
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && <Modal item={item} closeModal={closeModal} user={user} />}
    </div>
  );
};

export default Details;
