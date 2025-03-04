"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, StarHalf } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  _id: string;
  name: string;
  image: string[];
  description: string;
  price: number;
  offerPrice?: number;
  category: string;
  rating: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full cursor-pointer"
      >
        <Card>
          <div className="relative bg-gray-100 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
            <Image
              src={
                product?.image?.[0] ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"
              }
              alt={product?.name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              width={800}
              height={800}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={handleWishlist}
              className="absolute top-2 right-2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition"
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </Button>
          </div>

          <CardContent className="p-4">
            <p className="text-lg mb-1 font-semibold truncate">
              {product.name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
              {product.description}
            </p>

            <div className="flex items-center gap-1 mb-2">
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
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                ({product.rating})
              </span>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between p-3">
            <div className="flex items-center">
              <span className="text-lg font-bold mr-2">
                ${product.offerPrice?.toFixed(2) || product.price.toFixed(2)}
              </span>
              {product.offerPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <Button size="sm" variant="outline">
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
};

export default ProductCard;
