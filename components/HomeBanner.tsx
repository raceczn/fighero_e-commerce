"use client";

import Image from "next/image";
import Pointer from "@/components/Pointer";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { banner_1 } from "@/images";
import Link from "next/link";

export default function Hero() {
  const [leftDesignScope, leftDesignAnimate] = useAnimate();
  const [leftPointerScope, leftPointerAnimate] = useAnimate();

  const [rightDesignScope, rightDesignAnimate] = useAnimate();
  const [rightPointerScope, rightPointerAnimate] = useAnimate();

  useEffect(() => {
    leftDesignAnimate([
      [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
      [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
    ]);

    leftPointerAnimate([
      [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
      [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
      [
        leftPointerScope.current,
        { y: [0, 16, 0], x: 0 },
        { duration: 0.5, ease: "easeInOut" },
      ],
    ]);

    rightDesignAnimate([
      [rightDesignScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.5 }],
      [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
    ]);

    rightPointerAnimate([
      [
        rightPointerScope.current,
        { opacity: 1 },
        { duration: 0.5, delay: 1.5 },
      ],
      [rightPointerScope.current, { y: 0, x: 175 }, { duration: 0.5 }],
      [
        rightPointerScope.current,
        { y: [0, 20, 0], x: 0 },
        { duration: 0.5, ease: "easeInOut" },
      ],
    ]);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
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
          className="absolute top-96 left-56 hidden lg:block"
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
          <div className="inline-flex py-1 px-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full text-white font-semibold shadow-md">
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
            className="inline-block rounded border border-[#3A59D1] bg-[#3D90D7] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#3A59D1] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#3A59D1] focus:ring-offset-2"
          >
            Shop Now!
          </Link>
        </div>
      </div>
    </section>
  );
}
