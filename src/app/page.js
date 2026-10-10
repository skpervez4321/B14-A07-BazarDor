import { getProducts } from "@/lib/api";
import { toBnDigits, topFallers, topRisers } from "@/lib/format";
import Hero from "@/components/Hero";
import PriceMovers from "@/components/PriceMovers";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  // API ফেল করলে পেজ না ভেঙে ফাঁকা তালিকা দেখাবে
  let products = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      <Hero />

      <PriceMovers
        title="আজ দাম বেড়েছে"
        icon="▲"
        iconClass="text-error"
        products={topRisers(products)}
      />

      <PriceMovers
        title="আজ দাম কমেছে"
        icon="▼"
        iconClass="text-success"
        products={topFallers(products)}
      />

      <section id="সব-পণ্য" className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            মোট {toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
          {products.length === 0 ? (
            <p className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center">
              এই মুহূর্তে দাম আনা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}