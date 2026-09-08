import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdThemeProvider from "@/app/_components/providers/AntdThemeProvider";
import BackToTopButton from "@/app/_components/shared/BackToTopButton";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MedEx — Book hospitals, labs and wellness in one search",
  description:
    "MedEx is the healthcare aggregator that brings hospitals, labs and wellness studios into one search — compare, book and manage care in a few taps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AntdRegistry>
          <AntdThemeProvider>
            {children}
            <BackToTopButton />
          </AntdThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
