import { MousePointer2 } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

const Pointer = (props: { name: string; color?: "red" | "blue" }) => {
    const { name, color } = props;

    return (
        <div>
            <MousePointer2 size={25} className="mb-1 text-white opacity-70" />
            <p
                className={twMerge(
                    "ml-5 inline-flex rounded-full font-medium text-sm bg-blue-500 px-2 rounded-tl-none text-white",
                    color === "red" && "bg-red-500"
                )}
            >
                {name}
            </p>
        </div>
    );
};

export default Pointer;
