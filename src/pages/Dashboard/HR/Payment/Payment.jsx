import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; 
import CheckoutForm from "./CheckoutForm";
import { FaHistory } from "react-icons/fa";

// Load Stripe Key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const packages = [
    { id: 1, name: "Basic (5 Members)", limit: 5, price: 5 },
    { id: 2, name: "Standard (10 Members)", limit: 10, price: 8 },
    { id: 3, name: "Premium (20 Members)", limit: 20, price: 15 },
  ];

  const [selected, setSelected] = useState(packages[1]); // Default to Standard

  return (
    <div className="container mx-auto my-10 p-4">
      <Helmet>
        <title>AssetVerse | Upgrade Package</title>
      </Helmet>

      {/* Header Section with History Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Upgrade Your Plan</h2>
        <Link
          to="/payment-history"
          className="btn btn-outline btn-secondary flex items-center gap-2"
        >
          <FaHistory /> Payment History
        </Link>
      </div>

      {/* SECTION 1: Packages (Top) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => setSelected(pkg)}
            className={`card bg-base-100 shadow-xl border-2 cursor-pointer transition-all hover:scale-105 ${
              selected.id === pkg.id
                ? "border-primary ring-2 ring-primary ring-offset-2"
                : "border-gray-200"
            }`}
          >
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold text-gray-700">{pkg.name}</h3>
              <p className="text-4xl font-extrabold text-primary my-4">
                ${pkg.price}
              </p>
              <div className="badge badge-secondary mx-auto">
                Increase Limit to {pkg.limit}
              </div>
              {selected.id === pkg.id && (
                <div className="badge badge-success text-white mt-2">
                  Selected
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 2: Payment Details (Bottom) */}
      <div className="max-w-3xl mx-auto bg-base-200 p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold mb-2 text-center">Payment Details</h3>
        <p className="text-center mb-6 text-gray-600">
          You are about to pay{" "}
          <span className="font-bold text-primary">${selected.price}</span> for
          the <span className="font-bold">{selected.name}</span> package.
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm selectedPackage={selected} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
