import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LAYER_ORDER } from "@/lib/constants";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";
import { ScrollToTop } from "@/components/scroll-to-top";
import { NextAuthProvider } from "@/providers/NextAuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DevSync - Real-time Collaboration Platform",
  description: "Modern real-time collaboration platform for teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={cn(
          inter.variable,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <NextAuthProvider>
          <ScrollToTop />
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main
              className="flex-1 relative"
              style={{ zIndex: LAYER_ORDER.content }}
            >
              {children}
            </main>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
