"use client";

import { createContext, useContext, useMemo, useState, useCallback, ReactNode } from "react";
import { getProduct, PRICE_VALUE, type Product } from "@/lib/data";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  color: string;
  bottleSrc: string;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function toCartItem(product: Product, qty: number): CartItem {
  return {
    id: product.id,
    name: product.name,
    price: product.priceValue ?? PRICE_VALUE,
    qty,
    color: product.color,
    bottleSrc: product.bottleSrc,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((productId: string, qty = 1) => {
    const product = getProduct(productId);
    if (!product) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, toCartItem(product, qty)];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === productId ? { ...i, qty } : i)));
  }, [removeFromCart]);

  const itemCount = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);

  const value = useMemo(
    () => ({
      items,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      addToCart,
      removeFromCart,
      setQty,
      itemCount,
      subtotal,
    }),
    [items, isCartOpen, addToCart, removeFromCart, setQty, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
