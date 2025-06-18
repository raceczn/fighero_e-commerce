"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { client } from "../lib/client"; // Sanity client

// Helper to convert ISO date to month abbreviation
const getMonthAbbreviation = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "short" }); // e.g. "Jan"
};

export default function OrdersChart() {
  const [data, setData] = useState<{ name: string; orders: number }[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await client.fetch(
          `*[_type == "order" && defined(orderDate) && !(_id in path("drafts.**"))]{
            orderDate
          }`
        );

        // Group by month
        const monthCounts: Record<string, number> = {};
        orders.forEach((order: { orderDate: string }) => {
          const month = getMonthAbbreviation(order.orderDate);
          monthCounts[month] = (monthCounts[month] || 0) + 1;
        });

        // Convert to chart format and sort in calendar order
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const chartData = monthOrder.map((month) => ({
          name: month,
          orders: monthCounts[month] || 0,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Failed to fetch order chart data:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#FBFFFF" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="orders"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
