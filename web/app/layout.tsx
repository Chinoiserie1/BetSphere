import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Web3Modal } from "@/contexts/web3modal";
import { UserProvider } from "@/contexts/userContext";
import ReactQueryProvider from "@/contexts/reactQuery";
import { ThemeProvider } from "@/contexts/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "betSphere",
  description: "betSphere is a decentralized betting platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Web3Modal>
              {/* <UserProvider> */}
              {children}
              {/* </UserProvider> */}
            </Web3Modal>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
