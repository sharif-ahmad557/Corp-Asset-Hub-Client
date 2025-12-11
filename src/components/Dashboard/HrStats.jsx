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

const COLORS = ["#0088FE", "#FFBB28"]; // Blue for Returnable, Yellow for Non-returnable

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
        Loading Charts...
      </div>
    );

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
      <div className="bg-base-100 p-6 rounded-xl shadow-lg border">
        <h3 className="text-xl font-bold text-center mb-4 text-primary">
          Asset Type Distribution
        </h3>
        <div className="h-[300px]">
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
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Bar Chart: Top Requested Items */}
      <div className="bg-base-100 p-6 rounded-xl shadow-lg border">
        <h3 className="text-xl font-bold text-center mb-4 text-secondary">
          Top 5 Requested Items
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.topRequests}>
              <XAxis
                dataKey="_id"
                stroke="#8884d8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar
                dataKey="count"
                fill="#82ca9d"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HrStats;
