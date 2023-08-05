import "./globals.css";
import { Inter } from "next/font/google";

import AuthProvider from "@/context/AuthProvider";
import ThemeProvider from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scriptboard",
  description:
    "Scriptboard is a platform that allows you to run pre-configured shell scripts through user-friendly web-interface.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <AuthProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
