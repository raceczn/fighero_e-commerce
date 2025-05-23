"use client";

import Image from "next/image";
import Pointer from "@/components/Pointer";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { banner_1 } from "@/images";
import Link from "next/link";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Hero() {
  const [leftDesignScope, leftDesignAnimate] = useAnimate();
  const [leftPointerScope, leftPointerAnimate] = useAnimate();

  const [rightDesignScope, rightDesignAnimate] = useAnimate();
  const [rightPointerScope, rightPointerAnimate] = useAnimate();

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
  }, []);

  return (
    <section className={`${inter.className} relative py-28 overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={banner_1}
          alt="Hero Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container">
        {/* Animated pointers */}
        <motion.div
          ref={leftDesignScope}
          initial={{ opacity: 0, y: 100, x: -100 }}
          className="absolute -left-32 top-16 hidden lg:block"
          drag
        ></motion.div>
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
        ></motion.div>
        <motion.div
          ref={rightPointerScope}
          initial={{ opacity: 0, x: 275, y: 100 }}
          className="absolute -top-4 right-80 hidden lg:block"
        >
          <Pointer color="red" name="Action Figures" />
        </motion.div>

        {/* Main content */}
        <div className="flex justify-center">
          <div className="relative mx-auto mb-2 max-w-fit rounded-full border-2 border-[#328E6E] bg-white/70 px-4 py-1 text-sm font-semibold text-text-primary md:text-base">
            ✨ Shop. Collect. Conquer.
          </div>
        </div>

        <h1 className="px-6 text-4xl md:text-5xl lg:text-7xl font-medium text-center mt-6 text-white">
          Level Up Your Collection with Fighero.
        </h1>
        <p className="text-center text-xl text-white/80 mt-8 max-w-2xl mx-auto">
          We help collectors find, discover, and purchase their favorite figures
          in just a few taps.
        </p>

        <div className="mt-4 flex justify-center gap-4 sm:mt-6">
          <Link
            href="/shop"
            className="px-12 inline-block rounded-lg border border-white/30 bg-gradient-to-r from-[#4E71FF] to-[#3D90D7] px-6 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg hover:from-[#3A59D1]/90 hover:to-[#3D90D7]/90 focus:outline-none focus:ring-2 focus:ring-[#3A59D7] focus:ring-offset-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Buy Now!
          </Link>
        </div>
      </div>
    </section>
  );
}
