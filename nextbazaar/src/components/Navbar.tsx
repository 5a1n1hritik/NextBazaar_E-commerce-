"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, User, Search, X } from "lucide-react";
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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
                aria-label="Open Menu"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="text-2xl font-bold items-center">
            <span className=" font-bold sm:inline-block">NextBazaar</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <button
                className="md:hidden text-gray-500"
                onClick={() => setShowSearch(true)}
              >
                <Search className="w-6 h-6" />
              </button>

              {showSearch && (
                <div className="fixed mt-32 inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white w-8/12 max-w-sm p-4 rounded-lg shadow-lg relative">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                      autoFocus
                    />
                    <Button
                      className="absolute mt-12 ml-36 text-gray-900 hover:text-gray-700 rounded-full bg-white"
                      onClick={() => setShowSearch(false)}
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="hidden w-full max-w-sm items-center md:flex">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full md:w-[300px]"
                />
              </div>
            </div>

            <Button variant="ghost" size="icon" aria-label="View Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle Theme">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
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
