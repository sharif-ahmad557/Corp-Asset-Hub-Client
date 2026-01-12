import React from "react";
import {
  FaGoogle,
  FaAmazon,
  FaMicrosoft,
  FaUber,
  FaAirbnb,
  FaSpotify,
  FaSlack,
  FaDhl,
} from "react-icons/fa";
import { SiSamsung, SiTesla } from "react-icons/si";
import { motion } from "framer-motion";

const PartnersSection = () => {
  const logos = [
    { icon: <FaGoogle />, name: "Google" },
    { icon: <FaAmazon />, name: "Amazon" },
    { icon: <FaMicrosoft />, name: "Microsoft" },
    { icon: <FaUber />, name: "Uber" },
    { icon: <FaAirbnb />, name: "Airbnb" },
    { icon: <FaSpotify />, name: "Spotify" },
    { icon: <FaSlack />, name: "Slack" },
    { icon: <FaDhl />, name: "DHL" },
    { icon: <SiSamsung />, name: "Samsung" },
    { icon: <SiTesla />, name: "Tesla" },
  ];

  return (
    <section className="py-12 bg-base-100 border-b border-base-200 overflow-hidden text-base-content">
      <div className="text-center mb-8">
        <p className="text-sm font-bold text-base-content/50 uppercase tracking-widest">
          Trusted by 500+ Modern Companies
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradients for smooth fade effect at edges */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-base-100 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-base-100 to-transparent z-10"></div>

        <motion.div
          className="flex items-center gap-16 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {/* Double the array for infinite loop effect */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="text-4xl text-base-content/30 hover:text-primary transition-colors duration-300 cursor-pointer flex items-center gap-2"
            >
              {logo.icon}
              <span className="text-xl font-bold hidden md:block">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
