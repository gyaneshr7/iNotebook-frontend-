// LandingPage.js

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
   const navigate = useNavigate();
  useEffect(() => {
    const handleAuth = async () => {
      const isLoggedIn = localStorage.getItem("token");
      console.log(isLoggedIn);
      if (isLoggedIn !== null) {
        navigate("/dashboard");
      }
    };

    handleAuth();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800">iNotebook</h1>
        <p className="text-lg text-gray-600 mt-4">
          A simple note-making application built with the MERN stack.
        </p>
        <div className="mt-6">
          <Link to="/signup">
            <button className="btn mr-4 p-3 hover:bg-blue-600 hover:text-white hover:p-3 hover:rounded-md">
              {" "}
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="btn p-3 hover:bg-red-600 hover:text-white hover:p-3 hover:rounded-md">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
