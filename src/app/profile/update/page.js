import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export default async function UpdateProfilePage() {
  let session = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch {
    session = null;
  }
  if (!session) {
    redirect("/signin?reason=login-required");
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">প্রোফাইল আপডেট</h1>
        <p className="text-sm">আপনার নাম বা ছবির লিংক বদলাতে পারেন।</p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
        <UpdateProfileForm
          initialName={session.user.name}
          initialImage={session.user.image ?? ""}
        />
      </div>

      <Link href="/profile" className="text-sm hover:underline">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}