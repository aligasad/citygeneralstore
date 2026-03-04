import React from "react";
import logo from '../../assets/logo.png'

function Loader() {
  return (
    <div
      role="status"
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-green-200 dark:from-[#003d29] dark:to-[#048b5e]"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Leaf Icon */}
        
        {/* Subtle ring animation */}
        <img src={logo} alt="" className="h-14 sm:h-18 animate-bounce drop-shadow-lg" />
      </div>
      <div className="mt-8 text-center">
        <p className="text-xl font-bold text-white animate-pulse">
          Bringing Grocery to You...
        </p>
        <p className="text-sm text-white mt-2">
          Please wait while we prepare your experience!
        </p>
      </div>
    </div>
  );
}

export default Loader;
