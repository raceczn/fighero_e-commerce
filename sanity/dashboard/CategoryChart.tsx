"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useEffect, useState } from "react";
import { client } from "../lib/client";

export default function CategoryChart() {
  const [chartData, setChartData] = useState<
    { name: string; products: number }[]
  >([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "category" && !(_id in path("drafts.**"))]{
            title,
            "productsCount": count(*[_type == "product" && references(^._id)])
          }
        `);

        const formattedData = result.map((item: any) => ({
          name: item.title,
          products: item.productsCount,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch category chart data", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, bottom: 40, left: 10 }}
      >
        <CartesianGrid stroke="#FBFFFF" strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="products" fill="#8884d8">
          <LabelList dataKey="products" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
