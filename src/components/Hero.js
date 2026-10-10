import Image from "next/image";
import { getBanglaDate } from "@/lib/format";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100">
      <div className="flex flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        <div className="flex max-w-xl flex-col items-start gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {getBanglaDate()}
          </span>
          <h1 className="text-3xl font-bold md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-1 text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md mt-3">
            সব পণ্য দেখুন
          </a>
        </div>

        <Image
          src="/bazar-hero.png"
          alt="ফলে ভরা বাজারের ঝুড়ি"
          width={315}
          height={263}
          priority
          className="h-auto w-48 md:w-72"
        />
      </div>
    </section>
  );
}