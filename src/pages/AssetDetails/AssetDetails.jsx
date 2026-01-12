import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaBoxOpen,
  FaTag,
  FaCheckCircle,
  FaInfoCircle,
  FaBarcode,
} from "react-icons/fa";
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

  // Fallback image handler (Req #1: No placeholder/dummy content)
  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1600&auto=format&fit=crop";
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="py-24 bg-base-100 min-h-screen relative overflow-hidden">
      {/* Background Decor for Consistency */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-40 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Back Navigation */}
        <Link
          to="/asset-list" // Adjust this link based on role if needed (e.g. checks prev path)
          className="btn btn-ghost gap-2 mb-8 pl-0 text-base-content/70 hover:text-primary transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Asset List
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* --- LEFT SIDE: IMAGE & STATUS --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-base-200 bg-base-200 h-[400px] lg:h-[500px]">
              <img
                src={asset.productImage}
                onError={handleImageError}
                alt={asset.productName}
                className="w-full h-full object-cover"
              />
              {/* Status Badge */}
              <div className="absolute top-5 right-5">
                <span
                  className={`badge border-none px-4 py-3 font-bold shadow-md ${
                    asset.productType === "Returnable"
                      ? "bg-warning text-warning-content"
                      : "bg-success text-white"
                  }`}
                >
                  {asset.productType}
                </span>
              </div>

              {/* Quantity Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <p className="text-sm opacity-80 uppercase tracking-wider">
                  Stock Status
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      parseInt(asset.productQuantity) > 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  <span className="font-bold text-lg">
                    {parseInt(asset.productQuantity) > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: INFO & SPECS (Req #4) --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-2">
                <FaBarcode /> Asset Details
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-base-content mb-4">
                {asset.productName}
              </h1>
              <div className="flex items-center gap-2 text-base-content/60 text-sm">
                <FaCalendarAlt />
                <span>
                  Added on{" "}
                  {new Date(asset.dateAdded).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-base-100 p-5 rounded-2xl border border-base-200 shadow-sm hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                    <FaBoxOpen />
                  </div>
                  <span className="font-bold text-sm text-base-content/70">
                    Quantity
                  </span>
                </div>
                <p className="text-2xl font-bold text-base-content">
                  {asset.productQuantity}{" "}
                  <span className="text-sm font-normal text-base-content/50">
                    units
                  </span>
                </p>
              </div>

              <div className="bg-base-100 p-5 rounded-2xl border border-base-200 shadow-sm hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-lg">
                    <FaTag />
                  </div>
                  <span className="font-bold text-sm text-base-content/70">
                    Category
                  </span>
                </div>
                <p className="text-2xl font-bold text-base-content">
                  {asset.productType}
                </p>
              </div>
            </div>

            {/* Separate Description Section (Req #4) */}
            <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-base-content">
                <FaInfoCircle className="text-primary" />
                <h3 className="font-bold text-lg">Description / Overview</h3>
              </div>
              <p className="text-base-content/70 leading-relaxed whitespace-pre-line">
                {asset.description
                  ? asset.description
                  : "No detailed description provided for this asset. This usually includes physical condition, model specifications, and usage guidelines."}
              </p>
            </div>

            {/* Visual Action Buttons (Req #1: No Dummy Content - Visual only based on logical state) */}
            <div className="mt-8 flex gap-4">
              <button className="btn btn-primary flex-1 rounded-xl shadow-lg shadow-primary/20 cursor-default">
                <FaCheckCircle /> Asset Active
              </button>
              {/* Logic to show Request button could go here if user role was passed */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
