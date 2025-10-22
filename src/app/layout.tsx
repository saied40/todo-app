import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "Todo List Fullstack App with Next.js",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="">
      <body className={`${firaCode.variable} font-fira antialiased bg-background text-foreground dark:bg-foreground dark:text-background`}>
        <Header />
        {children}
      </body>
    </html>
  );
};
