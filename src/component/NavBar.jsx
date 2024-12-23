import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../contex/AuthContex/AuthContex";
import axios from "axios"; // Make sure axios is imported

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext); // Use AuthContext
  const isAuthenticated = !!user; // Check if the user is logged in

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      // Clear JWT token from cookies on the client side
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });

      // Clear user state in AuthContext
      setUser(null);

      // Optionally show a message
      alert("You have logged out!");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="bg-blue-600 shadow-lg fixed z-50 top-0 w-[100%]">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <Link to="/">WhereIsIt</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className="text-white hover:text-gray-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/allItems"
            className="text-white hover:text-gray-300"
          >
            Lost & Found
          </NavLink>

          {/* Conditional Login/Logout */}
          {isAuthenticated ? (
            <div className="relative">
              {/* Profile Picture */}
              <img
                src={user?.photoURL || "/default-profile.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow-lg w-48">
                  <p className="text-sm font-semibold text-gray-700">
                    {user?.displayName || "User"}
                  </p>
                  <NavLink
                    to="/myItems"
                    className="block text-sm hover:bg-gray-200 p-2"
                  >
                    Manage My Items
                  </NavLink>
                  <NavLink
                    to="/allRecovered"
                    className="block text-sm hover:bg-gray-200 p-2"
                  >
                    All Recovered Items
                  </NavLink>
                  <NavLink
                    to="/addItems"
                    className="block text-sm hover:bg-gray-200 p-2"
                  >
                    Add Lost & Found Item
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block text-sm text-red-600 hover:bg-gray-200 p-2 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/auth/login"
                className="text-white hover:text-gray-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className="text-white hover:text-gray-300"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
