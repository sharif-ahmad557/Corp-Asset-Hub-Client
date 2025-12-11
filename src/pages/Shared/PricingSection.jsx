import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  // Pricing Data
  const plans = [
    {
      name: "Starter",
      price: isYearly ? 190 : 19,
      description:
        "Perfect for small teams and startups starting their journey.",
      features: [
        "Track up to 500 Assets",
        "2 Team Members",
        "Basic Reporting",
        "Mobile App Access",
        "Email Support",
      ],
      notIncluded: ["API Access", "Audit Logs", "Dedicated Manager"],
      recommended: false,
    },
    {
      name: "Professional",
      price: isYearly ? 490 : 49,
      description:
        "Ideal for growing businesses needing automation & insights.",
      features: [
        "Unlimited Asset Tracking",
        "10 Team Members",
        "Advanced Analytics Dashboard",
        "Barcode & QR Code Generation",
        "Audit Trails & History",
        "Priority Email Support",
      ],
      notIncluded: ["Dedicated Manager"],
      recommended: true, // Highlight this plan
    },
    {
      name: "Enterprise",
      price: isYearly ? 990 : 99,
      description:
        "Full-scale solution for large organizations with complex needs.",
      features: [
        "Unlimited Everything",
        "Unlimited Team Members",
        "Custom API Integrations",
        "SSO & Advanced Security",
        "White-label Options",
        "24/7 Dedicated Account Manager",
        "On-premise Deployment Option",
      ],
      notIncluded: [],
      recommended: false,
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-base-100 relative" id="pricing">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Transparent Pricing for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Every Stage
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base-content/70 text-lg"
          >
            Choose the plan that fits your asset management needs. No hidden
            fees, cancel anytime.
          </motion.p>

          {/* Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <span
              className={`font-medium ${
                !isYearly ? "text-primary" : "text-base-content/60"
              }`}
            >
              Monthly
            </span>
            <input
              type="checkbox"
              className="toggle toggle-lg toggle-primary hover:toggle-accent"
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
            />
            <span
              className={`font-medium ${
                isYearly ? "text-primary" : "text-base-content/60"
              }`}
            >
              Yearly{" "}
              <span className="badge badge-accent badge-sm text-xs ml-1 font-bold animate-pulse">
                -20%
              </span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 border 
                ${
                  plan.recommended
                    ? "bg-base-100 shadow-2xl scale-105 border-primary z-10"
                    : "bg-base-100 shadow-lg border-base-200 hover:border-primary/50"
                }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="badge badge-primary badge-lg px-4 py-3 font-bold shadow-lg uppercase tracking-wider text-xs">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-base-content">
                  {plan.name}
                </h3>
                <p className="text-sm text-base-content/60 mt-2 min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight">
                  ${plan.price}
                </span>
                <span className="text-base-content/50 ml-2">
                  /{isYearly ? "year" : "mo"}
                </span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-base-content/80"
                  >
                    <FaCheckCircle className="text-primary mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-base-content/40 decoration-clone"
                  >
                    <FaTimesCircle className="mt-1 shrink-0" />
                    <span className="line-through">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn w-full rounded-full text-lg normal-case transition-all duration-300
                  ${
                    plan.recommended
                      ? "btn-primary hover:shadow-lg hover:shadow-primary/40 text-white border-none bg-gradient-to-r from-blue-600 to-violet-600"
                      : "btn-outline btn-primary hover:bg-primary hover:text-white"
                  }`}
              >
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-base-content/50 flex justify-center items-center gap-2">
            <FaCheckCircle className="text-success" /> No credit card required
            for 14-day free trial
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
