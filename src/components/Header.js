import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCategories } from "@/lib/api";
import { getBanglaDate } from "@/lib/format";
import CategoryNav from "@/components/CategoryNav";
import UserMenu from "@/components/UserMenu";

export default async function Header() {
  // API ফেল করলেও যেন পুরো সাইট না ভাঙে
  let categories = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  // কেউ সাইন ইন করা আছে কি না দেখা
  let user = null;
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    user = session?.user ?? null;
  } catch {
    user = null;
  }

  return (
    <header className="bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xl font-bold">বাজার দর</span>
            <span className="text-xs">{getBanglaDate()}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu name={user.name} email={user.email} />
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <CategoryNav categories={categories} />
    </header>
  );
}