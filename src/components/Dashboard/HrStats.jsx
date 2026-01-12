import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import {
  IoStatsChart,
  IoPieChart,
  IoAlertCircleOutline,
} from "react-icons/io5";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Theme-based colors (Blue & Violet)
const COLORS = ["#2563EB", "#7C3AED", "#DB2777", "#F59E0B"];

const HrStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = { pieChartData: [], topRequests: [] }, isLoading } =
    useQuery({
      queryKey: ["admin-stats"],
      queryFn: async () => {
        const res = await axiosSecure.get("/admin-stats");
        return res.data;
      },
    });

  if (isLoading)
    return (
      <div className="h-64 flex justify-center items-center w-full">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  // Data Validation
  const hasAssetData =
    stats.pieChartData && stats.pieChartData.some((d) => d.value > 0);
  const hasRequestData = stats.topRequests && stats.topRequests.length > 0;

  // Custom Label for Pie Chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (percent === 0) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"
    >
      {/* 1. Pie Chart: Returnable vs Non-returnable */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-6 border-b border-base-200 pb-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
            <IoPieChart className="text-xl" />
          </div>
          <h3 className="text-lg font-bold text-base-content">
            Asset Type Distribution
          </h3>
        </div>

        <div className="flex-1 min-h-[300px] flex items-center justify-center">
          {hasAssetData ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "none",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-base-content/50 flex flex-col items-center gap-2">
              <IoAlertCircleOutline className="text-4xl" />
              <p>No Assets Added Yet.</p>
              <p className="text-xs">
                Add returnable/non-returnable assets to see insights.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Bar Chart: Top Requested Items */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-6 border-b border-base-200 pb-3">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-violet-600">
            <IoStatsChart className="text-xl" />
          </div>
          <h3 className="text-lg font-bold text-base-content">
            Top 5 Requested Items
          </h3>
        </div>

        <div className="flex-1 min-h-[300px] flex items-center justify-center">
          {hasRequestData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={stats.topRequests}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.2}
                  vertical={false}
                />
                <XAxis
                  dataKey="_id"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  allowDecimals={false}
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "none",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#7C3AED"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                  name="Requests"
                  animationDuration={1500}
                >
                  {stats.topRequests.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#2563EB" : "#7C3AED"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-base-content/50 flex flex-col items-center gap-2">
              <IoAlertCircleOutline className="text-4xl" />
              <p>No Requests Found.</p>
              <p className="text-xs">Wait for employees to request items.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HrStats;
