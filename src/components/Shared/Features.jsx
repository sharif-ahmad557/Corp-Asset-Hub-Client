import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMobileAlt,
  FaChartLine,
  FaShieldAlt,
  FaSync,
  FaArrowRight,
} from "react-icons/fa";

const featuresData = [
  {
    title: "Mobile Asset Scanning",
    desc: "Empower your field workforce with our native mobile app. Scan QR codes, barcodes, and RFID tags instantly to update asset status from anywhere. Works offline and syncs automatically when reconnected.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop",
    icon: <FaMobileAlt />,
    reverse: false,
  },
  {
    title: "Advanced Analytics & Forecasting",
    desc: "Stop guessing and start planning. Our AI-driven dashboard provides real-time insights into asset depreciation, maintenance schedules, and procurement needs. Export customizable reports in PDF or CSV.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    icon: <FaChartLine />,
    reverse: true,
  },
  {
    title: "Enterprise-Grade Security",
    desc: "Your data is protected by AES-256 bit encryption. We offer Granular Role-Based Access Control (RBAC), Single Sign-On (SSO), and detailed audit logs to ensure compliance with global standards.",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
    icon: <FaShieldAlt />,
    reverse: false,
  },
  {
    title: "Seamless Integrations",
    desc: "AssetMinder plays well with others. Connect seamlessly with SAP, Oracle, Jira, and Slack. Automate workflows using our robust REST API and Webhooks.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    icon: <FaSync />,
    reverse: true,
  },
];

const Features = () => {
  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=800&auto=format&fit=crop";
  };

  return (
    <div className="py-24 bg-base-100 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="badge badge-primary badge-outline mb-4 px-4 py-3 font-semibold tracking-wider uppercase"
        >
          CORE FEATURES
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold mb-6 text-base-content"
        >
          Powerful Features for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
            Modern Asset Management
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-base-content/70"
        >
          Discover the tools that make <strong>AssetMinder</strong> the #1
          choice for HR and IT managers globally.
        </motion.p>
      </div>

      {/* Feature Blocks */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-24 mb-24">
        {featuresData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
              item.reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image Side */}
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-base-200 group bg-base-200 min-h-[300px]">
                <img
                  src={item.img}
                  alt={item.title}
                  onError={handleImageError}
                  className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center text-3xl text-primary shadow-sm mx-auto lg:mx-0">
                {item.icon}
              </div>
              <h2 className="text-3xl font-bold text-base-content">
                {item.title}
              </h2>
              <p className="text-lg text-base-content/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 text-center"
      >
        <div className="bg-gradient-to-r from-blue-600 to-violet-700 rounded-3xl p-10 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6 relative z-10">
            Ready to Experience These Features?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg relative z-10">
            Join thousands of teams who are already optimizing their asset
            management with AssetMinder.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link
              to="/join-hr"
              className="btn bg-white text-blue-700 hover:bg-gray-100 border-none rounded-full px-8 text-lg shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-700 rounded-full px-8 text-lg gap-2"
            >
              Contact Sales <FaArrowRight />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
