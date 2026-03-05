import React, { useEffect } from "react";
import logo from "../../assets/logo.png";

function Loader() {
  useEffect(()=> {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, [])
  return (
    <div
      role="status"
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-900 via-emerald-800 to-[#003d29]"
    >
      {/* Animated Container */}
      <div className="relative flex items-center justify-center">

        {/* Rotating Ring */}
        <div className="absolute w-28 h-28 sm:w-35 sm:h-35 rounded-full border-4 border-t-transparent border-emerald-400 animate-spin"></div>

        {/* Glow Ring */}
        <div className="absolute w-40 h-40 rounded-full bg-emerald-400 opacity-20 blur-3xl animate-pulse"></div>

        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          className=" h-17 sm:h-20 relative z-10 drop-shadow-2xl"
        />
      </div>

      {/* Text Section */}
      <div className="mt-10 text-center">
        <p className="text-2xl font-bold text-white tracking-wide">
          Bringing Grocery to You
          <span className="inline-flex ml-1">
            <span className="animate-bounce delay-0">.</span>
            <span className="animate-bounce delay-150">.</span>
            <span className="animate-bounce delay-300">.</span>
          </span>
        </p>

        <p className="text-sm text-emerald-200 mt-3">
          Please wait while we prepare your experience
        </p>
      </div>

      {/* Custom Floating Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Loader;