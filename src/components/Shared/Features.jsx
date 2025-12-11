import React from "react";
import { motion } from "framer-motion";
import { FaMobileAlt, FaChartLine, FaShieldAlt, FaSync } from "react-icons/fa";

const featuresData = [
  {
    title: "Mobile Asset Scanning",
    desc: "Empower your field workforce with our native mobile app. Scan QR codes, barcodes, and RFID tags instantly to update asset status from anywhere. Works offline and syncs automatically when reconnected.",
    // New Stable Image Link (Mobile & Tech context)
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
    desc: "AssetVerse plays well with others. Connect seamlessly with SAP, Oracle, Jira, and Slack. Automate workflows using our robust REST API and Webhooks.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    icon: <FaSync />,
    reverse: true,
  },
];

const Features = () => {
  // Fallback function for broken images
  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=800&auto=format&fit=crop"; // A reliable backup image
  };

  return (
    <div className="pt-24 pb-16 bg-base-100 overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-5xl font-bold mb-6"
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
          Discover the tools that make AssetVerse the #1 choice for HR and IT
          managers globally.
        </motion.p>
      </div>

      {/* Feature Blocks */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-24">
        {featuresData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col lg:flex-row items-center gap-12 ${
              item.reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image Side */}
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-base-200 group bg-base-200 min-h-[300px]">
                <img
                  src={item.img}
                  alt={item.title}
                  onError={handleImageError} // Added Error Handler
                  className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center text-3xl text-primary shadow-sm">
                {item.icon}
              </div>
              <h2 className="text-3xl font-bold">{item.title}</h2>
              <p className="text-lg text-base-content/70 leading-relaxed">
                {item.desc}
              </p>
              <button className="btn btn-link text-primary p-0 no-underline hover:underline">
                Learn more &rarr;
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
