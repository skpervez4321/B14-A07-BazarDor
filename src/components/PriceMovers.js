import ProductCard from "@/components/ProductCard";

export default function PriceMovers({ title, icon, iconClass, products }) {
  // এমন পণ্য না থাকলে পুরো section লুকানো থাকবে
  if (products.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className={iconClass}>{icon}</span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}