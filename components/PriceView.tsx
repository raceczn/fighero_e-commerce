import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  if (typeof price !== "number") return null;

  const hasDiscount = typeof discount === "number" && discount > 0;
  const discountedPrice = hasDiscount
    ? price - (discount * price) / 100
    : price;

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        {/* Discounted Price */}
        <PriceFormatter
          amount={discountedPrice}
          className={cn("text-shop_dark_green font-semibold", className)}
        />

        {/* Show original price only if there is a discount */}
        {hasDiscount && (
          <PriceFormatter
            amount={price}
            className={twMerge(
              "line-through text-xs font-normal text-zinc-500",
              className
            )}
          />
        )}
      </div>
    </div>
  );
};

export default PriceView;
