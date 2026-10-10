import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "বাজার দর",
    template: "%s | বাজার দর",
  },
  description: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body
        className={`${hindSiliguri.className} flex min-h-full flex-col bg-base-100 text-base-content`}
      >
        <Header />
        <Ticker />
        <main className="flex-1 bg-base-200">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}