import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaTools,
  FaChartPie,
  FaQrcode,
  FaUserShield,
  FaCloudUploadAlt,
  FaArrowRight,
} from "react-icons/fa";

const FeaturesSection = () => {
  // Feature Data
  const features = [
    {
      id: 1,
      title: "Real-Time Tracking",
      desc: "Monitor asset location and status instantly using GPS and IoT integration. Eliminate ghost assets forever.",
      icon: <FaMapMarkedAlt />,
    },
    {
      id: 2,
      title: "Predictive Maintenance",
      desc: "AI-driven scheduling prevents downtime. Get alerts before equipment fails, extending asset lifespan.",
      icon: <FaTools />,
    },
    {
      id: 3,
      title: "Lifecycle Analytics",
      desc: "Comprehensive insights from procurement to disposal. Optimize depreciation and calculate TCO effortlessly.",
      icon: <FaChartPie />,
    },
    {
      id: 4,
      title: "Smart Auditing",
      desc: "Conduct lightning-fast audits with our mobile scanner. Support for QR Codes, Barcodes, and RFID tags.",
      icon: <FaQrcode />,
    },
    {
      id: 5,
      title: "Enterprise Security",
      desc: "Bank-grade encryption with Granular Role-Based Access Control (RBAC) to keep your data secure.",
      icon: <FaUserShield />,
    },
    {
      id: 6,
      title: "Cloud Sync & API",
      desc: "Seamlessly integrate with ERPs like SAP or Oracle. Access your data securely from any device, anywhere.",
      icon: <FaCloudUploadAlt />,
    },
  ];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      className="py-24 bg-base-200 relative overflow-hidden"
      id="features"
    >
      {/* Background Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="badge badge-primary badge-outline mb-4 px-4 py-3 font-semibold tracking-wider uppercase">
              Key Capabilities
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                Scale Your Operations
              </span>
            </h2>
            <p className="text-lg text-base-content/70">
              Powerful features designed for modern teams. AssetVerse brings
              clarity to chaos with a suite of intelligent tools.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className="group bg-base-100 p-8 rounded-2xl border border-base-content/5 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 flex items-center justify-center text-2xl text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-base-content/70 leading-relaxed text-sm">
                {feature.desc}
              </p>

              {/* Learn More Link (Visual Only) */}
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span>Learn more</span> <FaArrowRight className="text-xs" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Call to Action Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-violet-700 rounded-3xl p-8 lg:p-12 text-white flex flex-col lg:flex-row items-center justify-between shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>

          <div className="relative z-10 text-center lg:text-left mb-6 lg:mb-0">
            <h3 className="text-2xl lg:text-3xl font-bold mb-2">
              Ready to optimize your assets?
            </h3>
            <p className="text-blue-100">
              Join 500+ companies streamlining their inventory today.
            </p>
          </div>
          <div className="relative z-10">
            <button className="btn bg-white text-blue-700 hover:bg-gray-100 border-none rounded-full px-8 text-lg shadow-lg hover:scale-105 transition-transform">
              Get Started Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
