import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaUserAstronaut,
  FaCalendarAlt,
  FaCrown,
  FaEnvelope,
} from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch Team Members
  const { data: team = [], isLoading } = useQuery({
    queryKey: ["my-team", user?.email],
    queryFn: async () => {
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

  // Skeleton Loader Component (Matches Card Design)
  const TeamSkeleton = () => (
    <div className="bg-base-100 rounded-2xl p-6 border border-base-200 h-full flex flex-col items-center gap-4">
      <div className="skeleton w-24 h-24 rounded-full shrink-0"></div>
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-3 w-1/2"></div>
      </div>
      <div className="skeleton h-8 w-full mt-auto rounded-lg"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <TeamSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4 md:px-8">
      <Helmet>
        <title>AssetMinder | My Team</title>
      </Helmet>

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-xl mb-4 shadow-sm">
            <FaUserAstronaut className="text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-base-content">
            Meet Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Squad
            </span>
          </h2>
          <p className="text-base-content/60 text-lg">
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
                className={`relative group bg-base-100 rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col
                    ${
                      isMe
                        ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
                        : "border-base-200 hover:border-primary/50"
                    }
                `}
              >
                {/* "Me" Badge */}
                {isMe && (
                  <div className="absolute top-4 right-4 badge badge-primary badge-sm uppercase font-bold tracking-wider z-10">
                    You
                  </div>
                )}

                {/* Role Badge */}
                <div
                  className={`absolute top-4 left-4 badge ${
                    member.role === "admin"
                      ? "badge-warning text-white"
                      : "badge-ghost"
                  } gap-1 z-10 font-medium`}
                >
                  {member.role === "admin" ? (
                    <FaCrown className="text-xs" />
                  ) : (
                    <FaUserTie className="text-xs" />
                  )}
                  {member.role === "admin" ? "Admin" : "Member"}
                </div>

                {/* Profile Image */}
                <div className="flex justify-center mb-4 mt-6">
                  <div className="avatar">
                    <div
                      className={`w-24 h-24 rounded-full ring ring-offset-base-100 ring-offset-2 transition-all duration-300 group-hover:scale-105 ${
                        isMe
                          ? "ring-primary"
                          : "ring-base-300 group-hover:ring-primary/50"
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
                <div className="text-center flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-base-content mb-1">
                    {member.employeeName || member.name}
                  </h3>

                  {/* Functional Mail Link */}
                  <a
                    href={`mailto:${member.employeeEmail}`}
                    className="text-sm text-base-content/60 hover:text-primary transition-colors font-medium flex items-center justify-center gap-2 mb-4"
                  >
                    {member.employeeEmail}
                  </a>

                  <div className="divider my-2"></div>

                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-center justify-center gap-2 text-xs text-base-content/50">
                      <FaCalendarAlt />
                      <span>Joined Team:</span>
                      <span className="font-semibold text-base-content/80">
                        {member.affiliationDate
                          ? new Date(
                              member.affiliationDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>

                    {!isMe && (
                      <a
                        href={`mailto:${member.employeeEmail}`}
                        className="btn btn-sm btn-outline w-full mt-3 gap-2 rounded-lg group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                      >
                        <FaEnvelope /> Contact
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        // Empty State (Icon based, no external image)
        <div className="flex flex-col items-center justify-center py-20 text-center bg-base-100 rounded-3xl border border-base-200 border-dashed">
          <div className="p-6 bg-base-200 rounded-full mb-4">
            <IoPeopleOutline className="text-6xl text-base-content/20" />
          </div>
          <h3 className="text-2xl font-bold text-base-content/60">
            No Team Members Found
          </h3>
          <p className="text-base-content/40 mt-2 max-w-md">
            It looks like you haven't been added to any team yet, or you are the
            first one here!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyTeam;
