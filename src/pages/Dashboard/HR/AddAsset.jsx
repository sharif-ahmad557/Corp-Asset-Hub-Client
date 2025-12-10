import React from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AddAsset = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const assetInfo = {
      productName: data.productName,
      productType: data.productType,
      productQuantity: parseInt(data.productQuantity),
      dateAdded: new Date(),
      hrEmail: user?.email, // HR Email tracking
      // Note: In real world, upload image to ImgBB and get URL.
      // Here using the direct URL input.
      productImage: data.productImage,
    };

    try {
      const res = await axiosSecure.post("/assets", assetInfo);
      if (res.data.insertedId) {
        toast.success("Asset Added to Inventory");
        reset();
      }
    } catch (error) {
      toast.error("Failed to add asset");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 bg-base-100 shadow-xl p-8 rounded-xl border border-primary/20">
      <Helmet>
        <title>AssetVerse | Add Asset</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Add New Asset
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div className="form-control">
          <label className="label font-bold">Product Name</label>
          <input
            {...register("productName", { required: true })}
            type="text"
            placeholder="e.g. Macbook Pro M3"
            className="input input-bordered w-full"
          />
        </div>

        {/* Product Type & Quantity Row */}
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
              {...register("productQuantity", { required: true, min: 1 })}
              type="number"
              placeholder="0"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Product Image URL */}
        <div className="form-control">
          <label className="label font-bold">Product Image URL</label>
          <input
            {...register("productImage", { required: true })}
            type="url"
            placeholder="https://..."
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full mt-4">Add Asset</button>
      </form>
    </div>
  );
};

export default AddAsset;
