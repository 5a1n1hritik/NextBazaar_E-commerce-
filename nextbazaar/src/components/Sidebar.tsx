"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Folder,
  Archive,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/seller", icon: Home },
  { name: "Products", href: "/seller/products", icon: Package },
  { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
  { name: "Users", href: "/seller/users", icon: Users },
  { name: "Categories", href: "/seller/categories", icon: Folder },
  { name: "Inventory", href: "/seller/inventory", icon: Archive },
];

const Sidebar = () => {
  return (
    <div className="bg-white dark:bg-black w-64 h-full shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-100  hover:bg-gray-100 dark:hover:text-gray-800 transition-colors"
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
