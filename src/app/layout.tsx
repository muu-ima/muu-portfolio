import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KIYONO Portfolio",
  description: "静かな余白とやわらかな質感で見せるポートフォリオサイト。",
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
