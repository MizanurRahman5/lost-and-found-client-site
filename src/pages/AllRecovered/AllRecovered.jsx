import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contex/AuthContex/AuthContex'; // Import context to get user info
import { FaTh, FaTable } from 'react-icons/fa'; // Import icons from react-icons
import { Helmet } from 'react-helmet';

const AllRecoveries = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user info
  const [recoveries, setRecoveries] = useState([]); // State to store recovery data
  const [error, setError] = useState(''); // State to store error messages
  const [isGridLayout, setIsGridLayout] = useState(true); // State to toggle between grid and table layout
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Function to fetch recovery data
    const fetchMyRecoveries = async () => {
      if (user?.email) {
        setLoading(true); // Set loading to true before fetching data
        try {
          // Simulate a 1-second loading delay
          setTimeout(async () => {
            const response = await fetch(`https://lost-and-found-server-ecru.vercel.app/recover/${user.email}`);
            const data = await response.json();

            if (response.ok) {
              setRecoveries(data); // Set the recovery data
            } else {
              setError(data.message || 'Something went wrong'); // Set error message
            }
            setLoading(false); // Set loading to false after fetching data
          }, 1000); // 1 second delay
        } catch (error) {
          setError('Failed to fetch recoveries'); // Catch any fetch error
          setLoading(false); // Stop loading if an error occurs
        }
      }
    };

    fetchMyRecoveries(); // Call the function to fetch recoveries when the component mounts or user.email changes
  }, [user?.email]); // Re-run the effect if the user's email changes

  // Toggle layout function
  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message or spinner while data is being fetched
  }

  return (
    <div className="container mt-20 mx-auto p-6">
      <Helmet>
        <title>All Recover</title> {/* Dynamic title */}
      </Helmet>
      <h2 className="text-2xl font-semibold mb-6">My Recoveries</h2>

      

      <button
        onClick={toggleLayout}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center gap-2"
        aria-label="Toggle Layout"
      >
        {isGridLayout ? (
          <>
            <FaTable /> {/* Table icon */}
            Switch to Table Layout
          </>
        ) : (
          <>
            <FaTh /> {/* Grid icon */}
            Switch to Grid Layout
          </>
        )}
      </button>

      {recoveries.length === 0 ? (
        <p>No recoveries found for this email.</p> // Message if no recovery data is found
      ) : (
        <>
          {isGridLayout ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recoveries.map((recovery) => (
                <div key={recovery._id} className="bg-white p-6 rounded-lg shadow-lg">
                  <p><strong>Recovered Location:</strong> {recovery.recoveredLocation}</p>
                  <p><strong>Recovered Date:</strong> {new Date(recovery.recoveredDate).toLocaleDateString()}</p>
                  <p><strong>Recovered By:</strong> {recovery.name}</p>
                  <p><strong>Email:</strong> {recovery.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Recovered Location</th>
                  <th className="border px-4 py-2">Recovered Date</th>
                  <th className="border px-4 py-2">Recovered By</th>
                  <th className="border px-4 py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {recoveries.map((recovery) => (
                  <tr key={recovery._id} className="border-t">
                    <td className="border px-4 py-2">{recovery.recoveredLocation}</td>
                    <td className="border px-4 py-2">{new Date(recovery.recoveredDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{recovery.name}</td>
                    <td className="border px-4 py-2">{recovery.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default AllRecoveries;
