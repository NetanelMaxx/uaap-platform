import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // 1. Import the Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UAAP Sports Platform",
  description: "The next-generation digital hub for UAAP sports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <Navbar />
        {/* pt-20 to offset the fixed navbar height */}
        <main className="pt-20"> 
          {children}
        </main>
        <Footer /> {/* 2. Add the Footer here */}
      </body>
    </html>
  );
}
