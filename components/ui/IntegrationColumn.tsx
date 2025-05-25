"use client";

import { Fragment } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import type { IntegrationItem } from "@/components/Integrations";

const IntegrationColumn = ({
  integrations,
  className,
  reverse,
}: {
  integrations: IntegrationItem[];
  className?: string;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ y: reverse ? "-50%" : 0 }}
      animate={{ y: reverse ? 0 : "-50%" }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={twMerge("flex flex-col gap-4 pb-4", className)}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <Fragment key={i}>
          {integrations.map((integration, index) => (
            <div
              key={`${integration.name}-${index}`}
              className="bg-white border border-neutral-200 rounded-2xl shadow-md inline-flex items-center justify-center overflow-hidden"
              style={{ width: "auto", height: "auto" }} // optional if image controls size
            >
              {integration.images?.length > 0 ? (
                <img
                  src={urlFor(integration.images[0]).url()}
                  alt={`${integration.name}-image`}
                  className="w-full h-full object-contain rounded-2xl"
                />
              ) : (
                <div className="px-10 py-8 bg-neutral-100 text-neutral-400 text-sm rounded-xl">
                  No Image
                </div>
              )}
            </div>
          ))}
        </Fragment>
      ))}
    </motion.div>
  );
};

export default IntegrationColumn;
