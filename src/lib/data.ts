import { CANONICAL_BOTTLE } from "@/lib/brand/canonical";

export interface Product {
  id: string;
  name: string;
  flavor: "mango" | "strawberry" | "watermelon" | "grape";
  tagline: string;
  description: string;
  price: string;
  priceValue: number;
  color: string;
  liquidColor: string;
  glassTint: string;
  bg: string;
  label: string;
  category: string;
  travel: "ltr" | "rtl";
  activity: "paragliding" | "surfing" | "skateboarding" | "cycling";
  bottleSrc: string;
  ingredients: { name: string }[];
}

export const PRICE_INR = "₹159";
export const PRICE_VALUE = 159;

export const products: Product[] = [
  {
    id: "mango-madness",
    flavor: "mango",
    name: "Mango Madness",
    tagline: "Tropical sunshine in a bottle.",
    description:
      "Our signature mango drop. Harvested at peak ripeness and cold-pressed for maximum flavor.",
    price: PRICE_INR,
    priceValue: PRICE_VALUE,
    color: "bg-[#FF9F1C]",
    liquidColor: "#FF9F1C",
    glassTint: "#ffe4b5",
    bg: "#FF9F1C",
    label: "MANGO",
    category: "Mango",
    travel: "ltr",
    activity: "paragliding",
    bottleSrc: CANONICAL_BOTTLE.flavors.mango,
    ingredients: [{ name: "Mango" }],
  },
  {
    id: "strawberry-smash",
    flavor: "strawberry",
    name: "Strawberry Smash",
    tagline: "Tart, sweet, and unbelievably refreshing.",
    description:
      "Catch the wave of wild strawberries. Smashed perfectly without any added sugars.",
    price: PRICE_INR,
    priceValue: PRICE_VALUE,
    color: "bg-[#E71D36]",
    liquidColor: "#E71D36",
    glassTint: "#ffe4e1",
    bg: "#E71D36",
    label: "STRAWBERRY",
    category: "Strawberry",
    travel: "rtl",
    activity: "surfing",
    bottleSrc: CANONICAL_BOTTLE.flavors.strawberry,
    ingredients: [{ name: "Strawberry" }],
  },
  {
    id: "watermelon-wave",
    flavor: "watermelon",
    name: "Watermelon Wave",
    tagline: "The ultimate thirst quencher.",
    description:
      "Pure cold-pressed watermelon with a hint of mint. Made for lazy sunny afternoons.",
    price: PRICE_INR,
    priceValue: PRICE_VALUE,
    color: "bg-[#2EC4B6]",
    liquidColor: "#2EC4B6",
    glassTint: "#e8ffe8",
    bg: "#2EC4B6",
    label: "WATERMELON",
    category: "Watermelon",
    travel: "ltr",
    activity: "skateboarding",
    bottleSrc: CANONICAL_BOTTLE.flavors.watermelon,
    ingredients: [{ name: "Watermelon" }, { name: "Mint" }],
  },
  {
    id: "grape-gravity",
    flavor: "grape",
    name: "Grape Gravity",
    tagline: "Intense, bold concord grape.",
    description:
      "Rich, vibrant concord grape flavor. No gravity, no limits, no filter.",
    price: PRICE_INR,
    priceValue: PRICE_VALUE,
    color: "bg-[#4B0082]",
    liquidColor: "#4B0082",
    glassTint: "#f4e4ff",
    bg: "#4B0082",
    label: "GRAPE",
    category: "Grape",
    travel: "rtl",
    activity: "cycling",
    bottleSrc: CANONICAL_BOTTLE.flavors.grape,
    ingredients: [{ name: "Concord Grape" }],
  },
];

export function getProduct(id: string): Product | undefined {
  const aliases: Record<string, string> = {
    "raspberry-rush": "strawberry-smash",
    "forest-blend": "watermelon-wave",
    grape: "grape-gravity",
    mango: "mango-madness",
    strawberry: "strawberry-smash",
    watermelon: "watermelon-wave",
  };
  const resolved = aliases[id] ?? id;
  return products.find((p) => p.id === resolved);
}

export function getCategories(): string[] {
  const categories = new Set(products.map((p) => p.category));
  return ["All", ...Array.from(categories)];
}

export function getProductByFlavor(flavor: Product["flavor"]): Product {
  return products.find((p) => p.flavor === flavor) ?? products[0];
}
