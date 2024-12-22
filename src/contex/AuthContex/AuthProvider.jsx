import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContex";
import { createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import auth from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Logged-in user state
    const [loading, setLoading] = useState(true); // Loading state

    // User creation function
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Set persistence when component mounts
    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                // Successfully set persistence
            })
            .catch((error) => {
                console.error("Error setting persistence:", error);
            });

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // User is logged in
            } else {
                setUser(null); // User is logged out
            }
            setLoading(false); // Set loading to false once auth state is known
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
