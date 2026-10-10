"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { sortProducts, toBnDigits } from "@/lib/format";

export default function CategoryProducts({ products }) {
  // কোন ভাবে সাজানো হবে, সেটা মনে রাখে
  const [sortMode, setSortMode] = useState("default");
  const sorted = sortProducts(products, sortMode);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-base-300 bg-base-100 p-4">
        <label htmlFor="sort" className="text-sm">
          সাজান
        </label>
        <select
          id="sort"
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value)}
          className="select select-sm w-auto"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="text-sm">
        মোট {toBnDigits(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {sorted.length === 0 ? (
        <p className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center">
          এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}