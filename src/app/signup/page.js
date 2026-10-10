"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormField from "@/components/FormField";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/authErrors";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (name.trim().length === 0) {
      toast.error("আপনার নাম লিখুন");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("সঠিক ইমেইল লিখুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email,
        password,
      });
      if (error) {
        toast.error(authErrorMessage(error));
        return;
      }
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
      router.push("/signin");
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <FormField
            id="name"
            label="নাম"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            autoComplete="name"
          />
          <FormField
            id="email"
            label="ইমেইল"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <FormField
            id="password"
            label="পাসওয়ার্ড"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            autoComplete="new-password"
          />
          <FormField
            id="confirmPassword"
            label="পাসওয়ার্ড নিশ্চিত করুন"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="আবার লিখুন"
            autoComplete="new-password"
          />

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? "অপেক্ষা করুন…" : "অ্যাকাউন্ট তৈরি করুন"}
          </button>

          <div className="flex items-center gap-4 text-xs">
            <span className="h-px flex-1 bg-base-300" />
            <span>অথবা</span>
            <span className="h-px flex-1 bg-base-300" />
          </div>

          <SocialButtons />

          <p className="text-center text-sm">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-semibold text-primary hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </form>
      </div>

      <Link href="/" className="text-sm hover:underline">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}