export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  color: string;
  emoji: string;
  category: string;
  ingredients: { name: string; emoji: string }[];
}

export const products: Product[] = [
  {
    id: "mango-madness",
    name: "Mango Madness",
    tagline: "Tropical sunshine in a bottle.",
    description: "A thick, velvety blend of ripe Alphonso mangoes with a hint of passionfruit. No water added, just pure pulpy goodness.",
    price: "$8.00",
    color: "bg-mango-500",
    emoji: "🥭",
    category: "Citrus",
    ingredients: [
      { name: "Alphonso Mango", emoji: "🥭" },
      { name: "Passionfruit", emoji: "🟡" },
      { name: "Squeeze of Lime", emoji: "🍋‍🟩" },
    ],
  },
  {
    id: "raspberry-rush",
    name: "Raspberry Rush",
    tagline: "Tart, sweet, and aggressively red.",
    description: "Packed with over 100 raspberries per bottle. It's intense, it's antioxidant-rich, and it will definitely stain your shirt if you spill it.",
    price: "$8.50",
    color: "bg-raspberry-500",
    emoji: "🍓", 
    category: "Berry",
    ingredients: [
      { name: "Wild Raspberries", emoji: "🍓" },
      { name: "Pomegranate Arils", emoji: "🔴" },
      { name: "Beetroot", emoji: "🍠" },
    ],
  },
  {
    id: "forest-blend",
    name: "Forest Blend",
    tagline: "The only green juice that doesn't taste like grass.",
    description: "A smooth, refreshing mix of spinach, kiwi, and green apple. Sweet enough to enjoy, green enough to feel healthy.",
    price: "$9.00",
    color: "bg-forest-500",
    emoji: "🥝",
    category: "Green",
    ingredients: [
      { name: "Kiwi", emoji: "🥝" },
      { name: "Green Apple", emoji: "🍏" },
      { name: "Spinach", emoji: "🥬" },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getCategories(): string[] {
  const categories = new Set(products.map(p => p.category));
  return ["All", ...Array.from(categories)];
}
