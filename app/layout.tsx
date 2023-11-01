/*
The essence of this Next.js layout component lies in providing a consistent and responsive layout structure, integrating global styles, metadata for SEO, state management, and modular components for headers and footers. This ensures a unified look and feel while allowing for flexibility in content rendering and responsiveness across various devices.
*/
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StateProvider from "./StateProvider";

export const metadata: Metadata = {
  title: "E-Commerce Website",
  description: "Created by Trae Zeeofor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StateProvider>
      <html lang="en" className="font-manrope text-[14px]">
        <body className="w-full min-h-[750px] flex flex-col justify-center items-center bg-traeFifaBlue text-traeWhiteBlue">
          <main className="min-h-[750px] w-[375px] sm:w-[475px] md:w-[570px] lg:w-[665px] xl:w-[760px] 2xl:w-[950px] grid grid-rows-[2fr,minmax(545px,auto),1fr] grid-cols-[auto] gap-1 p-1">
            <Header />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </StateProvider>
  );
}
