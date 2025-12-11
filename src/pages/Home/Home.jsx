import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../Shared/HeroSection";
import AboutSection from "../Shared/AboutSection";
import PricingSection from "../Shared/PricingSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <PricingSection />
    </div>
  );
};

export default Home;
