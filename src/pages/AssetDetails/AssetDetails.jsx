import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendarAlt, FaBoxOpen, FaTag } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AssetDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: asset = {}, isLoading } = useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="pt-24 pb-16 bg-base-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <Link
          to="/asset-list"
          className="btn btn-ghost gap-2 mb-6 text-base-content/70 hover:text-primary"
        >
          <FaArrowLeft /> Back to List
        </Link>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card lg:card-side bg-base-100 shadow-2xl border border-base-200 overflow-hidden"
        >
          {/* Left Side: Image */}
          <figure className="lg:w-1/2 relative bg-base-200">
            <img
              src={asset.productImage || "https://via.placeholder.com/400"}
              alt={asset.productName}
              className="w-full h-full object-cover min-h-[400px]"
            />
            {/* Type Badge */}
            <div
              className={`absolute top-4 left-4 badge border-none text-white p-3 font-semibold ${
                asset.productType === "Returnable"
                  ? "badge-warning"
                  : "badge-success"
              }`}
            >
              {asset.productType}
            </div>
          </figure>

          {/* Right Side: Details */}
          <div className="card-body lg:w-1/2 p-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="card-title text-4xl font-bold mb-2">
                {asset.productName}
              </h2>
              <p className="text-sm text-base-content/50 uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
                <FaCalendarAlt /> Added on:{" "}
                {new Date(asset.dateAdded).toLocaleDateString()}
              </p>

              <div className="divider"></div>

              {/* Info Grid */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                    <FaBoxOpen className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60 font-bold uppercase">
                      Quantity
                    </p>
                    <p className="text-xl font-bold">
                      {asset.productQuantity} pcs
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-lg">
                    <FaTag className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60 font-bold uppercase">
                      Product Type
                    </p>
                    <p className="text-xl font-bold">{asset.productType}</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Description Section */}
              <div className="bg-base-200 p-6 rounded-xl">
                <h3 className="font-bold mb-2 text-base-content/80">
                  Description:
                </h3>
                {/* whitespace-pre-line ক্লাসটি লাইন ব্রেক সাপোর্ট করবে */}
                <p className="text-base-content/70 leading-relaxed whitespace-pre-line">
                  {asset.description
                    ? asset.description
                    : "No detailed description provided for this asset."}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AssetDetails;
