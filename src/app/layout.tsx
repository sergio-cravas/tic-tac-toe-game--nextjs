import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/theme/globals.scss";

const outfit = Outfit({ subsets: ["latin"], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
