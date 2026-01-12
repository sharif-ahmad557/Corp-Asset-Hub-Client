import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import FooterSection from "../components/Shared/FooterSection";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content font-sans antialiased">
      {/* ScrollRestoration ensures page starts at top on navigation */}
      <ScrollRestoration />

      {/* Fixed Navbar */}
      <Navbar />

      <main className="flex-grow pt-24 px-4 container mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default MainLayout;
