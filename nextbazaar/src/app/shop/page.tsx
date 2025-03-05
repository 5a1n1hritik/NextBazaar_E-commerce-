"use client";

import * as React from "react";
import { useState, useEffect } from "react";
// import ProductcArd from "@/components/Product-Card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductCard from "@/components/ProductCard";

interface Product {
  _id: string;
  name: string;
  image: string[];
  description: string;
  price: number;
  offerPrice?: number;
  category: string;
  rating: number;
}

const page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          console.log("Failed to fetch products", data.message);
          setError("Failed to fetch products" + data.message);
        }
      } catch (error) {
        console.log("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchproducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
            <p className="text-muted-foreground">
              Browse our collection of products
            </p>
          </div>

          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Search</h3>
                <div className="relative">
                  <Input placeholder="Search products..." />
                </div>
              </div>

              <Accordion type="single" collapsible defaultValue="category">
                <AccordionItem value="category">
                  <AccordionTrigger className="text-base">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-clothing" />
                        <Label htmlFor="category-clothing">Clothing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-electronics" />
                        <Label htmlFor="category-electronics">
                          Electronics
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-furniture" />
                        <Label htmlFor="category-furniture">Furniture</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-accessories" />
                        <Label htmlFor="category-accessories">
                          Accessories
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-home" />
                        <Label htmlFor="category-home">Home</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base">
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="price-min">Min</Label>
                          <Input id="price-min" type="number" placeholder="0" />
                        </div>
                        <div>
                          <Label htmlFor="price-max">Max</Label>
                          <Input
                            id="price-max"
                            type="number"
                            placeholder="1000"
                          />
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        Apply
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rating">
                  <AccordionTrigger className="text-base">
                    Rating
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rating-4" />
                        <Label htmlFor="rating-4">4★ & above</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rating-3" />
                        <Label htmlFor="rating-3">3★ & above</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rating-2" />
                        <Label htmlFor="rating-2">2★ & above</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div>
                <Button variant="outline" size="sm" className="w-full">
                  Reset Filters
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing <strong>{products.length}</strong> products
                </p>
                <div className="flex items-center gap-2">
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <span className="sr-only">Grid view</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <rect width="7" height="7" x="3" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="14" rx="1" />
                        <rect width="7" height="7" x="3" y="14" rx="1" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <span className="sr-only">List view</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <line x1="8" x2="21" y1="6" y2="6" />
                        <line x1="8" x2="21" y1="12" y2="12" />
                        <line x1="8" x2="21" y1="18" y2="18" />
                        <line x1="3" x2="3" y1="6" y2="6" />
                        <line x1="3" x2="3" y1="12" y2="12" />
                        <line x1="3" x2="3" y1="18" y2="18" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link key={product._id} href={`/shop/${product._id}`}>
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
