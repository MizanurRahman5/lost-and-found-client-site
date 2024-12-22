import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contex/AuthContex/AuthContex";
import { updateProfile } from "firebase/auth"; // Import updateProfile

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
  });
  const { createUser, setUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState(""); // To store validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;

    // Password length check
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    // Password strength check: must include upper, lower, number, and special character
    const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordStrength.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    return ""; // No validation errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before submitting
    const validationError = validatePassword();
    if (validationError) {
      setError(validationError);
      return; // Stop the form submission if validation fails
    }

    try {
      setLoading(true);
      const userCredential = await createUser(formData.email, formData.password);
      const user = userCredential.user;

      // Update profile with name and photo URL
      if (formData.name || formData.photoUrl) {
        await updateProfile(user, {
          displayName: formData.name,
          photoURL: formData.photoUrl,
        });
      }

      setUser(user); // Update user in context
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error creating user:", error.message);
      setError(error.message); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Join the community
        </h2>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="photoUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Photo URL (optional)
          </label>
          <input
            type="text"
            id="photoUrl"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message */}

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 px-6 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
