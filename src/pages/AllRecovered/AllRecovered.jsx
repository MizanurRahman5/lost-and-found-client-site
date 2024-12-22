import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../contex/AuthContex/AuthContex';

const AllRecoveries = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user info
  const [recoveries, setRecoveries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyRecoveries = async () => {
      if (user?.email) {
        try {
          const response = await fetch(`http://localhost:5000/recover?email=${user.email}`);
          const data = await response.json();
          
          console.log('API response:', data); // Debugging the response
  
          if (response.ok) {
            setRecoveries(data);
          } else {
            setError(data.message || 'Something went wrong');
          }
        } catch (error) {
          setError('Failed to fetch recoveries');
        }
      }
    };
  
    fetchMyRecoveries();
  }, [user?.email]);
  

   

  return (
    <div className="container mt-20 mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Recoveries</h2>

      {error && <p className="text-red-500">{error}</p>}

      {recoveries.length === 0 ? (
        <p>No recoveries found for this email.</p>
      ) : (
        <div>
          {recoveries.map((recovery, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md shadow-sm">
              <p><strong>Recovered Location:</strong> {recovery.recoveredLocation}</p>
              <p><strong>Recovered Date:</strong> {new Date(recovery.recoveredDate).toLocaleDateString()}</p>
              <p><strong>Recovered By:</strong> {recovery.recoveredPerson.name}</p>
              <p><strong>Email:</strong> {recovery.recoveredPerson.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecoveries;
