"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  offerPrice?: number;
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
      {/* <div>
      <h2 className="text-2xl items-center">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div> */}

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
