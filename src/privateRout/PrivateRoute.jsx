import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contex/AuthContex/AuthContex";


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // user কে AuthContext থেকে নিয়ে আসা

  if (!user) {
    
    return <Navigate to="/auth/login" replace />;
  }

  return children; 
};

export default PrivateRoute;
