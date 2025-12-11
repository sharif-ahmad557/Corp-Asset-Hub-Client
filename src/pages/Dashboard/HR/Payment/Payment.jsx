import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";

// Load Stripe Key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  // Hardcoded packages for upgrade (can be fetched from DB too)
  const packages = [
    { id: 1, name: "Standard (10 Members)", limit: 10, price: 8 },
    { id: 2, name: "Premium (20 Members)", limit: 20, price: 15 },
  ];

  const [selected, setSelected] = useState(packages[0]);

  return (
    <div className="container mx-auto my-10 p-4 max-w-4xl">
      <Helmet>
        <title>AssetVerse | Upgrade Package</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-primary text-center mb-8">
        Upgrade Your Plan
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Package Selection */}
        <div className="flex-1 space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelected(pkg)}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                selected.id === pkg.id
                  ? "border-primary bg-primary/10"
                  : "border-gray-200"
              }`}
            >
              <h3 className="font-bold text-xl">{pkg.name}</h3>
              <p className="text-2xl font-bold mt-2">${pkg.price}</p>
            </div>
          ))}
        </div>

        {/* Right: Payment Form */}
        <div className="flex-1 bg-base-200 p-8 rounded-xl shadow-lg h-fit">
          <h3 className="text-xl font-bold mb-4">Payment Details</h3>
          <p className="mb-6">
            You are upgrading to{" "}
            <span className="font-bold">{selected.name}</span>
          </p>

          <Elements stripe={stripePromise}>
            <CheckoutForm selectedPackage={selected} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
