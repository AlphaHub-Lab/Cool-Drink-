import { getProduct } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductShowcase from "@/components/shop/ProductShowcase";
import IngredientExplosion from "@/components/shop/IngredientExplosion";
import ProductActions from "@/components/shop/ProductActions";

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
        
        <ProductActions productId={product.id} price={product.price} color={product.color} />
      </section>

      <IngredientExplosion product={product} />
    </div>
  );
}