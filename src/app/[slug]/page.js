import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import {
  formatNumber,
  getChangeInfo,
  toBnDigits,
  toNumber,
  unitName,
} from "@/lib/format";

const CHANGE_COLORS = {
  up: "text-error",
  down: "text-success",
  flat: "opacity-60",
};

// দশমিক থাকলে ২ ঘর (৬৩.৫০), না থাকলে পূর্ণ সংখ্যা (৬৩)
function formatAverage(value) {
  if (Number.isInteger(value)) return formatNumber(value);
  return toBnDigits(
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  // সাইন ইন করা না থাকলে সাইন ইন পেজে পাঠানো হবে
  let session = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch {
    session = null;
  }
  if (!session) {
    redirect("/signin?reason=login-required");
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const unit = unitName(product.unit);
  const change = getChangeInfo(product.change);
  const diff = Math.abs(toNumber(product.today) - toNumber(product.yesterday));

  let changeText = "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
  if (change.dir === "up") {
    changeText = `গতকালের তুলনায় আজ দাম বেড়েছে · ${formatNumber(diff)} টাকা`;
  }
  if (change.dir === "down") {
    changeText = `গতকালের তুলনায় আজ দাম কমেছে · ${formatNumber(diff)} টাকা`;
  }

  // প্রতিটি বাজারের গড়, তারপর গড় অনুযায়ী কম থেকে বেশি সাজানো
  const markets = (product.markets ?? [])
    .map((market) => {
      const min = toNumber(market.min);
      const max = toNumber(market.max);
      return { ...market, min, max, average: (min + max) / 2 };
    })
    .sort((a, b) => a.average - b.average);

  const hasMarkets = markets.length > 0;
  const lowest = hasMarkets ? Math.min(...markets.map((m) => m.min)) : 0;
  const highest = hasMarkets ? Math.max(...markets.map((m) => m.max)) : 0;
  const overallAverage = hasMarkets
    ? Math.round(markets.reduce((sum, m) => sum + m.average, 0) / markets.length)
    : 0;

  const stats = [
    {
      label: "সর্বনিম্ন দাম",
      value: lowest,
      note: "সবচেয়ে কম দামের বাজার",
    },
    {
      label: "সর্বাধিক দাম",
      value: highest,
      note: "সবচেয়ে বেশি দামের বাজার",
    },
    {
      label: "গড় দাম",
      value: overallAverage,
      note: `প্রতি ${unit}-এর হিসাবে`,
    },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/" className="hover:underline">
          হোম
        </Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:underline">
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span aria-current="page">{product.nameBn}</span>
      </nav>

      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 md:flex-row md:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
          {product.image}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-3xl font-bold">{product.nameBn}</h1>
          <p className="text-sm">
            প্রতি {unit} · {product.categoryNameBn}
          </p>
          <p className="mt-2 text-sm">{changeText}</p>
        </div>

        <div className="flex flex-col rounded-2xl bg-base-200 px-5 py-4">
          <span className="text-sm">আজকের দাম</span>
          <span className="text-3xl font-bold">{formatNumber(product.today)}</span>
          <span className="text-sm">টাকা / {unit}</span>
          <span className={`mt-1 text-sm font-semibold ${CHANGE_COLORS[change.dir]}`}>
            {change.label}
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-base-300 bg-base-100 px-6 py-4"
            >
              <p className="text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{formatNumber(stat.value)} টাকা</p>
              <p className="text-xs">{stat.note}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-3 text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
        {hasMarkets ? (
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন</th>
                  <th>সর্বাধিক</th>
                  <th>গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <tr key={`${market.market}-${market.division}`}>
                    <td className="font-medium">{market.market}</td>
                    <td>{market.division}</td>
                    <td>{formatNumber(market.min)} টাকা</td>
                    <td>{formatNumber(market.max)} টাকা</td>
                    <td>{formatAverage(market.average)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-2xl border border-base-300 p-6 text-center">
            এই পণ্যের বাজারভিত্তিক দাম এখন পাওয়া যাচ্ছে না।
          </p>
        )}
      </section>
    </div>
  );
}