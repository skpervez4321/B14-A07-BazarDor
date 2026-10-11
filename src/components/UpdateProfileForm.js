"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormField from "@/components/FormField";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName, initialImage }) {
  const router = useRouter();
  const [name, setName] = useState(initialName ?? "");
  const [image, setImage] = useState(initialImage ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (name.trim().length === 0) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    const trimmedImage = image.trim();
    if (trimmedImage && !/^https?:\/\/\S+$/.test(trimmedImage)) {
      toast.error("ছবির লিংক সঠিক নয়");
      return;
    }

    // ছবির লিংক ফাঁকা থাকলে শুধু নাম আপডেট হবে
    const data = { name: name.trim() };
    if (trimmedImage) data.image = trimmedImage;

    setLoading(true);
    try {
      const { error } = await authClient.updateUser(data);
      if (error) {
        toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
        return;
      }
      toast.success("তথ্য আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  }

  return (
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
        id="image"
        label="ছবির লিংক (ঐচ্ছিক)"
        value={image}
        onChange={(event) => setImage(event.target.value)}
        placeholder="https://example.com/photo.jpg"
        autoComplete="off"
      />

      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading ? "অপেক্ষা করুন…" : "Update Information"}
      </button>
    </form>
  );
}