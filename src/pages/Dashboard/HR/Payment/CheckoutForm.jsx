import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ selectedPackage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Create Payment Intent on mount (or when package changes)
  useEffect(() => {
    if (selectedPackage.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: selectedPackage.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, selectedPackage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    // 2. Process Payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

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
      console.log(confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // 3. Save Payment to Backend & Upgrade Limit
        const paymentInfo = {
          hrEmail: user.email,
          packageName: selectedPackage.name,
          newPackageLimit: selectedPackage.limit, // e.g., 10 or 20
          amount: selectedPackage.price,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        const res = await axiosSecure.post("/payments", paymentInfo);
        if (res.data?.paymentResult?.insertedId) {
          toast.success("Payment Successful! Package Upgraded.");
          navigate("/asset-list");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-4 rounded-md mb-4 bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {transactionId && (
        <p className="text-green-600 text-sm">
          Transaction ID: {transactionId}
        </p>
      )}

      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay ${selectedPackage.price}
      </button>
    </form>
  );
};

export default CheckoutForm;
