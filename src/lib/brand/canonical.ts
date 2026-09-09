export const BRAND = {
  name: "No Filter",
  wordmark: "NO FILTER",
  tagline: "The Raw Truth.",
} as const;

export const CANONICAL_BOTTLE = {
  family: "nf-glass-cylinder",
  proportions: { bodyHeight: 2.2, bodyRadiusTop: 0.38, bodyRadiusBottom: 0.42, neckHeight: 1.0, capHeight: 0.25 },
  cap: "ribbed-cylinder",
  label: {
    src: "/assets/hero/product/nf-real-label.svg",
    position: [0, 0.1, 0.41] as const,
    size: [0.65, 0.6] as const,
  },
  glass: {
    transmission: 0.55,
    roughness: 0.08,
    ior: 1.5,
    thickness: 0.45,
    clearcoat: 1,
  },
  heroRaster: "/assets/hero/product/nf-hero-bottle-main.png",
  condensation: "/assets/hero/textures/nf-condensation-overlay.jpg",
  flavors: {
    mango: "/assets/products/nf-bottle-mango.png",
    strawberry: "/assets/products/nf-bottle-strawberry.png",
    watermelon: "/assets/products/nf-bottle-watermelon.png",
    grape: "/assets/products/nf-bottle-grape.png",
  },
} as const;

export const WORLD_ASSETS = {
  mango: {
    sloth: "/assets/worlds/nf-sloth-paraglide.png",
    env: "/assets/worlds/nf-env-mango.jpg",
  },
  strawberry: {
    sloth: "/assets/worlds/nf-sloth-surf.png",
    env: "/assets/worlds/nf-env-strawberry.jpg",
  },
  watermelon: {
    sloth: "/assets/worlds/nf-sloth-skate.png",
    env: "/assets/worlds/nf-env-watermelon.jpg",
  },
  grape: {
    sloth: "/assets/worlds/nf-sloth-cycle.png",
    env: "/assets/worlds/nf-env-grape.jpg",
  },
} as const;

export const SCENE_CAMERA = {
  fov: 35,
  position: [0, 0.15, 6.2] as const,
  target: [0, 0, 0] as const,
  near: 0.1,
  far: 80,
} as const;

export const MODEL_FIT = {
  targetHeight: 2.4,
  minDistance: 4.2,
  maxDistance: 9,
  padding: 1.28,
} as const;
