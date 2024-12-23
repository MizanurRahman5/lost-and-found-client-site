import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import auth from '../firebase/firebase.init';
import AuthContext from '../contex/AuthContex/AuthContex';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state for form submission
  const { setUser } = useContext(AuthContext); // Access AuthContext
  const navigate = useNavigate(); // To navigate after login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error
    setLoading(true); // Start loading
  
    try {
      // Sign in with Firebase using email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
  
      // Set the logged-in user in context
      setUser(userCredential.user); 
  
      // Display success message
      await Swal.fire({
        title: 'Success!',
        text: 'Login successful!',
        icon: 'success',
        confirmButtonText: 'Okay',
      });
  
      // Navigate to home page after login success
      navigate('/');
    } catch (err) {
      // Handle specific Firebase errors for better clarity
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };
  

  // Google login handler
  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user); // Set the logged-in user in context
      Swal.fire({
        title: 'Success!',
        text: 'Google login successful!',
        icon: 'success',
        confirmButtonText: 'Okay',
      }).then(() => {
        navigate('/'); // Navigate to home page after Google login
      });
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 lg:p-12">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full lg:w-3/4">
        {/* Left Side - Card Section */}
        <div className="relative lg:w-1/2 bg-gray-100 flex items-center justify-center p-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full">
            <img
              className="w-full max-h-[500px] object-cover"
              src="https://source.unsplash.com/featured/?technology"
              alt="Login Illustration"
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="text-center mt-4">
            <p>Or continue with</p>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="mt-4 w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
              disabled={loading} // Disable button while loading
            >
              <span className="mr-2 text-blue-600">G</span> Google
            </button>
          </div>

          <div className="text-center mt-6">
            <p>
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
