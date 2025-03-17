"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

const CategoryList = () => {
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
    <section className="container px-4 md:px-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight dark:text-white">
            Shop by Category
          </h2>
          <Link
            href="/categories"
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary dark:text-white dark:hover:text-primary"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.slice(0, 5).map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id
                .replace(/ & /g, "-")
                .replace(/\s+/g, "-")}`}
            >
              <Card className="overflow-hidden h-full transition-colors hover:border-primary">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-2xl">{category.icon || "❓"}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {category.productCount} items
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
