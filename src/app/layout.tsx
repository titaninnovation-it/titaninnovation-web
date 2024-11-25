"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/libs/react-query-client-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect } from "react";
import { useAuthStore } from "@/libs/zustand/authStore";
import { LocalStorageLib } from "@/libs/localStorage.lib";
dayjs.extend(duration);

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Titan Innovation",
//   description: "Titan Innovation - Online Used heavy machinery",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authStore = useAuthStore();
  const pathname = usePathname();
  const isHide = ["/reset-password", "/sign-up", "/login"].some((path) =>
    pathname.includes(path)
  );
  useEffect(() => {
    const init = async () => {
      const tokens = await LocalStorageLib.getJWTtoken();
      if (tokens) {
        authStore.getProfile();
      }
    };
    init();
  }, []);
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>
          {!isHide && <Header />}
          {children}
          {!isHide && <Footer />}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
