"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNav({ categories }) {
  // এখন কোন পেজে আছি, সেটা জানার জন্য
  const pathname = usePathname();

  return (
    <nav className="border-b border-base-300 bg-base-100" aria-label="ক্যাটাগরি">
      <ul className="no-scrollbar mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2">
        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          const active = pathname === href;

          return (
            <li key={category.id} className="shrink-0">
              <Link
                href={href}
                className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[#037333] bg-[#047f39] text-primary-content"
                    : "border-transparent hover:border-[#ccd0cc] hover:bg-[#dadeda]"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}