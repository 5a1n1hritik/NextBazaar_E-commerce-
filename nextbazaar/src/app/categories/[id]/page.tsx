"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/Product-Card";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  finalPrice: number;
  images: string[];
  stock: number;
  rating: number;
  featured: boolean;
  category: { _id: string; name: string };
}

interface CategoryData {
  success: boolean;
  category: {
    _id: string;
    name: string;
    icon: string;
  };
  productCount: number;
  products: Product[];
}

const page = () => {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const maxPrice =
    filteredProducts.length > 0
      ? Math.max(...filteredProducts.map((p) => p.finalPrice))
      : 10000;

  const productFeatures = [
    ...new Set(
      filteredProducts.map((p) => (p.featured ? "Featured" : "Standard"))
    ),
  ];
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    if (!id) {
      console.log("Failed to fetch category");
      return;
    }

    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`/api/categories/${id}`);
        const data = await response.json();
        if (data.success) {
          setCategoryData(data);
          setFilteredProducts(data.products);
          console.log("Category related products:", data.products);
        } else {
          console.error("Failed to load category data.");
        }
      } catch (error) {
        console.error("Error Fetching Catefory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  useEffect(() => {
    if (!categoryData) return;

    let filtered = [...categoryData.products];

    filtered = filtered.filter(
      (p) => p.finalPrice >= priceRange[0] && p.finalPrice <= priceRange[1]
    );

    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(
        (p) =>
          (selectedFeatures.includes("Featured") && p.featured) ||
          (selectedFeatures.includes("Standard") && !p.featured)
      );
    }

    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) =>
          b.featured === a.featured ? 0 : b.featured ? 1 : -1
        );
    }

    setFilteredProducts(filtered);
  }, [categoryData, sortOption, priceRange, selectedFeatures]);

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  if (loading) return <p>Loading...</p>;
  if (!categoryData?.success) return <p>Category not found</p>;
  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="relative overflow-hidden rounded-lg mb-8">
          <div className="h-48 md:h-64 lg:h-80 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center">
            <div className="container px-4 md:px-6 relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold">
                {categoryData.category.name}
              </h1>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Link href="/">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link href="/categories">Categories</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span>{categoryData.category.name}</span>
              </div>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt={categoryData.category.name}
            fill
            className="object-cover -z-10 opacity-15"
          />
        </div>

        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="text-sm">
            <span className="text-muted-foreground">Showing: </span>
            <span className="font-medium">
              {filteredProducts.length} products
            </span>
          </div>
          <div className="flex gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-8">
          <div className="hidden md:block space-y-8">
            <div>
              <h3 className="font-medium mb-4">Filters</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <Slider
                    defaultValue={priceRange}
                    max={maxPrice}
                    step={10}
                    onValueChange={(value) =>
                      setPriceRange([value[0], value[1]])
                    }
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Features</h4>
                  <div className="space-y-2">
                    {productFeatures.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`feature-${feature}`}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="hidden md:flex items-center justify-between mb-6">
              <div className="text-sm">
                <span className="text-muted-foreground">Showing: </span>
                <span className="font-medium">
                  {filteredProducts.length} products
                </span>
              </div>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product._id} href={`/shop/${product._id}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filter criteria
                </p>
              </div>
            )}
          </div>
        </div>

        <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filter Products</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 py-2 space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Price Range</h4>
                <Slider
                  defaultValue={priceRange}
                  max={maxPrice}
                  step={10}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Features</h4>
                <div className="space-y-2">
                  {productFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-feature-${feature}`}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={() => handleFeatureToggle(feature)}
                      />
                      <Label htmlFor={`mobile-feature-${feature}`}>
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange([0, maxPrice]);
                  setSelectedFeatures([]);
                }}
              >
                Reset Filters
              </Button>
              <Button onClick={() => setIsFilterOpen(false)}>
                Apply Filters
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default page;
