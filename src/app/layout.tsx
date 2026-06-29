import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HK of Designers — A Creative Home for Every Designer",
  description:
    "Join a vibrant community of Graphic, UI/UX, Motion, and 3D/2D designers, where creativity meets collaboration.",
  openGraph: {
    title: "HK of Designers",
    description:
      "A Creative Home for Every Designer. Join a vibrant community of designers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
