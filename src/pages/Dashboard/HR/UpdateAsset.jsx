import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateAsset = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

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
        // ডেসক্রিপশন ফিল্ড প্রি-ফিল করা হচ্ছে
        description: asset.description || "",
      });
    }
  }, [asset, reset]);

  const onSubmit = async (data) => {
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
    }
  };

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto my-10 bg-base-100 shadow-xl p-8 rounded-xl border border-primary/20">
      <Helmet>
        <title>AssetVerse | Update Asset</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Update Asset
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div className="form-control">
          <label className="label font-bold">Product Name</label>
          <input
            {...register("productName", { required: true })}
            type="text"
            className="input input-bordered w-full"
          />
        </div>

        {/* Type & Qty */}
        <div className="flex gap-4">
          <div className="form-control w-1/2">
            <label className="label font-bold">Product Type</label>
            <select
              {...register("productType")}
              className="select select-bordered w-full"
            >
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>
          <div className="form-control w-1/2">
            <label className="label font-bold">Quantity</label>
            <input
              {...register("productQuantity", { required: true })}
              type="number"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="form-control">
          <label className="label font-bold">Product Image URL</label>
          <input
            {...register("productImage", { required: true })}
            type="url"
            className="input input-bordered w-full"
          />
        </div>

        {/* --- NEW: Description Update Field --- */}
        <div className="form-control">
          <label className="label font-bold">Description</label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered h-24 leading-relaxed"
            placeholder="Update description here..."
          ></textarea>
        </div>

        <button className="btn btn-primary w-full mt-4 text-white">
          Update Asset Info
        </button>
      </form>
    </div>
  );
};

export default UpdateAsset;
