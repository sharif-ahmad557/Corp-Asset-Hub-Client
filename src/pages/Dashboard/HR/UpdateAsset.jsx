import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import {
  FaBox,
  FaTag,
  FaHashtag,
  FaImage,
  FaAlignLeft,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { IoCubeOutline } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateAsset = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 1. Fetch Existing Data
  const { data: asset = {}, isLoading } = useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets/${id}`);
      return res.data;
    },
  });

  // 2. Pre-fill form when data loads
  useEffect(() => {
    if (asset._id) {
      reset({
        productName: asset.productName,
        productType: asset.productType,
        productQuantity: asset.productQuantity,
        productImage: asset.productImage,
        description: asset.description || "",
      });
    }
  }, [asset, reset]);

  const onSubmit = async (data) => {
    setProcessing(true);
    const updatedAsset = {
      productName: data.productName,
      productType: data.productType,
      productQuantity: parseInt(data.productQuantity),
      productImage: data.productImage,
      description: data.description,
    };

    try {
      const res = await axiosSecure.patch(`/assets/${id}`, updatedAsset);

      if (res.data.modifiedCount > 0) {
        toast.success("Asset Updated Successfully");
        navigate("/asset-list");
      } else if (res.data.matchedCount > 0) {
        toast.success("Saved! (No changes were necessary)");
        navigate("/asset-list");
      } else {
        toast.error("Update failed! Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update asset");
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="container mx-auto py-10 px-4">
      <Helmet>
        <title>AssetMinder | Update Asset</title>
      </Helmet>

      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-base-content flex justify-center items-center gap-3">
          <FaEdit className="text-primary" /> Update Asset
        </h2>
        <p className="text-base-content/60 mt-1">
          Modify asset details and inventory status.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-base-100 shadow-xl p-8 rounded-2xl border border-base-200">
        {/* Decorative Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-secondary/10 rounded-full text-secondary">
            <IoCubeOutline className="text-4xl" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold flex items-center gap-2">
                <FaBox className="text-primary" /> Product Name
              </span>
            </label>
            <input
              {...register("productName", {
                required: "Product Name is required",
              })}
              type="text"
              placeholder="e.g. Macbook Pro M3"
              className={`input input-bordered w-full focus:input-primary ${
                errors.productName ? "input-error" : ""
              }`}
            />
            {errors.productName && (
              <span className="text-error text-xs mt-1">
                {errors.productName.message}
              </span>
            )}
          </div>

          {/* Type & Qty */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaTag className="text-secondary" /> Product Type
                </span>
              </label>
              <select
                {...register("productType", { required: "Type is required" })}
                className="select select-bordered w-full focus:select-primary"
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaHashtag className="text-accent" /> Quantity
                </span>
              </label>
              <input
                {...register("productQuantity", {
                  required: "Quantity is required",
                  min: { value: 0, message: "Quantity cannot be negative" },
                })}
                type="number"
                placeholder="0"
                className={`input input-bordered w-full focus:input-primary ${
                  errors.productQuantity ? "input-error" : ""
                }`}
              />
              {errors.productQuantity && (
                <span className="text-error text-xs mt-1">
                  {errors.productQuantity.message}
                </span>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold flex items-center gap-2">
                <FaImage className="text-info" /> Product Image URL
              </span>
            </label>
            <input
              {...register("productImage", {
                required: "Image URL is required",
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
                  message: "Please enter a valid image URL",
                },
              })}
              type="url"
              placeholder="https://..."
              className={`input input-bordered w-full focus:input-primary ${
                errors.productImage ? "input-error" : ""
              }`}
            />
            {errors.productImage && (
              <span className="text-error text-xs mt-1">
                {errors.productImage.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold flex items-center gap-2">
                <FaAlignLeft className="text-warning" /> Description
              </span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className={`textarea textarea-bordered h-28 leading-relaxed focus:textarea-primary resize-none ${
                errors.description ? "textarea-error" : ""
              }`}
              placeholder="Update detailed description of the asset..."
            ></textarea>
            {errors.description && (
              <span className="text-error text-xs mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              disabled={processing}
              className="btn btn-primary w-full text-lg shadow-lg shadow-primary/20"
            >
              {processing ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <>
                  <FaSave /> Update Asset Info
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAsset;
