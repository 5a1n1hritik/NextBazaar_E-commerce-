"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductProvider } from "@/context/ProductsContext";

export const metadata: Metadata = {
  title: "NextBazaar",
  description: "Showcasing my e-commerce products",
};

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = pathname.startsWith("/seller");

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          {!isAdmin && <Navbar />}
          <main>{children}</main>
          {!isAdmin && <Footer />}
        </WishlistProvider>
      </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}
