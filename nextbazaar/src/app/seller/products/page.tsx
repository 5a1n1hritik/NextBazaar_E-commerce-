"use client";

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

const products = [
  {
    id: 1,
    name: "Product 1",
    category: "Electronics",
    price: 99.99,
    stock: 50,
  },
  { id: 2, name: "Product 2", category: "Clothing", price: 49.99, stock: 100 },
  {
    id: 3,
    name: "Product 3",
    category: "Home & Garden",
    price: 149.99,
    stock: 25,
  },
  {
    id: 4,
    name: "Product 4",
    category: "Electronics",
    price: 199.99,
    stock: 30,
  },
  { id: 5, name: "Product 5", category: "Clothing", price: 79.99, stock: 75 },
];

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
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
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
