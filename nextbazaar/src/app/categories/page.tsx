"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


interface Categories {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  productCount: number;
}


const Page = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        } else {
          console.log("Failed to fetch categories", data.message);
          setError("Failed to fetch categories" + data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id
              .replace(/ & /g, "-")
              .replace(/\s+/g, "-")}`}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">
                    {category.icon || "❓"}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <p className="text-muted-foreground mb-4">
                  {category.productCount} Products
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
