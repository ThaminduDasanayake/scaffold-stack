import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "scaffold-stack | The Modern Next.js Monorepo Generator",
  description:
    "Configure your perfect Next.js monorepo stack with real-time feedback, zero friction, and instant deterministic generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
