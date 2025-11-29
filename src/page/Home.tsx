import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Welcome</h1>
        <p className="mb-8 text-gray-600">User Registration System</p>
        <div className="space-y-4">
          <Link
            to="/register"
            className="block w-full py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="block w-full py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

