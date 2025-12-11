import React from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-base-100 relative overflow-hidden pt-24 pb-20">
      {/* 1. Background Decor (Glowing Blobs for Modern Look) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        {/* 2. Header Section */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="badge badge-primary badge-outline mb-4 px-4 py-3 font-semibold tracking-wider"
          >
            24/7 SUPPORT
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-bold mb-4"
          >
            Let's Start a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Conversation
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base-content/70 text-lg max-w-2xl mx-auto"
          >
            Whether you need a demo, have a technical question, or just want to
            say hello — our team is ready to help you optimize your assets.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* 3. Left Side: Interactive Contact Info Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Email Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-bold mb-1">Email Us</h3>
              <p className="text-base-content/60 mb-2 text-sm">
                Our team typically replies within 2 hours.
              </p>
              <a
                href="mailto:support@assetverse.com"
                className="text-primary font-semibold hover:underline"
              >
                support@assetverse.com
              </a>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                <FaPhoneAlt />
              </div>
              <h3 className="text-xl font-bold mb-1">Call Us</h3>
              <p className="text-base-content/60 mb-2 text-sm">
                Mon-Fri from 8am to 5pm.
              </p>
              <a
                href="tel:+15551234567"
                className="text-primary font-semibold hover:underline"
              >
                +1 (555) 123-4567
              </a>
            </motion.div>

            {/* Address Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-bold mb-1">Visit Us</h3>
              <p className="text-base-content/60 mb-2 text-sm">
                123 Tech Avenue, Silicon Valley, CA.
              </p>
              <a
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                View on Google Maps
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="pt-4 flex gap-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-base-content/60 hover:bg-gradient-to-r hover:from-blue-600 hover:to-violet-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  >
                    <Icon />
                  </a>
                )
              )}
            </motion.div>
          </motion.div>

          {/* 4. Right Side: Modern Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-base-100 p-8 lg:p-10 rounded-3xl shadow-2xl border border-base-200 relative overflow-hidden"
          >
            {/* Top Border Gradient */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-violet-600"></div>

            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control group">
                  <label className="label pl-0">
                    <span className="label-text font-bold text-base-content/80 group-focus-within:text-primary transition-colors">
                      First Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-base-200/40 h-12"
                  />
                </div>
                <div className="form-control group">
                  <label className="label pl-0">
                    <span className="label-text font-bold text-base-content/80 group-focus-within:text-primary transition-colors">
                      Last Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-base-200/40 h-12"
                  />
                </div>
              </div>

              <div className="form-control group">
                <label className="label pl-0">
                  <span className="label-text font-bold text-base-content/80 group-focus-within:text-primary transition-colors">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-base-200/40 h-12"
                />
              </div>

              <div className="form-control group">
                <label className="label pl-0">
                  <span className="label-text font-bold text-base-content/80 group-focus-within:text-primary transition-colors">
                    Your Message
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-base-200/40 text-base"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-violet-600 border-none text-white shadow-lg hover:shadow-blue-500/30 normal-case rounded-xl"
              >
                Send Message <FaPaperPlane className="ml-2 text-sm" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
