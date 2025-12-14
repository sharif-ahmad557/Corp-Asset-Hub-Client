import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-primary mb-4">Payment History</h2>
      <div className="overflow-x-auto shadow-md rounded-lg border">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Package</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="hover">
                <th>{index + 1}</th>
                <td className="font-bold">{payment.packageName}</td>
                <td>${payment.amount}</td>
                <td className="font-mono text-xs">{payment.transactionId}</td>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <p className="text-center p-4 text-gray-500">
            No payment history found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
