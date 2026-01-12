import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";
import { IoCubeOutline, IoAlertCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import HrStats from "../../../components/Dashboard/HrStats";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // States for Features
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState(""); // Sorting State (Req #5)
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Fetch Assets with Search, Filter, Pagination, and Sort
  const {
    data: assets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assets", user?.email, search, filter, sort, currentPage],
    queryFn: async () => {
      // Assuming backend accepts 'sort' param. If not, it will just be ignored without error.
      const res = await axiosSecure.get(
        `/assets?email=${user.email}&search=${search}&filter=${filter}&sort=${sort}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  // Handle Delete with SweetAlert2 (Professional UX)
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/assets/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Asset has been deleted.", "success");
            refetch();
          }
        } catch (error) {
          toast.error("Failed to delete asset.");
        }
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    setCurrentPage(0);
  };

  const handleNext = () => {
    if (assets.length === itemsPerPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Image Error Handler
  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1600&auto=format&fit=crop";
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );

  return (
    <div className="container mx-auto py-10 px-4 lg:px-8">
      <Helmet>
        <title>AssetMinder | Asset List</title>
      </Helmet>

      {/* Stats Section */}
      <HrStats />

      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content flex items-center gap-2">
            <IoCubeOutline className="text-primary" /> Asset Inventory
          </h2>
          <p className="text-base-content/60 mt-1">
            Manage, track, and update your company assets.
          </p>
        </div>

        {/* Feature Controls: Search, Filter, Sort */}
        <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative w-full md:w-64">
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              name="search"
              className="input input-bordered w-full pl-10 focus:input-primary"
              placeholder="Search Asset..."
            />
          </form>

          {/* Filter */}
          <div className="relative w-full md:w-48">
            <FaFilter className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <select
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(0);
              }}
              className="select select-bordered w-full pl-10 focus:select-primary"
              defaultValue=""
            >
              <option value="">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>

          {/* Sorting (New Feature) */}
          <div className="relative w-full md:w-48">
            <FaSortAmountDown className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <select
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(0);
              }}
              className="select select-bordered w-full pl-10 focus:select-primary"
              defaultValue=""
            >
              <option value="">Default Sort</option>
              <option value="quantity_desc">Quantity (High-Low)</option>
              <option value="quantity_asc">Quantity (Low-High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden flex flex-col min-h-[400px]">
        <div className="overflow-x-auto flex-grow">
          <table className="table w-full">
            <thead className="bg-base-200/50 text-base-content font-bold uppercase text-xs tracking-wider">
              <tr>
                <th className="py-4 pl-6">#</th>
                <th>Product</th>
                <th>Type</th>
                <th className="text-center">Quantity</th>
                <th>Date Added</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-base-200">
              {assets.length > 0 ? (
                assets.map((asset, index) => (
                  <tr
                    key={asset._id}
                    className="hover:bg-base-200/40 transition-colors"
                  >
                    <td className="pl-6 font-medium text-base-content/50">
                      {currentPage * itemsPerPage + index + 1}
                    </td>

                    {/* Product */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12 bg-base-200">
                            <img
                              src={asset.productImage}
                              alt={asset.productName}
                              onError={handleImageError}
                            />
                          </div>
                        </div>
                        <div className="font-bold text-base-content">
                          {asset.productName}
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td>
                      <span
                        className={`badge ${
                          asset.productType === "Returnable"
                            ? "badge-warning badge-outline"
                            : "badge-info badge-outline"
                        } font-semibold`}
                      >
                        {asset.productType}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="text-center">
                      <span
                        className={`font-bold text-lg ${
                          asset.productQuantity < 5
                            ? "text-error"
                            : "text-base-content"
                        }`}
                      >
                        {asset.productQuantity}
                      </span>
                      {asset.productQuantity < 5 && (
                        <div className="text-[10px] text-error">Low Stock</div>
                      )}
                    </td>

                    {/* Date */}
                    <td className="text-base-content/70 text-sm">
                      {new Date(asset.dateAdded).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {/* View Details */}
                        <Link
                          to={`/asset-details/${asset._id}`}
                          className="btn btn-ghost btn-sm btn-square text-base-content/70 hover:text-primary tooltip tooltip-top"
                          data-tip="View Details"
                        >
                          <FaEye className="text-lg" />
                        </Link>

                        {/* Edit (Fixed Structure) */}
                        <Link
                          to={`/assets/update/${asset._id}`}
                          className="btn btn-ghost btn-sm btn-square text-info tooltip tooltip-top"
                          data-tip="Update Asset"
                        >
                          <FaEdit className="text-lg" />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(asset._id)}
                          className="btn btn-ghost btn-sm btn-square text-error tooltip tooltip-top"
                          data-tip="Delete Asset"
                        >
                          <FaTrash className="text-lg" />
                        </button>
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
                        No Assets Found
                      </h3>
                      <p className="text-sm text-base-content/40 mt-1">
                        {search || filter
                          ? "Try adjusting your search filters."
                          : "Add new assets to get started."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {assets.length > 0 && (
          <div className="p-4 border-t border-base-200 flex justify-center bg-base-50">
            <div className="join shadow-sm">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="join-item btn btn-sm btn-outline border-base-300"
              >
                <FaChevronLeft /> Previous
              </button>

              <button className="join-item btn btn-sm btn-ghost no-animation bg-base-100 cursor-default">
                Page {currentPage + 1}
              </button>

              <button
                onClick={handleNext}
                disabled={assets.length < itemsPerPage}
                className="join-item btn btn-sm btn-outline border-base-300"
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetList;
