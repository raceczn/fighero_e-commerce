"use client";

import { useEffect, useState } from "react";
import Tag from "@/components/ui/Tag";
import IntegrationColumn from "@/components/ui/IntegrationColumn";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

export type IntegrationItem = {
  name: string;
  description: string;
  images: any[]; // images from Sanity
};

export default function Integrations() {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([]);

  useEffect(() => {
    async function fetchIntegrations() {
      const data = await client.fetch(
        `*[_type == "product" && isFeatured == true]{
          name,
          images
        }`
      );
      setIntegrations(data);
    }

    fetchIntegrations();
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white text-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Content Column */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="flex justify-center lg:justify-start">
              <Tag className="bg-blue-50 text-blue-600">Shop. Collect. Conquer.</Tag>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 leading-tight tracking-tight">
              Level Up Your Collection with{" "}
              <span className="text-blue-600">Fighero</span>
            </h2>
            <p className="text-neutral-600 mt-4 text-base sm:text-lg max-w-xl">
              We help collectors find, discover, and purchase their favorite
              figures in just a few taps.
            </p>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-white font-medium shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-1"
              >
                Buy Now
              </Link>
            </div>
          </div>

          {/* Image Grid Column */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:h-[800px] h-[500px] ">
              <IntegrationColumn integrations={integrations} />
              <IntegrationColumn
                integrations={[...integrations].reverse()}
                className="hidden md:flex"
                reverse
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}