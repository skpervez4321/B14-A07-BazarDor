import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="skeleton h-24 w-full rounded-2xl" />
      <div className="skeleton h-16 w-full rounded-2xl" />
      <CardSkeleton count={6} />
    </div>
  );
}


