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
  image: string;
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
    // Here you would typically call an API to update the wishlist
  };
  return (
    <>
      {/* <motion.div className="flex flex-col items-start gap-1 max-w-[200px] w-full cursor-pointer">
        <Card>
        <div className="cursor-pointer group relative bg-gray-100 rounded-lg w-full h-52 flex items-center justify-center group overflow-hidden">
          <Image
            src={
              product.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"
            }
            alt="products"
            className="group-hover:scale-105 transition object-cover w-full h-full"
            width={800}
            height={800}
          />
          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
            <Heart size={15} className="text-gray-600" />
          </button>
          
        <CardContent>
        <p className="md:text-base text-base font-medium pt-2 w-full truncate">
          {product.name}
        </p>
        <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-xs"> {product.rating}</p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: product.rating }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-orange-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0l2.45 6.29H18l-5 4.82 1.82 6.29L10 15.38 5.73 17.4 7.55 11.1 2 6.29h5.55z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between w-full mt-1">
          <p className="text-base font-medium">{product.price}</p>
          <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
            Buy now
          </button>
        </div>
      </CardContent>
      </div>
      </Card>
      </motion.div> */}

      <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full cursor-pointer"
    >
      <Card>
        <div className="relative bg-gray-100 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
          <Image
            src={
              product.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"
            }
            alt={product.name}
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
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>

        <CardContent className="p-4">
          <p className="text-lg mb-1 font-semibold truncate">{product.name}</p>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>

          <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, index) => {
              const starValue = index + 1
              if (starValue <= Math.floor(product.rating)) {
                return <Star key={index} className="w-4 h-4 fill-orange-500 text-orange-500" />
              } else if (starValue - 0.5 <= product.rating) {
                return <StarHalf key={index} className="w-4 h-4 fill-orange-500 text-orange-500" />
              } else {
                return <Star key={index} className="w-4 h-4 text-gray-300" />
              }
            })}
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">({product.rating})</span>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-3">
        <div className="flex items-center">
            <span className="text-lg font-bold mr-2">${product.offerPrice?.toFixed(2) || product.price.toFixed(2)}</span>
            {product.offerPrice && (
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            )}
          </div>
          <Button size="sm" variant="outline" >
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
      
    </>
  );
};

export default ProductCard;
