import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Podere Centoquattro Manager",
  description: "Gestionale Podere Centoquattro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-[#F6FAF5]">

        <div className="flex min-h-screen">

          <Sidebar />

          <main className="flex-1 bg-gradient-to-br from-[#F8FBF6] to-[#EEF5EF] p-12 overflow-y-auto">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}
