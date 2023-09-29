import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster as ReactToaster } from "react-hot-toast";

import { Toaster } from "@/components/ui/Toaster";
import ModalProvider from "@/providers/ModalProvider";
import { ThemeProvider } from "@/providers/theme-provider";

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
      className={cn(
        // "bg-white text-slate-900  dark:bg-slate-900 dark:text-slate-200 h-full antialiased",
        inter.className
      )}
    >
      <body className="dark:bg-slate-800 dark:text-slate-300 h-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModalProvider />
          <ReactToaster />

          <div className="container max-w-7xl mx-auto">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
