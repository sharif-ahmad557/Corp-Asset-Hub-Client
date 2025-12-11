import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrash, FaUserTie } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch My Employees
  const {
    data: employees = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-employees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-employees/${user.email}`);
      return res.data;
    },
  });

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this employee from your team?")) return;
    try {
      const res = await axiosSecure.delete(`/remove-employee/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Employee Removed");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="container mx-auto my-8 p-4">
      <Helmet>
        <title>AssetVerse | My Team</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-primary mb-6">
        My Team Members{" "}
        <span className="badge badge-secondary">{employees.length}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="card bg-base-100 shadow-xl border-l-4 border-primary"
          >
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-12">
                    {emp.employeeName ? (
                      <img
                        src={
                          emp.employeeImage ||
                          "https://i.ibb.co/T0x6c6z/profile.png"
                        }
                      />
                    ) : (
                      <span className="text-xl">EM</span>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="card-title">{emp.employeeName}</h2>
                  <div className="badge badge-outline">Member</div>
                </div>
              </div>

              <p className="text-gray-600 flex items-center gap-2">
                <FaUserTie /> {emp.employeeEmail}
              </p>
              <p className="text-sm text-gray-400">
                Joined: {new Date(emp.affiliationDate).toLocaleDateString()}
              </p>

              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleRemove(emp._id)}
                  className="btn btn-error btn-sm text-white"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {employees.length === 0 && (
        <div className="text-center p-10 text-gray-500">
          No employees affiliated yet. Approve requests to add them.
        </div>
      )}
    </div>
  );
};

export default MyEmployeeList;
