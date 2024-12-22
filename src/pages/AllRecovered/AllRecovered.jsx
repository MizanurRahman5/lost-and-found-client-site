import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contex/AuthContex/AuthContex'; // Import context to get user info

const AllRecoveries = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user info
  const [recoveries, setRecoveries] = useState([]); // State to store recovery data
  const [error, setError] = useState(''); // State to store error messages

  useEffect(() => {
    // Function to fetch recovery data
    const fetchMyRecoveries = async () => {
      if (user?.email) {
        try {
          // Fetch the recovery data using the logged-in user's email
          const response = await fetch(`http://localhost:5000/recover/${user.email}`);
          const data = await response.json();

          console.log('API response:', data); // Debugging the response

          if (response.ok) {
            setRecoveries(data); // Set the recovery data
          } else {
            setError(data.message || 'Something went wrong'); // Set error message
          }
        } catch (error) {
          setError('Failed to fetch recoveries'); // Catch any fetch error
        }
      }
    };

    fetchMyRecoveries(); // Call the function to fetch recoveries when the component mounts or user.email changes
  }, [user?.email]); // Re-run the effect if the user's email changes

  return (
    <div className="container mt-20 mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Recoveries</h2>

      {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

      {recoveries.length === 0 ? (
        <p>No recoveries found for this email.</p> // Message if no recovery data is found
      ) : (
        <div>
          {recoveries.map((recovery, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md shadow-sm">
              <p><strong>Recovered Location:</strong> {recovery.recoveredLocation}</p>
              <p><strong>Recovered Date:</strong> {new Date(recovery.recoveredDate).toLocaleDateString()}</p>
              <p><strong>Recovered By:</strong> {recovery.name}</p>
              <p><strong>Email:</strong> {recovery.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecoveries;
