import { notFound } from "next/navigation";
import { getCategoryBySlug, getProducts } from "@/lib/api";
import { toBnDigits } from "@/lib/format";
import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({ params }) {
  // URL থেকে slug নেওয়া (যেমন chal)
  const { slug } = await params;

  // ভুল slug হলে 404 পেজ দেখাবে
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProducts(slug);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <header className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <span>{category.icon}</span>
          <span>{category.nameBn}</span>
        </h1>
        <p className="mt-1 text-sm">
          {toBnDigits(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </header>

      <CategoryProducts products={products} />
    </div>
  );
}