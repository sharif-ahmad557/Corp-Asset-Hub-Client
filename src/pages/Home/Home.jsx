import React from "react";
import { Helmet } from "react-helmet-async";

import HeroSection from "../Shared/HeroSection";
import PartnersSection from "../Shared/PartnersSection";
import AboutSection from "../Shared/AboutSection";
import HowItWorks from "../Shared/HowItWorks";
import FeaturesSection from "../Shared/FeaturesSection";
import PricingSection from "../Shared/PricingSection";
import TestimonialsSection from "../Shared/TestimonialsSection";
import BlogSection from "../Shared/BlogSection";
import FaqSection from "../Shared/FaqSection";
import NewsletterSection from "../Shared/NewsletterSection";

const Home = () => {
  return (
    <div className="overflow-x-hidden font-sans text-base-content">
      <Helmet>
        <title>AssetMinder | Home</title>
        <meta
          name="description"
          content="AssetMinder - The ultimate solution for corporate asset tracking and management. Streamline your inventory today."
        />
      </Helmet>

      <HeroSection />

      <PartnersSection />

      <AboutSection />

      <HowItWorks />

      <FeaturesSection />

      <PricingSection />

      <TestimonialsSection />

      <BlogSection />

      <FaqSection />

      <NewsletterSection />
    </div>
  );
};

export default Home;
