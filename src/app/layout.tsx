import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://compressimageto20kb.app"),
  applicationName: "Compress Image to 20KB",
  title: {
    default: "Compress Image to 20KB Online - Free 20KB Image Compressor",
    template: "%s | Compress Image to 20KB"
  },
  description:
    "Compress image to 20KB online for free. Reduce JPG, PNG, and WebP image size to 20KB or less directly in your browser. Fast, private, colorful, and no signup required.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
