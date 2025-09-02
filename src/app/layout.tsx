import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

// Server startup logging
console.log("Insurance Blog App Server Starting...");
console.log(`Started at: ${new Date().toISOString()}`);
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Base URL: http://localhost:3000`);
console.log("Server is running and ready to accept connections!");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App Template",
  description: "A professional blog application template built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
