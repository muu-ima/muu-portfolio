import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "muu-portfolio",
  description: "3Dキューブナビゲーションで見せるポートフォリオサイト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
