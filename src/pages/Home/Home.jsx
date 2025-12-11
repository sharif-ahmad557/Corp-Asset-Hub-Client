import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../Shared/HeroSection";
import AboutSection from "../Shared/AboutSection";
import PricingSection from "../Shared/PricingSection";
import FeaturesSection from "../Shared/FeaturesSection";
import TestimonialsSection from "../Shared/TestimonialsSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <PricingSection />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
