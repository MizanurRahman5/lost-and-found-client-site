import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../contex/AuthContex/AuthContex";
import axios from "axios";
import Swal from "sweetalert2";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      setUser(null);

      // Show SweetAlert on logout
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect to login page after logout
      navigate("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong during logout. Please try again.",
      });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown")) {
        closeDropdown();
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="bg-blue-600 shadow-lg fixed z-50 top-0 w-full">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <Link to="/">WhereIsIt</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <NavLink to="/" className="text-white hover:text-gray-300">
            Home
          </NavLink>
          <NavLink to="/allItems" className="text-white hover:text-gray-300">
            Lost & Found
          </NavLink>

          {/* Conditional Login/Logout */}
          {isAuthenticated ? (
            <div className="relative dropdown">
              {/* Profile Picture */}
              <img
                src={user?.photoURL || "/default-profile.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-2 bg-white text-black p-2 rounded shadow-lg w-48 transition-opacity duration-300 ${
                  isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <p className="text-sm font-semibold text-gray-700">
                  {user?.displayName || "User"}
                </p>
                <NavLink
                  to="/myItems"
                  className="block text-sm hover:bg-gray-200 p-2"
                  onClick={closeDropdown}
                >
                  Manage My Items
                </NavLink>
                <NavLink
                  to="/allRecovered"
                  className="block text-sm hover:bg-gray-200 p-2"
                  onClick={closeDropdown}
                >
                  All Recovered Items
                </NavLink>
                <NavLink
                  to="/addItems"
                  className="block text-sm hover:bg-gray-200 p-2"
                  onClick={closeDropdown}
                >
                  Add Lost & Found Item
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                  className="block text-sm text-red-600 hover:bg-gray-200 p-2 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <NavLink to="/auth/login" className="text-white hover:text-gray-300">
                Login
              </NavLink>
              <NavLink to="/auth/register" className="text-white hover:text-gray-300">
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
