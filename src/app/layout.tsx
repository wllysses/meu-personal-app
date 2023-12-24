import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextAuthProvider } from "@/providers/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Meu Personal",
  description: "Transformando Metas em Conquistas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <ToastContainer
          autoClose={1500}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>{children}</NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
