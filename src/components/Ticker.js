import { getProducts } from "@/lib/api";
import { formatNumber, getChangeInfo, unitName } from "@/lib/format";

const CHANGE_COLORS = {
  up: "text-error",
  down: "text-success",
  flat: "opacity-60",
};

export default async function Ticker() {
  let products = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  if (products.length === 0) return null;

  // একই তালিকা দুইবার, যাতে স্ক্রল শেষে ফাঁক না থাকে
  const items = [...products, ...products];

  return (
    <div
      className="overflow-hidden border-b border-base-300 bg-base-100"
      aria-label="আজকের দামের টিকার"
    >
      <div className="ticker-track">
        {items.map((product, index) => {
          const change = getChangeInfo(product.change);

          return (
            <span
              key={`${product.id}-${index}`}
              aria-hidden={index >= products.length}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap px-4 py-2 text-sm"
            >
              <span>{product.image}</span>
              <span className="font-medium">{product.nameBn}</span>
              <span>
                {formatNumber(product.today)} টাকা/{unitName(product.unit)}
              </span>
              <span className={`font-semibold ${CHANGE_COLORS[change.dir]}`}>
                {change.label}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}