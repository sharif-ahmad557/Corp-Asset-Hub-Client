import React from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import toast from "react-hot-toast";

const NewsletterSection = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    e.target.reset();
  };

  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 to-violet-600/5"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-6 lg:px-16 relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-[#0f172a] rounded-3xl p-8 md:p-16 shadow-2xl text-white overflow-hidden relative"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <FaRocket className="text-9xl transform rotate-45" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to transform your <br /> Asset Management?
          </h2>
          <p className="text-blue-200 mb-10 max-w-lg mx-auto text-lg">
            Join 10,000+ companies streamlining their operations with
            AssetMinder. Start your free trial today.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="input input-bordered w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="btn btn-primary bg-gradient-to-r from-blue-500 to-violet-600 border-none text-white px-8"
            >
              Get Started
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-500">
            No credit card required. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
