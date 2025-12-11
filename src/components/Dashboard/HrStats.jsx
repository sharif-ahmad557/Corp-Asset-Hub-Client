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
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const COLORS = ["#0088FE", "#FFBB28"];

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
      <div className="h-40 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  // ডাটা চেক করা হচ্ছে (যদি সব ভ্যালু ০ হয় বা অ্যারে ফাঁকা থাকে)
  const hasAssetData = stats.pieChartData.some((d) => d.value > 0);
  const hasRequestData = stats.topRequests.length > 0;

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
    if (percent === 0) return null; // ০% হলে লেবেল দেখাবে না
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
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      {/* 1. Pie Chart: Returnable vs Non-returnable */}
      <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-200">
        <h3 className="text-xl font-bold text-center mb-4 text-primary">
          Asset Type Distribution
        </h3>
        <div className="h-[300px] flex items-center justify-center">
          {hasAssetData ? (
            <ResponsiveContainer width="100%" height="100%">
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
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-400 text-center">
              <p>No Assets Added Yet.</p>
              <p className="text-xs mt-1">Add some assets to see the chart.</p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Bar Chart: Top Requested Items */}
      <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-200">
        <h3 className="text-xl font-bold text-center mb-4 text-secondary">
          Top 5 Requested Items
        </h3>
        <div className="h-[300px] flex items-center justify-center">
          {hasRequestData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.topRequests}>
                <XAxis
                  dataKey="_id"
                  stroke="#8884d8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                  dataKey="count"
                  fill="#82ca9d"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                  name="Requests"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-400 text-center">
              <p>No Requests Found.</p>
              <p className="text-xs mt-1">
                Wait for employees to request items.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HrStats;
