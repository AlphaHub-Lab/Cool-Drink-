"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products, getCategories, type Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = getCategories();

  // Filter products based on category
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Grid staggered animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 1, y: 12 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="bg-background min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6">
        
        {/* Shop Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-bold text-foreground mb-6"
          >
            The Shop
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground/70 max-w-2xl mx-auto font-medium"
          >
            Pick your poison. Just kidding, it&apos;s all incredibly healthy. No sugar, no weird stuff. Just squished fruit.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-bold text-lg transition-all ${
                activeCategory === category 
                  ? "bg-foreground text-background shadow-lg scale-105" 
                  : "bg-white text-foreground hover:bg-white/80 shadow-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory} // Changing key triggers exit/enter animation
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <Link href={`/shop/${product.id}`}>
      <motion.div
        ref={cardRef}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative h-[450px] rounded-[3rem] p-8 flex flex-col justify-between overflow-hidden group bg-white shadow-sm hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Background Blob */}
        <motion.div 
          className={`absolute inset-0 ${product.color} opacity-10 z-0`}
          animate={{
            scale: isHovered ? 1.2 : 1,
            borderRadius: isHovered ? "40px" : "48px",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Top Info */}
        <div className="relative z-10 flex justify-between items-start w-full">
          <span className="font-bold text-foreground bg-white/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {product.category}
          </span>
          <span className="font-bold text-foreground text-xl">
            {product.price}
          </span>
        </div>

        <div className="relative z-10 flex-grow flex items-center justify-center">
          <motion.div
            animate={{
              y: isHovered ? -15 : 0,
              rotate: isHovered ? 8 : 0,
              scale: isHovered ? 1.06 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative w-40 h-56 filter drop-shadow-xl"
          >
            <Image src={product.bottleSrc} alt={product.name} fill className="object-contain" />
          </motion.div>
        </div>

        {/* Bottom Info & Quick Add */}
        <div className="relative z-10 flex justify-between items-end w-full">
          <div>
            <h3 className="font-display font-bold text-3xl text-foreground mb-1">{product.name}</h3>
            <p className="text-foreground/60 text-sm max-w-[200px] truncate">{product.tagline}</p>
          </div>

          <motion.button
            onClick={handleQuickAdd}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-14 h-14 rounded-full ${product.color} text-white flex items-center justify-center text-2xl shadow-lg z-20`}
          >
            +
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}