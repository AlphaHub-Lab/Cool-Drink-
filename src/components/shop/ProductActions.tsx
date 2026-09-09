"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function ProductActions({
  productId,
  price,
  color,
  align = "center",
}: {
  productId: string;
  price: string;
  color: string;
  align?: "center" | "start";
}) {
  const { addToCart } = useCart();

  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 sm:gap-6 ${
        align === "start" ? "items-start sm:items-center" : "items-center justify-center"
      }`}
    >
      <span className="text-3xl md:text-4xl font-display font-bold">{price}</span>
      <button
        onClick={() => addToCart(productId)}
        className={`${color} text-white px-8 py-4 rounded-full font-display font-medium text-xs md:text-sm tracking-[0.15em] uppercase hover:scale-105 active:scale-95 transition-all duration-500`}
      >
        Add to Cart
      </button>
      <Link href="/checkout">
        <button
          onClick={() => addToCart(productId)}
          className="bg-foreground text-background px-8 py-4 rounded-full font-display font-medium text-xs md:text-sm tracking-[0.15em] uppercase hover:scale-105 active:scale-95 transition-all duration-500"
        >
          Buy Now
        </button>
      </Link>
    </div>
  );
}
