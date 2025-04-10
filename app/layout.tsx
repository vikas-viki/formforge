import type { Metadata } from "next";
import { GeistMono, GeistSans } from "geist/font"
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Applify",
  description: "Student application management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        /> */}
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Providers >
          {children}
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
