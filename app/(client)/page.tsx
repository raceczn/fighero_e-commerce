import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import Features from "@/components/features";
import { getCategories } from "@/sanity/queries";
import Categories from '@/components/Categories';


import React from "react";

const Home = async () => {
  const categories = await getCategories(6);

  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <ProductGrid />
      <Categories/>
      <Features />
      <HomeCategories categories={categories} />
      <ShopByBrands />
    </Container>
  );
};

export default Home;
