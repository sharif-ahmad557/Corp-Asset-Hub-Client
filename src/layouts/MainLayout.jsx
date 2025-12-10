import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      {/* Navbar fixed তাই প্যাডিং দিচ্ছি */}
      <div className="pt-20 min-h-[calc(100vh-68px)] container mx-auto px-4">
        <Outlet />
      </div>
      {/* Footer will go here */}
    </div>
  );
};

export default MainLayout;
