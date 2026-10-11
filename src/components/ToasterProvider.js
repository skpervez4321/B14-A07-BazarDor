"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  const pathname = usePathname();

  // login ছাড়া সুরক্ষিত পেজে ঢুকলে সাইন ইন পেজে এসে এই বার্তা দেখাবে
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reason") === "login-required") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [pathname]);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: { background: "#1d271f", color: "#fafcfa" },
      }}
    />
  );
}