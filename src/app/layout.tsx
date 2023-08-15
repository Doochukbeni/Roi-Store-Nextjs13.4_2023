import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster as ReactToaster } from "react-hot-toast";

import { Toaster } from "@/components/ui/Toaster";
import ModalProvider from "@/providers/ModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roi-D admin Dashboard",
  description: "This is a Roi-Doo Admin CMS dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <ModalProvider />
        <ReactToaster />

        <div className="container max-w-7xl mx-auto h-full pt-5">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
