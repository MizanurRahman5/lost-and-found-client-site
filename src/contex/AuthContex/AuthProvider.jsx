import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContex";
import { createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged-in user state
  const [loading, setLoading] = useState(true); // Loading state

  // User creation function
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  
  useEffect(() => {
    // Use browserSessionPersistence if you want session-only persistence
    setPersistence(auth, browserLocalPersistence)  // or use browserSessionPersistence
      .then(() => {
        console.log("Persistence set successfully");
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 

        // If user is logged in, send JWT request to backend
        const user = { email: currentUser.email };
        axios
          .post('http://localhost:5000/jwt', user, { withCredentials: true }) // Adjust the URL as necessary
          .then((res) => {
            console.log('login token', res.data);
            setLoading(false); // Stop loading once user info is fetched
          })
          .catch((error) => {
            console.error('Error fetching JWT:', error);
            setLoading(false); // Stop loading on error as well
          });
      } else {
        // If no user, logout from backend
        axios
          .post('http://localhost:5000/logout', {}, { withCredentials: true }) // Adjust the URL as necessary
          .then((res) => {
            console.log('logout', res.data);
            setLoading(false); // Stop loading once logged out
          })
          .catch((error) => {
            console.error('Error logging out:', error);
            setLoading(false); // Stop loading on error as well
          });
      }
      console.log('state capture', currentUser);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  // Authentication context value
  const authInfo = {
    user,
    setUser, // Allow other components to update user state
    loading,
    setLoading, // Allow other components to update loading state
    createUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
