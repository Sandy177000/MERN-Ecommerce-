import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

const PageNotFound = () => {

  return (
    <div class="h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p class="text-2xl text-gray-600 mb-8">Page Not Found</p>
        <Link to="/auth/login" className="items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
          Go back to login page
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
