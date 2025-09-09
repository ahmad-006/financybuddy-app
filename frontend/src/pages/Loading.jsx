import React from "react";

const loading = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

        {/* Optional text */}
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default loading;
