"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
        return;
      }
      toast.success("সাইন আউট সফল হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে, আবার চেষ্টা করুন");
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="inline-flex h-10 items-center justify-center rounded-lg border border-base-300 px-4 text-sm font-semibold text-error hover:bg-base-200"
    >
      ↩ সাইন আউট
    </button>
  );
}