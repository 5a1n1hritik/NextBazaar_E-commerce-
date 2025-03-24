"use client";

import { useRef, useState } from "react";
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
  Home,
  Tag,
  UserPlus,
  StoreIcon,
  BaggageClaim,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";
import { Badge } from "./ui/badge";
import { usePathname } from "next/navigation";
import { useMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useProducts } from "@/context/ProductsContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isAdmin = true;
  const pathname = usePathname();
  const isMobile = useMobile();
  const { toast } = useToast();
  const searchResultsRef = useRef<HTMLDivElement | null>(null);
  const { products = [] } = useProducts();
  const admin = "User"; // Replace with actual admin name

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: ShoppingCart },
    { name: "Categories", href: "/categories", icon: Tag },
    { name: "My Order", href: "/orders", icon: BaggageClaim },
    { name: "Sign Up", href: "/signup", icon: UserPlus },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const searchResults = Array.isArray(products)
    ? products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useClickOutside(searchResultsRef, () => {
    setShowResults(false);
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(false);
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md z-50 dark:bg-gray-900 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
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
                <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu for accessing different sections of the admin
                  panel.
                </SheetDescription>
                <div className="px-2 py-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between h-10 px-4">
                    <Link
                      href="/"
                      className="flex text-2xl font-bold items-center dark:text-white space-x-2"
                    >
                      <ShoppingBag className="h-6 w-6" />
                      <h1 className="text-2xl font-bold  sm:inline-block ">
                        <span className="text-primary">NextB</span>
                        azaar
                      </h1>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setSearchQuery("")}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Clear</span>
                        </Button>
                      )}
                    </div>
                  </form>

                  <nav className="flex flex-col space-y-2">
                    {menuItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                              : "hover:bg-gray-200/90 border-white"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="border-t p-4 mt-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${getInitials(admin)}`}
                          alt={admin}
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">User</span>
                        <span className="text-xs text-muted-foreground">
                          user@styleshop.com
                        </span>
                      </div>
                      <Link href="/" className="ml-auto">
                        <Button variant="ghost" size="icon">
                          <LogOut className="h-4 w-4" />
                          <span className="sr-only">Log out</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <Link
            href="/"
            className="flex text-2xl font-bold items-center dark:text-white space-x-2"
          >
            <ShoppingBag className="h-6 w-6" />
            <h1 className="text-2xl font-bold  sm:inline-block ">
              <span className="text-primary">NextB</span>
              azaar
            </h1>
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
            {isAdmin && (
              <Button
                variant="outline"
                onClick={() => router.push("/seller")}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm md:text-base font-medium hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-all"
              >
                <StoreIcon className="h-5 w-5 md:h-6 md:w-6" />
                <span className="hidden sm:inline">Seller Dashboard</span>
              </Button>
            )}

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
                {/* <DropdownMenuItem onClick={() => setTheme("light")}>
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
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
