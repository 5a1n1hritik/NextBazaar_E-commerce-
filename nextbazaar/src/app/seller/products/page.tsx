"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import ProductForm from "@/components/ProductForm";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  category: string;
  offerPrice?: number;
  rating?: number;
  numReviews?: number;
  countInStock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        console.log("API Response:", data);

        if (data?.success && Array.isArray(data?.products)) {
          setProducts(data.products);
          console.log(data.products);
        } else {
          setError("Failed to fetch products" + data.message);
          console.log("Failed to fetch products", data.message);
        }
      } catch (error) {
        setError("Failed to fetch products" + (error as any).message);
        console.log("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchproducts();
  }, []);

  const handleAddProduct = async (newProduct: Omit<Product, "_id">) => {
    try {
      const response = await axios.post("/api/products", newProduct);
      console.log("Add Product Response:", response.data);

      if (response.status === 201 && response.data.success) {
        setProducts((prev) => [...prev, response.data.newProduct]);
        setOpen(false);
      } else {
        setError(response.data.message || "Failed to add product.");
      }
    } catch (error: any) {
      console.log("Error Creating Product:", error);
      setError(
        error.response?.data?.message || "Failed to add products. try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (open) {
    return (
      <ProductForm
        onSubmit={handleAddProduct}
        onCancel={() => setOpen(false)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={product?._id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product?.name || "No Name"}</TableCell>
                  <TableCell>
                    {product?.category || "No Category"}
                  </TableCell>
                  <TableCell>${product?.price?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell>{product?.countInStock || 0}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
