import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CEFR.AI — Ingliz tilini ishonch bilan o‘rganing",
  description: "CEFR imtihoniga tayyorlanish, ko‘nikmalarni rivojlantirish va natijalarni kuzatish uchun shaxsiy platformangiz.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}