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

const orders = [
  {
    id: 1,
    customer: "John Doe",
    date: "2023-05-01",
    status: "Completed",
    total: 99.99,
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2023-05-02",
    status: "Processing",
    total: 149.99,
  },
  {
    id: 3,
    customer: "Bob Johnson",
    date: "2023-05-02",
    status: "Processing",
    total: 149.99,
  },
  {
    id: 4,
    customer: "Bob Johnson",
    date: "2023-05-03",
    status: "Shipped",
    total: 79.99,
  },
  {
    id: 5,
    customer: "Alice Brown",
    date: "2023-05-04",
    status: "Pending",
    total: 199.99,
  },
  {
    id: 6,
    customer: "Charlie Wilson",
    date: "2023-05-05",
    status: "Completed",
    total: 59.99,
  },
];

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "Completed" ? "default" : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
