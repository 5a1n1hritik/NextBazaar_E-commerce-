"use client";

import type React from "react";
import Link from "next/link";
import {
  BarChart3,
  Box,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Tag,
  Users,
  Menu,
  Bell,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

const navItems = [
  { name: "Dashboard", href: "/seller", icon: LayoutDashboard },
  { name: "Products", href: "/seller/products", icon: Package },
  { name: "Categories", href: "/seller/categories", icon: Tag },
  { name: "Orders", href: "/seller/orders", icon: ShoppingBag },
  { name: "Customers", href: "/seller/users", icon: Users },
  { name: "Payments", href: "/seller/Payments", icon: CreditCard },
  { name: "Reviews", href: "/seller/Reviews", icon: FileText },
  { name: "Coupons", href: "/seller/Coupons", icon: Box },
  { name: "Reports", href: "/seller/Reports", icon: BarChart3 },
  { name: "Settings", href: "/seller/Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const admin = "Admin User"; // Replace with actual admin name

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/seller"
            className="flex items-center gap-2 font-semibold"
          >
            <ShoppingBag className="h-6 w-6" />
            <h2>
              <span className="text-xl text-orange-400">NextB</span>azaar
            </h2>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4 px-2">
          <div className="space-y-1">
            {navItems.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                      : "hover:bg-gray-200/90 border-white"
                  }`}
                >
                  <route.icon className="h-4 w-4" />
                  {route.name}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={`https://avatar.vercel.sh/${getInitials(admin)}`}
                alt={admin}
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">
                admin@styleshop.com
              </span>
            </div>
            <Link href="/seller/logout" className="ml-auto">
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu for accessing different sections of the admin panel.
          </SheetDescription>
          <div className="flex h-14 items-center border-b px-4">
            <Link
              href="/seller"
              className="flex items-center gap-2 font-semibold"
            >
              <ShoppingBag className="h-6 w-6" />
              <h2>
                <span className="text-lg text-orange-400">NextB</span>azaar
              </h2>
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
          <nav className="flex-1 overflow-auto py-4 px-2">
            <div className="space-y-1">
              {navItems.map((route) => {
                const isActive = pathname === route.href;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                        : "hover:bg-gray-200/90 border-white"
                    }`}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.name}
                  </Link>
                );
              })}
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar>
              <AvatarImage
                src={`https://avatar.vercel.sh/${getInitials(admin)}`}
                alt={admin}
              />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">
                  admin@styleshop.com
                </span>
              </div>
              <Link href="/seller/logout" className="ml-auto">
                <Button variant="ghost" size="icon">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Log out</span>
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex-1" />
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/seller/profile" className="flex w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/seller/settings" className="flex w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/seller/logout" className="flex w-full">
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
