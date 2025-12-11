import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaUsers, FaGlobeAmericas } from "react-icons/fa";

const AboutSection = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageLeftVariant = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const imageRightVariant = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } },
  };

  return (
    <section className="py-24 bg-base-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Image Composition */}
          <div className="flex-1 relative w-full min-h-[400px]">
            {/* Main Image */}
            <motion.div
              variants={imageLeftVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute top-0 left-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                alt="Team Strategy Meeting"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Overlay Image (Secondary) */}
            <motion.div
              variants={imageRightVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-base-200 z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
                alt="Analytics Discussion"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Decorative Dot Grid */}
            <div className="absolute -top-10 -left-10 w-32 h-32 opacity-20 bg-[radial-gradient(#4f46e5_2px,transparent_2px)] [background-size:16px_16px]"></div>
          </div>

          {/* Right Side: Content */}
          <motion.div
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 mb-4"
            >
              <span className="h-1 w-12 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full"></span>
              <span className="text-sm font-bold tracking-widest text-primary uppercase">
                Who We Are
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mb-6 leading-tight"
            >
              Bridging the Gap Between <br />
              <span className="text-primary">Physical Assets</span> & Digital
              Intelligence.
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-base-content/70 text-lg mb-8 leading-relaxed"
            >
              At AssetVerse, our mission is simple: to eliminate the chaos of
              inventory management. We provide a unified platform that brings
              clarity to complex operations, enabling businesses to track
              lifecycle, reduce waste, and optimize procurement with AI-driven
              insights.
            </motion.p>

            {/* Statistics Row (DaisyUI Stats) */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-300 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3 text-blue-600">
                  <FaGlobeAmericas className="text-2xl" />
                </div>
                <h3 className="text-3xl font-extrabold text-base-content">
                  25+
                </h3>
                <p className="text-sm text-base-content/60 font-medium">
                  Countries Served
                </p>
              </div>

              <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-300 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-3 text-violet-600">
                  <FaUsers className="text-2xl" />
                </div>
                <h3 className="text-3xl font-extrabold text-base-content">
                  10k+
                </h3>
                <p className="text-sm text-base-content/60 font-medium">
                  Active Users
                </p>
              </div>

              <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-300 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-3 text-indigo-600">
                  <FaAward className="text-2xl" />
                </div>
                <h3 className="text-3xl font-extrabold text-base-content">
                  99%
                </h3>
                <p className="text-sm text-base-content/60 font-medium">
                  Retention Rate
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
