import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contex/AuthContex/AuthContex";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // লোডিং স্টেট চেক করা হচ্ছে

  if (loading) {
    return <div>Loading...</div>; // লোডিং ইন্ডিকেটর দেখান
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRoute;
