"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  ShoppingCart,
  User,
  Search,
  X,
  ShoppingBag,
  XCircle,
  Star,
  LogOut,
  Heart,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";
import { Badge } from "./ui/badge";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "My Order", href: "/order" },
    { name: "Sign Up", href: "/signup" },
  ];

  return (
    <>
      <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md z-50 dark:bg-gray-900 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
                aria-label="Open Menu"
              >
                <Menu className="h-6 w-6 dark:text-white" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] dark:bg-gray-800"
            >
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="hover:text-primary transition-colors dark:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link
            href="/"
            className="text-2xl font-bold items-center dark:text-white"
          >
            <span className=" font-bold sm:inline-block">NextBazaar</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="hover:text-primary transition-colors dark:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="View Wishlist"
              onClick={() => router.push("/wishlist")}
            >
              <Heart className="h-5 w-5 dark:text-white" />
            </Button>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                aria-label="View Cart"
                className="relative"
              >
                <ShoppingCart className="h-5 w-5 dark:text-white" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-orange-400 text-white text-xs rounded-full px-2">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle Theme">
                  <User className="h-5 w-5 dark:text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="dark:bg-gray-800 dark:text-white"
              >
                <DropdownMenuItem>
                  <User className="h-5 w-5" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShoppingBag className="h-5 w-5" />
                  My Order
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <XCircle className="h-5 w-5" />
                  My Cancellations
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="h-5 w-5" />
                  My Reviews
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="h-5 w-5" />
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="h-5 w-5" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="h-5 w-5" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="h-5 w-5" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
