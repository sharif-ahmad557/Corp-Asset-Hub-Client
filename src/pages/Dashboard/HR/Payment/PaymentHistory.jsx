import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaHistory, FaFileInvoiceDollar } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="container mx-auto py-10 px-4 lg:px-8">
      <Helmet>
        <title>AssetMinder | Payment History</title>
      </Helmet>

      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-secondary/10 text-secondary rounded-xl shadow-sm">
          <FaHistory className="text-2xl" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-base-content">
            Payment History
          </h2>
          <p className="text-base-content/60 mt-1">
            Track all your subscription upgrades and transactions.
          </p>
        </div>
      </div>

      {/* Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-base-200/50 text-base-content font-bold uppercase text-xs tracking-wider">
              <tr>
                <th className="py-4 pl-6">#</th>
                <th>Package Name</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-base-200">
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-base-200/40 transition-colors"
                  >
                    <td className="pl-6 font-medium text-base-content/50">
                      {index + 1}
                    </td>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                          <FaFileInvoiceDollar />
                        </div>
                        <span className="font-bold text-base-content">
                          {payment.packageName}
                        </span>
                      </div>
                    </td>

                    <td className="font-bold text-base-content">
                      ${payment.amount}
                    </td>

                    <td>
                      <span className="badge badge-ghost font-mono text-xs p-3">
                        {payment.transactionId}
                      </span>
                    </td>

                    <td className="text-base-content/70 text-sm">
                      {new Date(payment.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    <td>
                      <div className="badge badge-success text-white font-bold text-xs uppercase">
                        Paid
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty State */
                <tr>
                  <td colSpan="6">
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <IoAlertCircleOutline className="text-6xl text-base-content/20 mb-4" />
                      <h3 className="text-lg font-bold text-base-content/60">
                        No Payment History
                      </h3>
                      <p className="text-sm text-base-content/40 mt-1">
                        You haven't made any transactions yet.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentHistory;
