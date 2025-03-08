"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  finalPrice?: number;
  category: { _id: string; name: string };
  image: string[];
  rating: number;
  featured: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          {product.featured && (
            <Badge
              variant="secondary"
              className="bg-primary text-primary-foreground "
            >
              Featured
            </Badge>
          )}
          {product.discount && (
            <Badge variant="destructive">-{product.discount}%</Badge>
          )}
        </div>
        <Image
          src={
            product.image?.[0] ||
            "https://png.pngtree.com/thumb_back/fh260/background/20230605/pngtree-big-ben-in-london-uk-photo-image_2833914.jpg"
          }
          alt={product.name}
          width={500}
          height={800}
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onClick={() => router.push("/wishlist")}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onClick={() => router.push("/wishlist")}
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {product.description}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {product.category.name}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          {product.discount ? (
            <div className="flex items-center gap-1">
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
          <div className="hidden lg:flex items-center">
            <span className="mr-1">{product.rating}</span>
            {Array.from({ length: 5 }).map((_, index) => {
              const starValue = index + 1;
              if (starValue <= Math.floor(product.rating)) {
                return (
                  <Star
                    key={index}
                    className="w-4 h-4 fill-orange-500 text-orange-500"
                  />
                );
              } else if (starValue - 0.5 <= product.rating) {
                return (
                  <StarHalf
                    key={index}
                    className="w-4 h-4 fill-orange-500 text-orange-500"
                  />
                );
              } else {
                return <Star key={index} className="w-4 h-4 text-gray-300" />;
              }
            })}
          </div>

          <span className="lg:hidden text-sm">{product.rating} ⭐</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
