"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./Product-Card";
import { ArrowRight } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  stock: number;
  finalPrice?: number;
  category: { _id: string; name: string };
  images: string[];
  rating: number;
  featured: boolean;
}

const FeaturedProductsList = () => {
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
    <section className="container px-4 md:px-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight dark:text-white">
            Featured Products
          </h2>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary dark:text-white dark:hover:text-primary"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((product) => product.featured)
            .slice(0, 6)
            .map((product) => (
              <Link key={product._id} href={`/shop/${product._id}`}>
                <ProductCard key={product._id} product={product} />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsList;
