"use client";

import Pointer from "@/components/Pointer";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mediaList = ["videos/feature-2.mp4", "videos/banner.gif"];

export default function Hero() {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const currentMedia = mediaList[currentMediaIndex];

  const [leftDesignScope] = useAnimate();
  const [leftPointerScope, leftPointerAnimate] = useAnimate();
  const [rightDesignScope] = useAnimate();
  const [rightPointerScope, rightPointerAnimate] = useAnimate();

  // Animate pointers on mount
  useEffect(() => {
    leftPointerAnimate([
      [
        leftPointerScope.current,
        { opacity: 1, x: 0, y: 0 },
        { duration: 1, ease: "easeOut" },
      ],
    ]);
    rightPointerAnimate([
      [
        rightPointerScope.current,
        { opacity: 1, x: 0, y: 0 },
        { duration: 1, ease: "easeOut" },
      ],
    ]);
  }, [leftPointerAnimate, leftPointerScope, rightPointerAnimate, rightPointerScope]);

  // Auto slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentMediaIndex]);

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
  };

  const handlePrev = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? mediaList.length - 1 : prev - 1
    );
  };

  const isVideo = currentMedia.endsWith(".mp4");

  return (
    <section className={`${inter.className} relative py-24 overflow-hidden`}>
      {/* Background media */}
      <div className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out">
        {isVideo ? (
          <video
            key={currentMedia}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={currentMedia} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            key={currentMedia}
            src={currentMedia}
            alt="Background"
            className="w-full h-full object-cover"
            fill
            unoptimized // Remove this if you want Next.js to optimize the image
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Left and Right Slide Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full hover:bg-black/70 transition"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full hover:bg-black/70 transition"
      >
        <ChevronRight size={32} />
      </button>

      {/* Foreground Content */}
      <div className="relative z-10 container">
        <motion.div
          ref={leftDesignScope}
          initial={{ opacity: 0, y: 100, x: -100 }}
          className="absolute -left-32 top-16 hidden lg:block"
          drag
        />
        <motion.div
          ref={leftPointerScope}
          initial={{ opacity: 0, y: 100, x: -200 }}
          className="absolute top-86 left-66 hidden lg:block"
        >
          <Pointer name="Anime" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100, x: 100 }}
          ref={rightDesignScope}
          className="absolute -right-64 -top-16 hidden lg:block"
          drag
        />
        <motion.div
          ref={rightPointerScope}
          initial={{ opacity: 0, x: 275, y: 100 }}
          className="absolute -top-4 right-80 hidden lg:block"
        >
          <Pointer color="red" name="Action Figures" />
        </motion.div>

        <div className="flex justify-center">
          <div className="relative mx-auto mb-2 max-w-fit rounded-full border-2 border-[#328E6E] bg-white/70 px-4 py-1 text-sm font-semibold text-text-primary md:text-base">
            ✨ Shop. Collect. Conquer.
          </div>
        </div>

        <h1 className="px-6 text-4xl md:text-5xl lg:text-7xl font-medium text-center mt-6 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
          Level Up Your Collection with Fighero.
        </h1>
        <p className="text-center text-xl text-white/80 mt-8 max-w-2xl mx-auto drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
          We help collectors find, discover, and purchase their favorite figures
          in just a few taps.
        </p>

        <div className="mt-4 flex justify-center gap-4 sm:mt-6">
          <Link
            href="/shop"
            className="inline-block rounded-lg border border-white/30 bg-gradient-to-r from-[#1177bb] to-[#0d65c9] px-6 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg hover:from-[#008080]/90 hover:to-[#009990]/90 focus:outline-none focus:ring-2 focus:ring-[#3A59D7] focus:ring-offset-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Buy Now!
          </Link>
        </div>
      </div>
    </section>
  );
}