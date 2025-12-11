import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaPlayCircle } from "react-icons/fa";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0, x: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div className="hero pt-16 min-h-[90vh] bg-base-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-violet-600/20 blur-[100px]"></div>
      </div>

      <div className="hero-content flex-col lg:flex-row-reverse px-6 lg:px-16 max-w-7xl mx-auto gap-12">
        <motion.div
          className="flex-1 w-full relative"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Asset Management Dashboard"
            />
            {/* Overlay Gradient on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          <motion.div
            className="absolute -bottom-6 -left-6 bg-base-100 p-4 rounded-xl shadow-xl border border-base-200 hidden md:block"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-3">
              <div
                className="radial-progress text-primary text-xs"
                style={{ "--value": 85 }}
                role="progressbar"
              >
                85%
              </div>
              <div>
                <p className="font-bold text-sm">Efficiency Boost</p>
                <p className="text-xs opacity-60">Last 30 Days</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="badge badge-primary badge-outline mb-4 font-semibold px-4 py-3"
          >
            🚀 The Future of Asset Tracking
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-6xl font-bold leading-tight"
          >
            Master Your Assets, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Maximize Efficiency.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="py-6 text-lg text-base-content/80 max-w-lg leading-relaxed"
          >
            AssetVerse empowers modern enterprises to track, manage, and
            optimize physical and digital assets in real-time. Gain complete
            visibility and control with our AI-driven dashboard.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="btn btn-primary border-none bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-lg hover:shadow-blue-500/30 text-white px-8 rounded-full normal-case text-lg group">
              Get Started Free
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn btn-ghost hover:bg-base-200 px-8 rounded-full normal-case text-lg gap-3 border border-base-300">
              <FaPlayCircle className="text-2xl text-violet-600" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center gap-4 text-sm opacity-70"
          >
            <div className="flex -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-base-100"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                alt="user"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-base-100"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64"
                alt="user"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-base-100"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64"
                alt="user"
              />
            </div>
            <p>Trusted by 1000+ Companies</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
