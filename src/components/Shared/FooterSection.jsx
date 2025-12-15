import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPaperPlane,
  FaHeart,
} from "react-icons/fa";

const FooterSection = () => {
  // Animations
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const socialHover = {
    scale: 1.2,
    rotate: 10,
    transition: { type: "spring", stiffness: 300 },
  };

  const linkHover = {
    x: 8,
    color: "#7c3aed", // Violet-600 color code
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[#0f172a] text-white pt-20 pb-10 relative overflow-hidden"
    >
      {/* Background Decor (Glow Effects) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              AssetVerse
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering businesses with next-gen asset tracking solutions.
              Simple, smart, and secure management for your entire inventory.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={socialHover}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-violet-600 hover:text-white transition-all shadow-lg border border-white/10"
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-100">Company</h3>
            <ul className="space-y-4">
              {["About Us", "Careers", "Partners", "Newsroom"].map(
                (item, i) => (
                  <motion.li
                    key={i}
                    whileHover={linkHover}
                    className="cursor-pointer text-gray-400 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </motion.li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-100">Resources</h3>
            <ul className="space-y-4">
              {[
                "Documentation",
                "API Reference",
                "Community",
                "Help Center",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={linkHover}
                  className="cursor-pointer text-gray-400"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-100">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Join our newsletter for the latest updates and features.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-gray-600"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-1.5 top-1.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white p-2 rounded-md hover:shadow-lg hover:shadow-violet-500/30 transition-shadow"
              >
                <FaPaperPlane />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} AssetVerse Systems. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1 text-gray-400"
          >
            Made with <FaHeart className="text-red-500 animate-pulse" /> by
            Sharif Ahmad
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default FooterSection;
