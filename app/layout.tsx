import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Components
import Providers from "@/components/Providers";
import Navabr from "@/components/Navabr";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kicks Ecommerce - Dashhboard",
  description: "This is the dashboard of an e-commerce application named Kicks",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="flex flex-col h-screen">
            {session?.user && <Navabr />}
            <div className="flex-1">{children}</div>
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
