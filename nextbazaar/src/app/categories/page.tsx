"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categoryIcons: Record<string, string> = {
  Clothing: "👕",
  Electronics: "🎧",
  Furniture: "🪑",
  Accessories: "👜",
  Home: "🏠",
  "Kitchen & Dining": "🍽️",
  "Home Decor": "🖼️",
  "Bedding & Mattresses": "🛏️",
  "Men's Clothing": "👔",
  "Women's Clothing": "👗",
  "Kids' Clothing": "👕",
  "Shoes & Footwear": "👞",
  "Bags & Accessories": "🎒",
  Sunglasses: "🕶️",
  Jewelry: "💍",
  Watches: "⌚",
  "Belts & Wallets": "👛",
  "Mobile Phones": "📱",
  "Laptops & Computers": "💻",
  Smartwatches: "⌚",
  "Headphones & Earbuds": "🎧",
  "Cameras & Photography": "📸",
  "Gaming Consoles": "🎮",
  "Gym Equipment": "🏋️",
  Sportswear: "👕",
  Supplements: "💊",
  "Makeup & Cosmetics": "💄",
  Skincare: "🧴",
  Haircare: "💇",
  "Baby Clothing": "👶",
  "Toys & Games": "🧸",
  "School Supplies": "📚",
  "Car Accessories": "🚗",
  "Motorcycle Accessories": "🏍️",
  "Spare Parts": "🛠️",
  "Educational Books": "📑",
  "Office Supplies": "✏️",
  "Musical Instruments": "🎸",
  "Art & Crafts": "🎨",
};

// Category Data
const categories = [
  { id: "1", name: "Clothing", count: 3 },
  { id: "2", name: "Electronics", count: 2 },
  { id: "3", name: "Furniture", count: 1 },
  { id: "4", name: "Accessories", count: 1 },
  { id: "5", name: "Home", count: 1 },
  { id: "6", name: "Kitchen & Dining", count: 1 },
  { id: "7", name: "Home Decor", count: 1 },
  { id: "8", name: "Bedding & Mattresses", count: 1 },
  { id: "9", name: "Men's Clothing", count: 1 },
  { id: "10", name: "Women's Clothing", count: 1 },
  { id: "11", name: "Kids' Clothing", count: 1 },
  { id: "12", name: "Shoes & Footwear", count: 1 },
  { id: "13", name: "Bags & Accessories", count: 1 },
  { id: "14", name: "Sunglasses", count: 1 },
  { id: "15", name: "Jewelry", count: 1 },
  { id: "16", name: "Watches", count: 1 },
  { id: "17", name: "Belts & Wallets", count: 1 },
  { id: "18", name: "Mobile Phones", count: 1 },
  { id: "19", name: "Laptops & Computers", count: 1 },
  { id: "20", name: "Smartwatches", count: 1 },
  { id: "21", name: "Headphones & Earbuds", count: 1 },
  { id: "22", name: "Cameras & Photography", count: 1 },
  { id: "23", name: "Gaming Consoles", count: 1 },
  { id: "24", name: "Gym Equipment", count: 1 },
  { id: "25", name: "Sportswear", count: 1 },
  { id: "26", name: "Supplements", count: 1 },
  { id: "27", name: "Makeup & Cosmetics", count: 1 },
  { id: "28", name: "Skincare", count: 1 },
  { id: "29", name: "Haircare", count: 1 },
  { id: "30", name: "Baby Clothing", count: 1 },
  { id: "31", name: "Toys & Games", count: 1 },
  { id: "32", name: "School Supplies", count: 1 },
  { id: "33", name: "Car Accessories", count: 1 },
  { id: "34", name: "Motorcycle Accessories", count: 1 },
  { id: "35", name: "Spare Parts", count: 1 },
  { id: "36", name: "Educational Books", count: 1 },
  { id: "37", name: "Musical Instruments", count: 1 },
  { id: "38", name: "Art & Crafts", count: 1 },
];

const Page = () => {
  return (
    <div className="container px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/user/categories/${category.name
              .toLowerCase()
              .replace(/ & /g, "-")
              .replace(/\s+/g, "-")}`}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">
                    {categoryIcons[category.name] || "❓"}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <p className="text-muted-foreground mb-4">
                  {category.count} Products
                </p>
                <Button variant="outline" className="w-full">
                  View Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
