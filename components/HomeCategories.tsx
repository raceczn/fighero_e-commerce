import React from "react";
import Title from "./Title";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const bgColors = [
  "#FEF9C3", "#FFE4E6", "#DCFCE7",
  "#CCFBF1", "#FDE68A", "#E0F2FE", "#F3E8FF"
];

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">Popular Categories</Title>

      <div className="mt-5 grid grid-cols-6 gap-5">
        {categories?.slice(0, 6).map((category, index) => (
          <Link
            href={`/category/${category?.slug?.current}`}
            key={category?._id}
            className="rounded-xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-all"
            style={{ backgroundColor: bgColors[index % bgColors.length] }}
          >
            {category?.image && (
              <div className="relative w-24 h-24 mb-3">
                <Image
                  src={urlFor(category.image).width(400).url()}
                  alt={category.title || "Category Image"}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="text-sm font-semibold text-gray-800">{category?.title}</h3>
            <p className="text-xs text-gray-600 mt-1">
              <span className="font-bold text-shop_dark_green">
                ({category?.productCount || 0})
              </span>{" "}
              items available
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
