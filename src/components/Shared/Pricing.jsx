import React, { useState } from "react";
import { Link } from "react-router-dom"; // Added for navigation
import { motion } from "framer-motion";
import {
  FaCheck,
  FaTimes,
  FaQuestionCircle,
  FaRegGem,
  FaRocket,
  FaBuilding,
  FaArrowRight,
} from "react-icons/fa";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const comparisonFeatures = [
    { name: "Asset Limit", starter: "500", pro: "Unlimited", ent: "Unlimited" },
    { name: "Team Members", starter: "2", pro: "10", ent: "Unlimited" },
    { name: "Mobile App Access", starter: true, pro: true, ent: true },
    { name: "Barcode Generation", starter: true, pro: true, ent: true },
    { name: "Advanced Analytics", starter: false, pro: true, ent: true },
    { name: "API Access", starter: false, pro: false, ent: true },
    { name: "Audit Logs", starter: false, pro: true, ent: true },
    {
      name: "Dedicated Support",
      starter: "Email",
      pro: "Priority Email",
      ent: "24/7 Phone",
    },
    { name: "SSO Integration", starter: false, pro: false, ent: true },
  ];

  const plans = [
    {
      id: 1,
      name: "Starter",
      icon: <FaRocket />,
      price: isYearly ? 19 : 24,
      desc: "Essentials for small teams.",
      popular: false,
    },
    {
      id: 2,
      name: "Professional",
      icon: <FaRegGem />,
      price: isYearly ? 49 : 59,
      desc: "For growing businesses.",
      popular: true,
    },
    {
      id: 3,
      name: "Enterprise",
      icon: <FaBuilding />,
      price: isYearly ? 99 : 119,
      desc: "Advanced security & control.",
      popular: false,
    },
  ];

  return (
    <div className="bg-base-100 min-h-screen pt-20">
      {/* 1. Hero Section (Theme Aware Consistency) */}
      <div className="bg-base-200 py-24 relative overflow-hidden">
        {/* Animated Background Blobs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"
        ></motion.div>
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px]"
        ></motion.div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge badge-primary badge-outline mb-4 px-4 py-3 font-semibold tracking-wider uppercase">
              Flexible Plans
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-base-content">
              Plans that scale with your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                Business Growth
              </span>
            </h1>
            <p className="text-base-content/70 text-xl max-w-2xl mx-auto mb-10">
              Simple, transparent pricing. No hidden fees.
              <br />
              Start with a 14-day free trial.
            </p>
          </motion.div>

          {/* Animated Toggle Switch */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center bg-base-100 rounded-full p-1 border border-base-300 shadow-sm"
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                !isYearly
                  ? "bg-primary text-white shadow-md"
                  : "text-base-content/60 hover:text-base-content"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                isYearly
                  ? "bg-primary text-white shadow-md"
                  : "text-base-content/60 hover:text-base-content"
              }`}
            >
              Yearly{" "}
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full animate-pulse ${
                  isYearly ? "bg-white text-primary" : "bg-green-500 text-white"
                }`}
              >
                SAVE 20%
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 2. Pricing Cards (Floating Effect) */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              // Ensure consistent height (Req #3)
              className={`bg-base-100 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden group h-full
                    ${
                      plan.popular
                        ? "border-2 border-primary ring-4 ring-primary/5"
                        : "border border-base-200"
                    }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="badge badge-primary mb-4 px-3 py-1 font-bold tracking-wide absolute top-4 right-4"
                >
                  POPULAR
                </motion.div>
              )}

              <div
                className={`text-5xl mb-6 mt-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                  plan.popular ? "text-primary" : "text-base-content/40"
                }`}
              >
                {plan.icon}
              </div>

              <h3 className="text-2xl font-bold mb-2 text-base-content">
                {plan.name}
              </h3>
              <p className="text-base-content/60 mb-6 min-h-[48px]">
                {plan.desc}
              </p>

              <div className="text-4xl font-bold mb-1 text-base-content">
                ${plan.price}
                <span className="text-lg font-normal text-base-content/50">
                  /mo
                </span>
              </div>
              <p className="text-xs text-base-content/50 mb-8">
                {isYearly
                  ? "Billed yearly ($" + plan.price * 12 + ")"
                  : "Billed monthly"}
              </p>

              <div className="mt-auto w-full">
                <Link
                  to="/join-hr"
                  className={`btn w-full rounded-full text-lg normal-case transition-all ${
                    plan.popular
                      ? "btn-primary shadow-lg shadow-primary/30"
                      : "btn-outline btn-primary hover:text-white"
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 3. Detailed Comparison Table */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-base-content">
            Compare Features
          </h2>
          <p className="text-base-content/70">
            A detailed look at what's included in each plan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto"
        >
          <table className="table w-full border border-base-200 rounded-xl shadow-sm bg-base-100">
            <thead>
              <tr className="bg-base-200 text-base text-base-content">
                <th className="p-5 w-1/4">Features</th>
                <th className="p-5 w-1/4 text-center">Starter</th>
                <th className="p-5 w-1/4 text-center text-primary font-bold bg-primary/5">
                  Professional
                </th>
                <th className="p-5 w-1/4 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-base-200/60 transition-colors duration-200 border-b border-base-200 group text-base-content/80"
                >
                  <td className="p-4 font-medium group-hover:text-primary transition-colors">
                    {item.name}
                  </td>

                  {/* Starter Col */}
                  <td className="p-4 text-center">
                    {typeof item.starter === "boolean" ? (
                      item.starter ? (
                        <FaCheck className="inline text-success text-lg" />
                      ) : (
                        <FaTimes className="inline text-base-content/20 text-lg" />
                      )
                    ) : (
                      item.starter
                    )}
                  </td>

                  {/* Pro Col */}
                  <td className="p-4 text-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    {typeof item.pro === "boolean" ? (
                      item.pro ? (
                        <FaCheck className="inline text-success text-lg" />
                      ) : (
                        <FaTimes className="inline text-base-content/20 text-lg" />
                      )
                    ) : (
                      <span className="font-bold text-primary">{item.pro}</span>
                    )}
                  </td>

                  {/* Ent Col */}
                  <td className="p-4 text-center">
                    {typeof item.ent === "boolean" ? (
                      item.ent ? (
                        <FaCheck className="inline text-success text-lg" />
                      ) : (
                        <FaTimes className="inline text-base-content/20 text-lg" />
                      )
                    ) : (
                      item.ent
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* 4. Enterprise Banner (Zoom & Glow) */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-gray-300 max-w-lg">
              For large organizations with specific security, compliance, and
              integration needs, talk to our sales team.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn bg-white text-gray-900 hover:bg-gray-100 border-none rounded-full px-8 relative z-10 font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
          >
            Contact Sales <FaArrowRight />
          </Link>
        </motion.div>
      </div>

      {/* 5. FAQ Section (Staggered Accordion) */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-10 text-base-content">
          Frequently Asked Questions
        </h2>
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              q: "Can I switch plans later?",
              a: "Yes, you can upgrade or downgrade at any time. Prorated charges will apply.",
            },
            {
              q: "Do you offer discounts for non-profits?",
              a: "Yes! We offer a 50% discount for registered non-profit organizations. Contact support to apply.",
            },
            {
              q: "What happens if I exceed my asset limit?",
              a: "We will notify you when you approach the limit. You can upgrade your plan or archive old assets to make space.",
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="collapse collapse-arrow bg-base-200 rounded-xl border border-base-300 hover:border-primary/40 transition-colors"
            >
              <input
                type="radio"
                name="my-accordion-2"
                defaultChecked={i === 0}
              />
              <div className="collapse-title text-lg font-medium text-base-content group-hover:text-primary transition-colors">
                <div className="flex items-center gap-3">
                  <FaQuestionCircle className="text-primary" /> {faq.q}
                </div>
              </div>
              <div className="collapse-content text-base-content/70">
                <p>{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
