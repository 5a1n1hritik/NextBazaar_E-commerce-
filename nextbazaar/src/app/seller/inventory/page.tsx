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
import { Badge } from "@/components/ui/badge";

const inventory = [
  { id: 1, name: "Product 1", sku: "SKU001", stock: 50, status: "In Stock" },
  { id: 2, name: "Product 2", sku: "SKU002", stock: 10, status: "Low Stock" },
  { id: 3, name: "Product 3", sku: "SKU003", stock: 0, status: "Out of Stock" },
  { id: 4, name: "Product 4", sku: "SKU004", stock: 100, status: "In Stock" },
  { id: 5, name: "Product 5", sku: "SKU005", stock: 25, status: "In Stock" },
];

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Inventory</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.status === "In Stock"
                      ? "default"
                      : item.status === "Low Stock"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Update Stock
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
