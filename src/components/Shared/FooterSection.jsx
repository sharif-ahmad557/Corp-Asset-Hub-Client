import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPaperPlane,
  FaHeart,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import toast from "react-hot-toast";

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
    x: 5,
    color: "#ffffff",
    transition: { type: "spring", stiffness: 300 },
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
    e.target.reset();
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[#0f172a] text-base-content/60 pt-20 pb-10 relative overflow-hidden font-sans"
    >
      {/* Background Decor (Glow Effects) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                AssetMinder
              </h2>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Empowering businesses with next-gen asset tracking solutions.
              Simple, smart, and secure management for your entire inventory.
            </p>
            <div className="flex gap-4">
              {/* Using external links for socials as per standard */}
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={socialHover}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-all shadow-lg border border-white/10"
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={socialHover}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-sky-500 hover:text-white transition-all shadow-lg border border-white/10"
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={socialHover}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-blue-700 hover:text-white transition-all shadow-lg border border-white/10"
              >
                <FaLinkedinIn />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={socialHover}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-pink-600 hover:text-white transition-all shadow-lg border border-white/10"
              >
                <FaInstagram />
              </motion.a>
            </div>
          </div>

          {/* Column 2: Quick Links (Real Routes Only) */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Features", path: "/features" },
                { name: "Pricing", path: "/pricing" },
              ].map((item, i) => (
                <motion.li key={i} whileHover={linkHover} className="w-fit">
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (Replaces Dummy Resources) */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" />
                <span>
                  123 Business Avenue, Suite 100 <br />
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhoneAlt className="text-blue-500 shrink-0" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="text-blue-500 shrink-0" />
                <span>support@assetminder.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to get the latest feature updates.
            </p>
            <form onSubmit={handleNewsletter} className="relative">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 text-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-1.5 top-1.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white p-2 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition-shadow"
              >
                <FaPaperPlane />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} AssetMinder. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
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
