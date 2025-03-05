import React from 'react'
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Product {
    id: string
    name: string
    description: string
    price: number
    category: string
    image: string
    rating: number
    stock: number
    featured?: boolean
    discount?: number
  }

const products: Product[] = [
    {
        id: "1",
        name: "Premium Leather Jacket",
        description: "Handcrafted genuine leather jacket with premium stitching and comfortable fit.",
        price: 299.99,
        category: "Clothing",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
        rating: 4.8,
        stock: 15,
        featured: true,
      },
      {
        id: "2",
        name: "Wireless Noise-Cancelling Headphones",
        description: "Experience crystal clear audio with our premium noise-cancelling technology.",
        price: 199.99,
        category: "Electronics",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
        rating: 4.7,
        stock: 42,
        featured: true,
      },
      {
        id: "3",
        name: "Ergonomic Office Chair",
        description: "Designed for comfort during long work hours with adjustable lumbar support.",
        price: 249.99,
        category: "Furniture",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
        rating: 4.5,
        stock: 8,
      },
      {
        id: "4",
        name: "Organic Cotton T-Shirt",
        description: "Eco-friendly and soft cotton t-shirt, perfect for everyday wear.",
        price: 29.99,
        category: "Clothing",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
        rating: 4.3,
        stock: 120,
        discount: 15,
      },
      {
        id: "5",
        name: "Smart Fitness Watch",
        description: "Track your health metrics and stay connected with this waterproof smart watch.",
        price: 149.99,
        category: "Electronics",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
        rating: 4.6,
        stock: 35,
        featured: true,
      },
      {
        id: "6",
        name: "Stainless Steel Water Bottle",
        description: "Keep your drinks hot or cold for hours with this vacuum-insulated bottle.",
        price: 24.99,
        category: "Accessories",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
        rating: 4.4,
        stock: 67,
        discount: 10,
      },
      {
        id: "7",
        name: "Handmade Ceramic Mug Set",
        description: "Set of 4 artisan mugs, each uniquely crafted with premium glazed ceramic.",
        price: 39.99,
        category: "Home",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
        rating: 4.2,
        stock: 23,
      },
      {
        id: "8",
        name: "Vintage Denim Jeans",
        description: "Classic fit jeans with premium denim that gets better with age.",
        price: 79.99,
        category: "Clothing",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
        rating: 4.5,
        stock: 45,
        discount: 20,
      },
    ]
const ProductcArd = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.map((product) => (
    <Card className="overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          {product.featured && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          {product.discount && <Badge variant="destructive">-{product.discount}%</Badge>}
        </div>
        <Image
          src={product.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="icon" variant="secondary" className="rounded-full">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{product.category}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          {product.discount ? (
            <div className="flex items-center gap-2">
              <span className="font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{product.rating} ★</span>
        </div>
      </CardFooter>
    </Card>
    ))}
    </div>
  )
}

export default ProductcArd
