import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="text-center text-white px-6 py-12 md:px-12">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
        <p className="text-lg mb-6">It looks like nothing was found at this location.</p>

        <Link
          to="/"
          className="px-6 py-2 text-lg font-semibold text-pink-500 bg-white rounded-full hover:bg-gray-200 transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
