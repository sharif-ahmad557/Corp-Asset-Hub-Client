import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLock, FaCreditCard } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const CheckoutForm = ({ selectedPackage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false); // Loading state
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Create Payment Intent
  useEffect(() => {
    if (selectedPackage?.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: selectedPackage.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Payment intent error:", err);
          setError("Failed to initialize payment. Please try again.");
        });
    }
  }, [axiosSecure, selectedPackage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true); // Start loading
    setError(""); // Clear previous errors

    // 2. Create Payment Method
    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    // 3. Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // 4. Save Payment to Backend
        const paymentInfo = {
          hrEmail: user.email,
          packageName: selectedPackage.name,
          newPackageLimit: selectedPackage.limit, // Ensure this exists in prop
          amount: selectedPackage.price,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: "paid",
        };

        try {
          const res = await axiosSecure.post("/payments", paymentInfo);
          if (res.data?.paymentResult?.insertedId) {
            toast.success("Payment Successful! Package Upgraded.");
            navigate("/asset-list"); // Redirect to asset list or dashboard
          }
        } catch (err) {
          toast.error(
            "Payment succeeded but failed to update subscription. Contact support."
          );
        } finally {
          setProcessing(false);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Summary */}
      <div className="bg-base-200 p-4 rounded-xl border border-base-300">
        <h3 className="text-sm font-bold text-base-content/70 uppercase tracking-wide mb-2">
          Payment Summary
        </h3>
        <div className="flex justify-between items-center text-base-content">
          <span className="font-semibold">{selectedPackage.name} Package</span>
          <span className="text-xl font-bold text-primary">
            ${selectedPackage.price}
          </span>
        </div>
      </div>

      {/* Card Input Section */}
      <div>
        <label className="label">
          <span className="label-text font-semibold flex items-center gap-2">
            <FaCreditCard /> Card Details
          </span>
        </label>
        <div className="border border-base-300 p-4 rounded-xl bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  fontFamily: "'Inter', sans-serif",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#ef4444", // Tailwind red-500
                },
              },
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error text-sm py-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {transactionId && (
        <div className="alert alert-success text-sm py-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Transaction ID: <span className="font-mono">{transactionId}</span>
          </span>
        </div>
      )}

      {/* Pay Button */}
      <button
        className="btn btn-primary w-full text-lg shadow-lg shadow-primary/20"
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        {processing ? (
          <div className="flex items-center gap-2">
            <ImSpinner9 className="animate-spin text-xl" /> Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <FaLock /> Pay ${selectedPackage.price}
          </div>
        )}
      </button>

      <p className="text-center text-xs text-base-content/50 mt-4 flex items-center justify-center gap-1">
        <FaLock className="text-[10px]" /> Payments are secure and encrypted.
      </p>
    </form>
  );
};

export default CheckoutForm;
