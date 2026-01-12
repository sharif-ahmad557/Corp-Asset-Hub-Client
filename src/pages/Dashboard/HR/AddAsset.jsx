import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import {
  FaBox,
  FaTag,
  FaImage,
  FaHashtag,
  FaAlignLeft,
  FaPlusCircle,
} from "react-icons/fa";
import { IoCubeOutline } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AddAsset = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const assetInfo = {
      productName: data.productName,
      productType: data.productType,
      productQuantity: parseInt(data.productQuantity),
      description: data.description,
      dateAdded: new Date(),
      hrEmail: user?.email,
      productImage: data.productImage,
    };

    try {
      const res = await axiosSecure.post("/assets", assetInfo);
      if (res.data.insertedId) {
        toast.success("Asset Added Successfully!");
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Helmet>
        <title>AssetMinder | Add Asset</title>
      </Helmet>

      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-base-content">Add New Asset</h2>
        <p className="text-base-content/60 mt-1">
          Expand your inventory by adding new items.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-base-100 shadow-xl p-8 rounded-2xl border border-base-200">
        {/* Decorative Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
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

          {/* Product Type & Quantity Row */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaTag className="text-secondary" /> Product Type
                </span>
              </label>
              <select
                {...register("productType", {
                  required: "Please select a type",
                })}
                className="select select-bordered w-full focus:select-primary"
                defaultValue="Returnable"
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
                  min: { value: 1, message: "Quantity must be at least 1" },
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

          {/* Product Image URL */}
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
              placeholder="https://example.com/image.png"
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

          {/* Description Input */}
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
              className={`textarea textarea-bordered h-24 focus:textarea-primary resize-none ${
                errors.description ? "textarea-error" : ""
              }`}
              placeholder="Provide a short description of the asset..."
            ></textarea>
            {errors.description && (
              <span className="text-error text-xs mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="form-control mt-4">
            <button
              disabled={loading}
              className="btn btn-primary w-full text-lg shadow-lg shadow-primary/20"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <FaPlusCircle /> Add Asset
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
