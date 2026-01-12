import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      {/* Icon Graphic */}
      <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-white"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>

      {/* Text Logo */}
      <div className="flex flex-col leading-none">
        <span className="text-xl font-bold tracking-tight text-base-content group-hover:text-primary transition-colors">
          Asset<span className="text-primary">Minder</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-base-content/50 font-medium">
          Manager
        </span>
      </div>
    </Link>
  );
};

export default Logo;
