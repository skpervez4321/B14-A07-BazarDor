"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UserMenu({ name, email }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // মেনুর বাইরে ক্লিক করলে বা Esc চাপলে বন্ধ হবে
  useEffect(() => {
    function handleClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function handleKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  async function handleSignOut() {
    setOpen(false);
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

  // নামের প্রথম অক্ষর আইকনে দেখাবে
  const initial = name?.trim()?.charAt(0) || "U";

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl p-1 hover:bg-base-200"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-sm font-semibold text-primary-content">
          {initial}
        </span>
        <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">
          {name}
        </span>
        <span className="text-xs">▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg"
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="truncate text-xs">{email}</p>
          </div>

          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm hover:bg-base-200"
          >
            👤 আমার প্রোফাইল
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm hover:bg-base-200"
          >
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}