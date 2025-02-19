"use client"

// import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    description: "High-quality sound with noise cancellation",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track your fitness and stay connected",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Laptop Stand",
    description: "Ergonomic design for better posture",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
  },
]

export default function Home() {
  return (
    // <div className="flex flex-col min-h-screen">
    //   <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
    //     <div className="container px-4 md:px-6">
    //       <div className="flex flex-col items-center space-y-4 text-center">
    //         <div className="space-y-2">
    //           <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
    //             Welcome to Modern E-commerce
    //           </h1>
    //           {/* <TextGenerateEffect words="Discover amazing products at unbeatable prices" /> */}
    //         </div>
    //         <div
    //           className="space-x-4"
    //           initial={{ opacity: 0, y: 20 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           transition={{ delay: 0.5 }}
    //         >
    //           <Button asChild>
    //             <Link href="/products">Shop Now</Link>
    //           </Button>
    //           <Button variant="outline" asChild>
    //             <Link href="/categories">Browse Categories</Link>
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
    //     <div className="container px-4 md:px-6">
    //       <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
    //         Featured Products
    //       </h2>
    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    //         {featuredProducts.map((product) => (
    //           <div
    //             key={product.id}
    //             initial={{ opacity: 0, y: 20 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ delay: 0.2 * product.id }}
    //           >
    //             <Card className="overflow-hidden">
    //               <CardHeader className="p-0">
    //                 <img
    //                   src={product.image || "/placeholder.svg"}
    //                   alt={product.name}
    //                   className="w-full h-48 object-cover"
    //                 />
    //               </CardHeader>
    //               <CardContent className="p-4">
    //                 <CardTitle>{product.name}</CardTitle>
    //                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
    //                 <div className="flex items-center mt-2">
    //                   {Array.from({ length: 5 }).map((_, index) => (
    //                     <StarIcon
    //                       key={index}
    //                       className={`w-4 h-4 ${
    //                         index < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
    //                       }`}
    //                     />
    //                   ))}
    //                   <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({product.rating})</span>
    //                 </div>
    //               </CardContent>
    //               <CardFooter className="flex justify-between items-center">
    //                 <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
    //                 <Button>Add to Cart</Button>
    //               </CardFooter>
    //             </Card>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <h1 className="text-3xl text-center mt-10">hello world;</h1>
  )
}

