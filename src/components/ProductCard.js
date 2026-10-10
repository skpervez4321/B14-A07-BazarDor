import Link from "next/link";
import { formatPrice, getChangeInfo, unitLabel } from "@/lib/format";

const BADGE_COLORS = {
  up: "text-error",
  down: "text-success",
  flat: "opacity-60",
};

export default function ProductCard({ product }) {
  const change = getChangeInfo(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-base-200 text-2xl">
          {product.image}
        </div>
        <div>
          <h3 className="font-semibold">{product.nameBn}</h3>
          <p className="text-xs">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <div className="mt-3 flex items-end gap-2">
        <div>
          <p className="text-xs">আজকের দাম</p>
          <p className="text-xl font-bold">{formatPrice(product.today)}</p>
        </div>
        <span
          className={`mb-1 rounded-full bg-base-200 px-2 py-1 text-xs font-semibold ${BADGE_COLORS[change.dir]}`}
        >
          {change.label}
        </span>
      </div>
    </Link>
  );
}