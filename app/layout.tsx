// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/library/components/navigation";
import { Providers } from "./providers";
import { QueryProviders } from "./queryproviders";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Auction App",
  description: "A decentralized auction platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <QueryProviders>
            <div className="min-h-screen bg-gray-100">
              <Navigation />
              <div className="container mx-auto p-4">{children}</div>
            </div>
          </QueryProviders>
        </Providers>
      </body>
    </html>
  );
}