"use client";

import { Card, Flex, Text, Spinner, Box, Stack } from "@sanity/ui";
import { useEffect, useState } from "react";
import { client } from "../lib/client";

import OrdersChart from "./OrdersChart";
import ProductsChart from "./CategoryChart";

export default function DashboardPage() {
  const [counts, setCounts] = useState<{
    products: number;
    categories: number;
    brands: number;
    orders: number;
  } | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [products, categories, brands, orders] = await Promise.all([
          client.fetch(
            'count(*[_type == "product" && !(_id in path("drafts.**"))])'
          ),
          client.fetch(
            'count(*[_type == "category" && !(_id in path("drafts.**"))])'
          ),
          client.fetch(
            'count(*[_type == "brand" && !(_id in path("drafts.**"))])'
          ),
          client.fetch(
            'count(*[_type == "order" && !(_id in path("drafts.**"))])'
          ),
        ]);

        setCounts({
          products,
          categories,
          brands,
          orders,
        });
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      }
    };

    fetchCounts();
  }, []);

  if (!counts) {
    return (
      <Flex align="center" justify="center" style={{ height: "100px" }}>
        <Spinner />
      </Flex>
    );
  }

  const cardData = [
    { label: "Total Products", value: counts.products, emoji: "📦" },
    { label: "Total Categories", value: counts.categories, emoji: "🏷️" },
    { label: "Total Brands", value: counts.brands, emoji: "🏭" },
    { label: "Total Orders", value: counts.orders, emoji: "🧾" },
  ];

  return (
    <Box padding={5}>
      {/* Cards Section */}
      <Box style={{ overflowX: "auto" }}>
        <Flex
          gap={4}
          paddingBottom={2}
          style={{ minWidth: "800px", width: "fit-content" }}
        >
          {cardData.map((item, idx) => (
            <Card
              key={idx}
              padding={5}
              shadow={2}
              radius={3}
              style={{
                width: "215px",
                flexShrink: 0,
                border: "1px solid #4A4A4A",
              }}
            >
              <Stack space={3}>
                <Text size={1} weight="semibold" muted>
                  {item.emoji} {item.label}
                </Text>
                <Text size={4} weight="bold">
                  {item.value}
                </Text>
              </Stack>
            </Card>
          ))}
        </Flex>
      </Box>

      {/* Charts Section */}
      <Box marginTop={6}>
        <Text size={3} weight="bold" style={{ marginBottom: "16px" }}>
          Analytics Overview
        </Text>
        <Flex wrap="wrap" gap={4}>
          <Card
            padding={4}
            shadow={1}
            radius={2}
            style={{
              flex: "1 1 500px",
              border: "1px solid #4A4A4A", 
            }}
          >
            <Text size={2} weight="semibold" style={{ marginBottom: "8px" }}>
              Products Chart
            </Text>
            <ProductsChart />
          </Card>
          <Card
            padding={4}
            shadow={1}
            radius={2}
            style={{
              flex: "1 1 500px",
              border: "1px solid #4A4A4A",
            }}
          >
            <Text size={2} weight="semibold" style={{ marginBottom: "8px" }}>
              Orders Chart
            </Text>
            <OrdersChart />
          </Card>
        </Flex>
      </Box>
    </Box>
  );
}
