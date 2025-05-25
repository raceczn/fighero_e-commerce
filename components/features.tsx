"use client";
import { useState, useRef, ReactNode, MouseEvent } from "react";
import { TiLocationArrow } from "react-icons/ti";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

export const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-300 ease-in-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title: ReactNode;
  description?: string;
  isComingSoon?: boolean;
}

export const BentoCard = ({
  src,
  title,
  description,
  isComingSoon,
}: BentoCardProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden ">
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-5 text-black bg-black/30">
        <div>
          <h1 className="bento-title special-font text-white text-lg sm:text-xl md:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-[90%] text-xs sm:text-sm md:text-base text-white/80">
              {description}
            </p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative z-20 mt-5 flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="pb-20 mt-10 md:mt-20">
    <div className="container mx-auto px-0 md:px-5">
      <div className="mb-10 text-center">
        <h2 className="text-xl md:text-2xl font-bold">
          Explore Our Action Figures
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
        <BentoTilt className="md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                zig<b>m</b>a
              </>
            }
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt>
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                n<b>e</b>xus
              </>
            }
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt>
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt>
          <div className="flex h-full flex-col justify-between bg-[#648DB3] p-8 rounded-xl">
            <h1 className="bento-title special-font max-w-80 text-black text-3xl sm:text-4xl">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>
            <TiLocationArrow className="mt-8 scale-[4] self-end text-black" />
          </div>
        </BentoTilt>

        <BentoTilt>
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            playsInline
            className="h-full w-full rounded-xl object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
