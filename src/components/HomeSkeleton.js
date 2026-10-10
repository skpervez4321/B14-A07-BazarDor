import CardSkeleton from "@/components/CardSkeleton";

export default function HomeSkeleton() {
  return (
    <>
      {[0, 1, 2].map((block) => (
        <section key={block} className="flex flex-col gap-3">
          <div className="skeleton h-7 w-40" />
          <CardSkeleton count={6} />
        </section>
      ))}
    </>
  );
}