export default function CardSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-base-300 bg-base-100 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="skeleton h-12 w-12 rounded-xl" />
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-6 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}