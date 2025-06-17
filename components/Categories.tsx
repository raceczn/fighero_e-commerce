import Image from "next/image";
import Link from "next/link";

import hironoImg from "@/public/images/hirono-collection.jpg";
import marvelImg from "@/public/images/marvel-collection.png";
import animeImg from "@/public/images/anime-collection.jpg";

import Overlay from "./Overlay";

const Categories = () => {
  return (
    <div className="space-y-12">
      {/*Top Text Section */}
      <div className="pt-10 flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <p className="text-nowrap text-4xl font-semibold md:text-6xl">
            Epic Battles / <br /> Legendary <span className="text-[#003092]">Heroes.</span>
          </p>
        </div>
        <div className="flex flex-1 items-center">
          <div>
            <span className="font-bold">Fighero</span> is a collectible action
            figure line made for fans, dreamers, and defenders of imagination.
          </div>
        </div>
      </div>

      {/*Categories Grid */}
      <div className="grid auto-rows-[300px] grid-cols-2 gap-4 md:auto-rows-[330px] md:grid-cols-4">
        <Link
          href={{
            pathname: "/shop",
            query: { category: "hirono" },
          }}
          className="group relative col-span-2 row-span-1 overflow-hidden md:row-span-2"
        >
          <Image
            src={hironoImg}
            alt="Collection of shirts"
            className="h-full w-full object-cover"
            placeholder="blur"
          />
          <Overlay category="Hirono Collections" />
        </Link>

        <Link
          href={{
            pathname: "/shop",
            query: { category: "marvel" },
          }}
          className="group relative col-span-2 overflow-hidden"
        >
          <Image
            src={marvelImg}
            alt="Collection of pants"
            className="h-full w-full object-cover"
            placeholder="blur"
          />
          <Overlay category="Marvel Collections" />
        </Link>

        <Link
          href={{
            pathname: "/shop",
            query: { category: "anime" },
          }}
          className="group relative col-span-2 overflow-hidden"
        >
          <Image
            src={animeImg}
            alt="Collection of handbags"
            className="h-full w-full object-cover"
            placeholder="blur"
          />
          <Overlay category="Anime Collections" />
        </Link>
      </div>
    </div>
  );
};

export default Categories;
