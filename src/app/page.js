import { getCategories, getProducts } from "@/lib/api";
import {
  formatPrice,
  getBanglaDate,
  getChangeInfo,
  sortProducts,
  toBnDigits,
  topFallers,
  topRisers,
  unitLabel,
} from "@/lib/format";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const first = products[0];
  const change = getChangeInfo(first?.change);
  const cheapest = sortProducts(products, "price-asc")[0];

  return (
    <main className="min-h-screen bg-base-100 text-base-content p-8 space-y-3">
      <h1 className="text-3xl font-bold">🛒 বাজার দর</h1>
      <p>{getBanglaDate()}</p>
      <p>
        মোট পণ্য: {toBnDigits(products.length)} | ক্যাটাগরি:{" "}
        {toBnDigits(categories.length)}
      </p>
      <p>
        দাম বেড়েছে: {toBnDigits(topRisers(products).length)} | কমেছে:{" "}
        {toBnDigits(topFallers(products).length)}
      </p>
      {first && (
        <p>
          {first.image} {first.nameBn} — {unitLabel(first.unit)} —{" "}
          {formatPrice(first.today)} {change.label}
        </p>
      )}
      {cheapest && (
        <p>
          সবচেয়ে কম দাম: {cheapest.nameBn} — {formatPrice(cheapest.today)}
        </p>
      )}
    </main>
  );
}