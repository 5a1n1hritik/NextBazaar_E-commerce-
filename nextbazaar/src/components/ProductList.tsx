"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
// import ProductCard from "./ProductCard";
import ProductCard from "./Product-Card";

interface Product {
  _id: string;
  name: string;
  image: string[];
  description: string;
  price: number;
  offerPrice?: number;
  stock: number;
  category: string;
  rating: number;
}

const ProductList = () => {
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
      <div className="flex flex-col items-center pt-14">
        <p className="text-2xl font-medium text-left w-full">
          Popular Products
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <Link href={"/"}>
          <Button className="mt-4" variant="outline" size="lg">
            see more
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ProductList;
