import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaUserAstronaut,
  FaCalendarAlt,
  FaCrown,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import useAuth from "../../../hooks/useAuth";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch Team Members
  const { data: team = [], isLoading } = useQuery({
    queryKey: ["my-team", user?.email],
    queryFn: async () => {
      // Backend Route: /my-team/:email
      // Note: Backend might need to find the HR email associated with this employee first
      const res = await axiosSecure.get(`/my-team/${user.email}`);
      return res.data;
    },
  });

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemAnim = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4 w-full">
            <div className="skeleton h-48 w-full rounded-2xl"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 pt-8 pb-16 px-4 md:px-8">
      <Helmet>
        <title>AssetVerse | My Team</title>
      </Helmet>

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full mb-4">
            <FaUserAstronaut className="text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Meet Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Squad
            </span>
          </h2>
          <p className="text-base-content/60">
            Collaborate and connect with your colleagues. Together we achieve
            more.
          </p>
        </motion.div>
      </div>

      {/* Team Grid */}
      {team.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 container mx-auto"
        >
          {team.map((member) => {
            // Check if this member is the current logged-in user
            const isMe = member.employeeEmail === user.email;

            // Generate Avatar if missing (Reliable Fallback)
            const avatarUrl = member.image
              ? member.image
              : `https://ui-avatars.com/api/?name=${
                  member.employeeName || member.name
                }&background=random&color=fff&size=128`;

            return (
              <motion.div
                key={member._id}
                variants={itemAnim}
                className={`relative group bg-base-100 rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                    ${
                      isMe
                        ? "border-primary shadow-lg ring-1 ring-primary"
                        : "border-base-200 hover:border-primary/50"
                    }
                `}
              >
                {/* "Me" Badge */}
                {isMe && (
                  <div className="absolute top-4 right-4 badge badge-primary badge-sm uppercase font-bold tracking-wider">
                    You
                  </div>
                )}

                {/* Role Badge (Assuming 'role' field exists, else default to Employee) */}
                <div
                  className={`absolute top-4 left-4 badge ${
                    member.role === "admin" ? "badge-warning" : "badge-ghost"
                  } gap-1`}
                >
                  {member.role === "admin" ? (
                    <FaCrown className="text-xs" />
                  ) : (
                    <FaUserTie className="text-xs" />
                  )}
                  {member.role === "admin" ? "Admin" : "Teammate"}
                </div>

                {/* Profile Image */}
                <div className="flex justify-center mb-6 mt-4">
                  <div className="avatar">
                    <div
                      className={`w-24 h-24 rounded-full ring ring-offset-base-100 ring-offset-2 ${
                        isMe ? "ring-primary" : "ring-base-300"
                      }`}
                    >
                      <img
                        src={avatarUrl}
                        alt={member.employeeName}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-base-content mb-1">
                    {member.employeeName || member.name}
                  </h3>
                  <p className="text-sm text-base-content/60 mb-4 font-medium">
                    {/* Fallback email display if no designation field */}
                    {member.employeeEmail}
                  </p>

                  <div className="divider my-2"></div>

                  <div className="flex items-center justify-center gap-2 text-xs text-base-content/50">
                    <FaCalendarAlt />
                    <span>Joined Team:</span>
                    {/* Assuming there's a date field, if not fallback to 'Recently' */}
                    <span className="font-semibold text-base-content/80">
                      {member.affiliationDate
                        ? new Date(member.affiliationDate).toLocaleDateString()
                        : "Recently"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/team-management-4548676-3774026.png"
            alt="No Team"
            className="w-64 opacity-50 mb-6 grayscale"
          />
          <h3 className="text-2xl font-bold text-base-content/50">
            No Team Members Found
          </h3>
          <p className="text-base-content/40 mt-2">
            Looks like you are the first one here or not affiliated with a
            company yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyTeam;