import { Suspense } from "react";
import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";
import HomeSkeleton from "@/components/HomeSkeleton";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      <Hero />
      {/* দাম আসার আগে skeleton দেখাবে, Hero সাথে সাথে দেখা যাবে */}
      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}