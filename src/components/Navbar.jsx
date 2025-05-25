import React from "react";
import { FaSpotify } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <FaSpotify className="text-green-500 text-3xl" />
        <h1 className="text-xl font-bold">Spotify Clone</h1>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
        <li className="hover:text-green-400 cursor-pointer">Home</li>
        <li className="hover:text-green-400 cursor-pointer">Search</li>
        <li className="hover:text-green-400 cursor-pointer">Library</li>
      </ul>
    </nav>
  );
};

export default Navbar;
