import { getProduct } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductShowcase from "@/components/shop/ProductShowcase";
import IngredientExplosion from "@/components/shop/IngredientExplosion";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <ProductShowcase product={product} />
      
      <section className="py-20 bg-background text-center px-6">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">{product.name}</h1>
        <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto">{product.tagline}</p>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-12">{product.description}</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <span className="text-4xl font-display font-bold">{product.price}</span>
          <Link href="/cart">
            <button className={`${product.color} text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-transform`}>
              Add to Cart
            </button>
          </Link>
        </div>
      </section>

      <IngredientExplosion product={product} />
    </div>
  );
}