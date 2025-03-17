"use client";

import * as React from "react";
import { useState, useContext } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import Image from "next/image";
import { Heart, ShoppingCart} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  finalPrice?: number;
  stock: number;
  category: { _id: string; name: string };
  images: string[];
  rating: number;
  featured: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const wishlistContext = useContext(WishlistContext);
  if (!wishlistContext) return null;

  const { wishlist, addToWishlist, removeFromWishlist } = wishlistContext;
  const isInWishlist = wishlist.some((item) => item.id === product._id);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: Array.isArray(item.image) ? item.image[0] : item.image,
      quantity: 1,
    });

    setAddedToCart(item.id);
    toast.success(`${item.name} added to cart!`);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    isInWishlist
      ? removeFromWishlist(product._id)
      : addToWishlist({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          inStock: product.stock,
        });
  };

  return (
    <>
      <Card
        className="overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute top-2 right-2 z-10 flex gap-1">
            {product.featured && (
              <Badge
                variant="secondary"
                className="bg-primary text-primary-foreground dark:text-white"
              >
                Featured
              </Badge>
            )}
            {product.discount && (
              <Badge variant="destructive">-{product.discount}%</Badge>
            )}
          </div>

          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              hovered ? "scale-110" : "scale-100"
            }`}
          />

          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full"
              onClick={(e) => handleAddToCart(e, product)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
            <Button
              size="icon"
              variant={isInWishlist ? "default" : "outline"}
              className={`rounded-full ${
                isInWishlist ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={(e) => handleToggleWishlist(e, product)}
            >
              <Heart
                className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`}
              />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
        </div>

        <CardContent className="p-4 flex-grow">
          <div className="space-y-1">
            <h3 className="font-medium truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {product.category.name}
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div>
            {product.discount ? (
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{product.rating} ⭐</span>
          </div>
        </CardFooter>

        <div
          className={`px-4 pb-4 transition-all duration-300 ${
            hovered ? "h-auto opacity-100" : "h-0 opacity-0"
          } md:hidden`}
        >
          <Button
            className="w-full"
            size="sm"
            onClick={(e) => handleAddToCart(e, product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
