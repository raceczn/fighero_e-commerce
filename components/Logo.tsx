import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link href={"/"} className="inline-flex">
      <h2
        className={cn(
          "text-2xl text-[#0B1D51] font-black tracking-wider uppercase hover:text-[#00809D] hoverEffect group font-sans",
          className
        )}
      >
        Fig
        <span
          className={cn(
            "text-[#00809D] group-hover:text-[#0B1D51] hoverEffect",
            spanDesign
          )}
        >
          Hero
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
