"use client";
import { productType } from "@/constants/data";
import Link from "next/link";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex justify-between items-center w-full">
      {/* Tabs container with horizontal scroll */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex items-center gap-2 md:gap-3 w-max">
          {productType?.map((item) => (
            <button
              key={item?.title}
              onClick={() => onTabSelect(item?.title)}
              className={`whitespace-nowrap border border-[#131D4F]/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full transition-colors duration-200 hover:bg-[#254D70] hover:border-[#131D4F] hover:text-white ${
                selectedTab === item?.title
                  ? "bg-[#254D70] text-white border-shop_light_green"
                  : "bg-shop_light_green/10"
              }`}
            >
              {item?.title}
            </button>
          ))}
        </div>
      </div>

      {/* Fixed "See all" button on the right */}
      <Link
        href={"/shop"}
        className="ml-3 shrink-0 border border-darkColor px-4 py-1 rounded-full hover:bg-shop_light_green hover:text-white hover:border-shop_light_green whitespace-nowrap"
      >
        See all
      </Link>
    </div>
  );
};

export default HomeTabbar;
