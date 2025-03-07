"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// import { products, categories } from "@/components/data/products"
// import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HomeHeaderSlider from "./HomeHeaderSlider";
import ProductList from "./ProductList";
import ProductcArd from "./Product-Card";
import assets from "@/assets";

const categories = [
  { id: "1", name: "Clothing", count: 3 },
  { id: "2", name: "Electronics", count: 2 },
  { id: "3", name: "Furniture", count: 1 },
  { id: "4", name: "Accessories", count: 1 },
  { id: "5", name: "Home", count: 1 },
];

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  featured?: boolean;
  discount?: number;
}

// const products: Product[] = [
//   {
//     id: "1",
//     name: "Premium Leather Jacket",
//     description:
//       "Handcrafted genuine leather jacket with premium stitching and comfortable fit.",
//     price: 299.99,
//     category: "Clothing",
//     image: "/placeholder.svg?height=400&width=300",
//     rating: 4.8,
//     stock: 15,
//     featured: true,
//   },
//   {
//     id: "2",
//     name: "Wireless Noise-Cancelling Headphones",
//     description:
//       "Experience crystal clear audio with our premium noise-cancelling technology.",
//     price: 199.99,
//     category: "Electronics",
//     image: "/placeholder.svg?height=400&width=300",
//     rating: 4.7,
//     stock: 42,
//     featured: true,
//   },
//   {
//     id: "3",
//     name: "Ergonomic Office Chair",
//     description:
//       "Designed for comfort during long work hours with adjustable lumbar support.",
//     price: 249.99,
//     category: "Furniture",
//     image: "/placeholder.svg?height=400&width=300",
//     rating: 4.5,
//     stock: 8,
//   },
//   {
//     id: "4",
//     name: "Organic Cotton T-Shirt",
//     description:
//       "Eco-friendly and soft cotton t-shirt, perfect for everyday wear.",
//     price: 29.99,
//     category: "Clothing",
//     image: "/placeholder.svg?height=400&width=300",
//     rating: 4.3,
//     stock: 120,
//     discount: 15,
//   },
//   {
//     id: "5",
//     name: "Smart Fitness Watch",
//     description:
//       "Track your health metrics and stay connected with this waterproof smart watch.",
//     price: 149.99,
//     category: "Electronics",
//     image: "/placeholder.svg?height=400&width=300",
//     rating: 4.6,
//     stock: 35,
//     featured: true,
//   },
//   {
//     id: "6",
//     name: "Stainless Steel Water Bottle",
//     description:
//       "Keep your drinks hot or cold for hours with this vacuum-insulated bottle.",
//     price: 24.99,
//     category: "Accessories",
//     image: "/placeholder.svg?height=400&width=300",
//     rating: 4.4,
//     stock: 67,
//     discount: 10,
//   },
//   {
//     id: "7",
//     name: "Handmade Ceramic Mug Set",
//     description:
//       "Set of 4 artisan mugs, each uniquely crafted with premium glazed ceramic.",
//     price: 39.99,
//     category: "Home",
//     image: "/placeholder.svg?height=400&width=300",
//     rating: 4.2,
//     stock: 23,
//   },
//   {
//     id: "8",
//     name: "Vintage Denim Jeans",
//     description:
//       "Classic fit jeans with premium denim that gets better with age.",
//     price: 79.99,
//     category: "Clothing",
//     image: "/placeholder.svg?height=400&width=300",
//     rating: 4.5,
//     stock: 45,
//     discount: 20,
//   },
// ];

const HomeSection = () => {
  // const featuredProducts = products.filter((product) => product.featured);

  return (
    <>

      <div className="flex flex-col gap-10 py-8">
      <HomeHeaderSlider />
        {/* Hero Section */}
        {/* <section className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-lg">
          <div className="bg-muted/50 relative flex flex-col items-start gap-4 p-8 md:p-12 lg:py-24">
            <div className="grid gap-2 max-w-md">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Summer Collection 2024</h1>
              <p className="text-muted-foreground md:text-lg">
                Discover our latest arrivals with up to 40% off on selected items.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 min-[400px]:gap-4">
              <Link href="/user/shop">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/user/categories">
                <Button size="lg" variant="outline">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 via-background/60 to-background/30" />
          <Image
            src="https://img.freepik.com/free-vector/flat-abstract-sale-banner_23-2149447128.jpg"
            alt="Hero background"
            fill
            className="object-cover -z-20"
            priority
          />
        </div>
      </section> */}

        <section className="container px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                Shop by Category
              </h2>
              <Link
                href="/user/categories"
                className="flex items-center gap-1 text-sm font-medium text-primary"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/user/categories/${category.name.toLowerCase()}`}
                >
                  <Card className="overflow-hidden h-full transition-colors hover:border-primary">
                    <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xl">
                          {category.name === "Clothing" && "👕"}
                          {category.name === "Electronics" && "🎧"}
                          {category.name === "Furniture" && "🪑"}
                          {category.name === "Accessories" && "👜"}
                          {category.name === "Home" && "🏠"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {category.count} items
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto">
          <ProductList />
        </div>

        <section className="container px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                Featured Products
              </h2>
              <Link
                href="/user/shop"
                className="flex items-center gap-1 text-sm font-medium text-primary"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* {featuredProducts.map((product) => (
              <Link key={product.id} href={`/user/shop/${product.id}`}>
                <ProductcArd product={product} />
              </Link>
            ))} */}
              <h1 className="text-red-400"> TODO: Fuatured add products</h1>
            </div>
          </div>
        </section>

        <section className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg">
              <div className="bg-muted/50 relative flex flex-col items-start gap-2 p-6">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">New Arrivals</h3>
                  <p className="text-sm text-muted-foreground">
                    Check out our latest collection
                  </p>
                </div>
                <Link href="/user/shop?sort=newest">
                  <Button size="sm">Shop Now</Button>
                </Link>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 to-background/30" />
              <Image
                src="https://img.freepik.com/free-vector/flat-abstract-sale-banner_23-2149447128.jpg"
                alt="New arrivals"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover -z-20"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <div className="bg-muted/50 relative flex flex-col items-start gap-2 p-6">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Special Offers</h3>
                  <p className="text-sm text-muted-foreground">
                    Up to 40% off on selected items
                  </p>
                </div>
                <Link href="/user/shop?discount=true">
                  <Button size="sm">View Offers</Button>
                </Link>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 to-background/30" />
              <Image
                src="https://graphicsfamily.com/wp-content/uploads/edd/2022/12/E-commerce-Facebook-Cover-Design-Template-scaled.jpg"
                alt="Special offers"
                fill
                className="object-cover -z-20"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
        <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] dark:bg-gray-800 dark:text-gray-100 my-16 rounded-xl overflow-hidden">
          <Image
            className="max-w-56"
            src={assets.images.jbl_soundbox_images}
            alt="jbl_soundbox_image"
          />
          <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
              Level Up Your Gaming Experience
            </h2>
            <p className="max-w-[343px] font-medium text-gray-800/60 dark:text-gray-400">
              From immersive sound to precise controls—everything you need to
              win
            </p>
            <button className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white">
              Buy now
              <Image
                className="group-hover:translate-x-1 transition"
                src={assets.icons.arrow_icon_white}
                alt="arrow_icon_white"
              />
            </button>
          </div>
          <Image
            src={assets.images.md_controller_image}
            alt="md_controller_image"
            className="hidden md:block max-w-80"
            priority
          />
          <Image
            src={assets.images.sm_controller_image}
            alt="sm_controller_image"
            className="md:hidden"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default HomeSection;
