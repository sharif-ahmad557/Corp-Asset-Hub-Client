import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import FooterSection from "../components/Shared/FooterSection";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20 min-h-[calc(100vh-68px)] container mx-auto px-4">
        <Outlet />
      </div>
      <FooterSection />
    </div>
  );
};

export default MainLayout;
