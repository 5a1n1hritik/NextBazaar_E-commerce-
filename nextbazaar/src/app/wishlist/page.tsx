"use client";

import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: Array.isArray(item.image) ? item.image[0] : item.image,
      quantity: 1,
    });
    setAddedToCart(item.id);
    toast({ title: "Added to cart!" });
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      {wishlist.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wishlist.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  {item.inStock > 0 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock || addedToCart === item.id}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {addedToCart === item.id ? "Added" : "Add to Cart"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        removeFromWishlist(item.id);
                        toast({ title: "removed from wishlist." });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl mb-4">Your wishlist is empty</p>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
