import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "طرح تحول صنعت زنبورداری",
  description: "فرم مشارکت در شناسایی چالش‌ها و ارائه راهکارهای صنعت زنبورداری",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.variable} font-sans bg-gray-50 text-gray-800`}>
        {children}
      </body>
    </html>
  );
}