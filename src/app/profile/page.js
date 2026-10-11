import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
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

  const { name, email, image } = session.user;
  const initial = name?.trim()?.charAt(0) || "U";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="h-20 w-20 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-3xl font-semibold text-primary-content">
            {initial}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-xl font-semibold">{name}</p>
          <p className="truncate">{email}</p>
        </div>

        <SignOutButton />
      </section>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-6">
        <h2 className="text-lg font-semibold">তথ্য</h2>
        <dl className="mt-3 flex flex-col gap-3 text-sm">
          <div>
            <dt className="opacity-70">নাম</dt>
            <dd className="font-medium">{name}</dd>
          </div>
          <div>
            <dt className="opacity-70">ইমেইল</dt>
            <dd className="font-medium">{email}</dd>
          </div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary mt-5 w-full">
          আপডেট
        </Link>
      </section>
    </div>
  );
}