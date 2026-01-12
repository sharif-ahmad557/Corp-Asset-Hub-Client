import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHistory, FaCheck } from "react-icons/fa";
import {
  IoCubeOutline,
  IoRocketOutline,
  IoDiamondOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import CheckoutForm from "./CheckoutForm";

// Load Stripe Key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  // Enhanced package data to match HR Register style
  const packages = [
    {
      id: 1,
      name: "Basic",
      limit: 5,
      price: 5,
      icon: <IoCubeOutline className="text-3xl" />,
      colorClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
      desc: "For startups (5 Members)",
    },
    {
      id: 2,
      name: "Standard",
      limit: 10,
      price: 8,
      icon: <IoRocketOutline className="text-3xl" />,
      colorClass: "bg-violet-100 text-violet-600 dark:bg-violet-900/30",
      desc: "For growing teams (10 Members)",
      isPopular: true,
    },
    {
      id: 3,
      name: "Premium",
      limit: 20,
      price: 15,
      icon: <IoDiamondOutline className="text-3xl" />,
      colorClass: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
      desc: "For established companies (20 Members)",
    },
  ];

  const [selected, setSelected] = useState(packages[1]); // Default to Standard

  return (
    <div className="container mx-auto py-10 px-4 lg:px-8">
      <Helmet>
        <title>AssetMinder | Upgrade Package</title>
      </Helmet>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content">
            Upgrade Your Plan
          </h2>
          <p className="text-base-content/60 mt-1">
            Increase your employee limit and unlock more potential.
          </p>
        </div>
        <Link
          to="/payment-history"
          className="btn btn-outline btn-secondary gap-2 shadow-sm"
        >
          <FaHistory /> Payment History
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* SECTION 1: Package Selection (Left) */}
        <div className="w-full lg:w-2/3">
          <h3 className="font-bold text-lg mb-4 text-base-content">
            Select a Package
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                onClick={() => setSelected(pkg)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center h-full bg-base-100 shadow-sm
                    ${
                      selected.id === pkg.id
                        ? "border-primary shadow-lg ring-1 ring-primary"
                        : "border-transparent hover:border-base-300"
                    }`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <span className="badge badge-secondary badge-sm uppercase font-bold tracking-wider shadow-md">
                      Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`p-4 rounded-xl mb-4 ${pkg.colorClass} transition-colors`}
                >
                  {pkg.icon}
                </div>

                <h3 className="text-xl font-bold text-base-content">
                  {pkg.name}
                </h3>
                <p className="text-xs text-base-content/60 mb-4">{pkg.desc}</p>

                <div className="mt-auto">
                  <p className="text-3xl font-extrabold text-primary mb-1">
                    ${pkg.price}
                  </p>
                  <p className="text-xs text-base-content/50">/month</p>
                </div>

                {/* Selection Indicator */}
                <div className="mt-4">
                  {selected.id === pkg.id ? (
                    <IoCheckmarkCircle className="text-3xl text-primary" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-base-200"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefit List (Visual Content) */}
          <div className="mt-8 bg-base-200/50 p-6 rounded-xl border border-base-200">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <span className="text-primary">
                <FaCheck />
              </span>
              Why Upgrade?
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-base-content/70">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-base-content/40"></div>{" "}
                Add more employees to your team
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-base-content/40"></div>{" "}
                Unlock advanced reporting features
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-base-content/40"></div>{" "}
                Priority email support
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-base-content/40"></div>{" "}
                Secure payment processing
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 2: Payment Form (Right) */}
        <div className="w-full lg:w-1/3">
          <div className="bg-base-100 p-6 lg:p-8 rounded-2xl shadow-xl border border-base-200 sticky top-24">
            <h3 className="text-xl font-bold mb-1 text-center text-base-content">
              Secure Checkout
            </h3>
            <p className="text-center text-sm text-base-content/60 mb-6">
              Complete your purchase securely.
            </p>

            <Elements stripe={stripePromise}>
              <CheckoutForm selectedPackage={selected} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
