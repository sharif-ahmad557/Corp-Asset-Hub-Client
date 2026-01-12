import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 relative overflow-hidden">
      <Helmet>
        <title>AssetMinder | 404 Not Found</title>
      </Helmet>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <div className="text-center z-10 px-4">
        {/* Icon Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="p-6 bg-base-100 rounded-full shadow-xl border border-base-200">
            <FaExclamationTriangle className="text-6xl text-warning" />
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight"
        >
          404
        </motion.h1>

        {/* Error Message */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl lg:text-4xl font-bold text-base-content mt-2"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base-content/60 mt-4 max-w-md mx-auto text-lg leading-relaxed"
        >
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30 gap-2 hover:scale-105 transition-transform"
          >
            <FaHome /> Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
