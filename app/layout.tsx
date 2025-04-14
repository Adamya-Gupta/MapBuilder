import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Map Builder ",
  description: "Create and share maps with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
