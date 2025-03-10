"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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
import ProductCard from "@/components/Product-Card";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, X } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  finalPrice?: number;
  category: { _id: string; name: string };
  image: string[];
  rating: number;
  featured: boolean;
}

const page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [categories, setCategories] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const allCategories = [
    ...new Set(products.map((product) => product.category.name)),
  ];
  const minPrice = products.length
    ? Math.min(...products.map((p) => p.finalPrice || p.price))
    : 0;
  const maxPrice = products.length
    ? Math.max(...products.map((p) => p.finalPrice || p.price))
    : 10000;

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

  useEffect(() => {
    let filteredProducts = [...products];

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category && categories.includes(product.category.name)
      );
    }

    if (ratings.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const rating = Math.floor(product.rating);
        return ratings.includes(rating);
      });
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        (product.finalPrice ?? product.price) >= priceRange[0] &&
        (product.finalPrice ?? product.price) <= priceRange[1]
    );

    switch (sortOption) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      // case "newest":
      //   filteredProducts.sort(
      //     (a, b) => Number.parseInt(b._id) - Number.parseInt(a._id)
      //   );
      //   break;
      default: 
        filteredProducts = filteredProducts
          .filter((product) => product.featured)
          .concat(filteredProducts.filter((product) => !product.featured));
    }

    setFilteredProducts(filteredProducts);

    let filterCount = 0;
    if (searchQuery) filterCount++;
    if (categories.length > 0) filterCount++;
    if (ratings.length > 0) filterCount++;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) filterCount++;
    setActiveFilters(filterCount);
  }, [searchQuery, categories, ratings, priceRange, sortOption]);

  const handleCategoryToggle = (categoryName: string) => {
    setCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleRatingToggle = (rating: number) => {
    setRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setCategories([]);
    setRatings([]);
    setPriceRange([0, maxPrice]);
    setSortOption("featured");
  };

  const FilterDrawer = () => (
    <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter Products</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 py-2 space-y-6">
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {allCategories.map((categoryName) => (
                <div key={categoryName} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-category-${categoryName}`}
                    checked={categories.includes(categoryName)}
                    onCheckedChange={() => handleCategoryToggle(categoryName)}
                  />
                  <Label htmlFor={`mobile-category-${categoryName}`}>
                    {categoryName}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="space-y-4">
              <Slider
                defaultValue={priceRange}
                min={minPrice}
                max={maxPrice}
                step={10}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-rating-${rating}`}
                    checked={ratings.includes(rating)}
                    onCheckedChange={() => handleRatingToggle(rating)}
                  />
                  <Label htmlFor={`mobile-rating-${rating}`}>
                    {rating}★ & above
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button variant="outline" className="w-full" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

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

          <div className="md:hidden space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-4 w-4" />
                {activeFilters > 0 && (
                  <Badge
                    variant="secondary"
                    className="h-5 w-5 p-0 flex items-center justify-center"
                  >
                    {activeFilters}
                  </Badge>
                )}
              </Button>
            </div>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                {/* <SelectItem value="newest">Newest First</SelectItem> */}
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            <div className="hidden md:block space-y-6">
              <div>
                <h3 className="font-medium mb-2">Search</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Accordion type="single" collapsible defaultValue="category">
                <AccordionItem value="category">
                  <AccordionTrigger className="text-base">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {allCategories.map((categoryName) => (
                        <div
                          key={categoryName}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${categoryName}`}
                            checked={categories.includes(categoryName)}
                            onCheckedChange={() =>
                              handleCategoryToggle(categoryName)
                            }
                          />
                          <Label htmlFor={`category-${categoryName}`}>
                            {categoryName}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base">
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={priceRange}
                        max={maxPrice}
                        step={10}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rating">
                  <AccordionTrigger className="text-base">
                    Rating
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <div
                          key={rating}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={ratings.includes(rating)}
                            onCheckedChange={() => handleRatingToggle(rating)}
                          />
                          <Label htmlFor={`rating-${rating}`}>
                            {rating}★ & above
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="hidden md:flex md:items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing <strong>{products.length}</strong> products
                </p>
                <div className="flex items-center gap-2">
                  <Select value={sortOption} onValueChange={setSortOption}>
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
                      {/* <SelectItem value="newest">Newest First</SelectItem> */}
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="flex items-center gap-1">
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
                </div> */}
              </div>

              {activeFilters > 0 && (
                <div className="flex flex-wrap gap-2 pb-2">
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Search: {searchQuery}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSearchQuery("")}
                      />
                    </Badge>
                  )}
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {category}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleCategoryToggle(category)}
                      />
                    </Badge>
                  ))}
                  {ratings.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Rating: {Math.min(...ratings)}★+
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setRatings([])}
                      />
                    </Badge>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Price: ${priceRange[0]} - ${priceRange[1]}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setPriceRange([0, maxPrice])}
                      />
                    </Badge>
                  )}
                </div>
              )}

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Link key={product._id} href={`/shop/${product._id}`}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-lg font-medium mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={resetFilters}>Reset All Filters</Button>
                </div>
              )}

              {filteredProducts.length > 0 && filteredProducts.length < filteredProducts.length && (
                <div className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <FilterDrawer />
      </div>
    </>
  );
};

export default page;
