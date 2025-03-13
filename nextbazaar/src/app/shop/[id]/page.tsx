"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Minus,
  Plus,
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ZoomIn,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import ProductCard from "@/components/Product-Card";
import { cn } from "@/lib/utils";

interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  discount?: number;
  finalPrice: number;
  images: string[];
  stock: number;
  rating: number;
  featured: boolean;
  specifications: Record<string, string>;
  category: { _id: string; name: string };
}

const Page = () => {
  const { id } = useParams();
  const [productsData, setProductsData] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const sizes: string[] = ["S", "M", "L", "XL", "XS", "XXL"];
  const colors: string[] = ["Red", "Blue", "Green", "Black", "White"];

  useEffect(() => {
    if (!id) {
      console.log("Failed to fetch product");
      return;
    }

    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (data.success) {
          setProductsData(data.product);
          console.log("Product:", data.product);
          fetchRelatedProducts(data.product.category._id);
          console.log("Product category id:", data.product.category);
        } else {
          setError("Failed to load product.");
        }
      } catch (error) {
        console.error("Error Fetching Product:", error);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const [relatedproductsData, setRelatedProducts] = useState<Product[]>([]);

  const fetchRelatedProducts = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`);
      const data = await response.json();

      if (data.success) {
        const filteredProducts = data.products
          .filter((prod: Product) => prod._id !== categoryId)
          .slice(0, 4);
        setRelatedProducts(filteredProducts);
      }
    } catch (error) {
      console.error("Error Fetching Related Products:", error);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (productsData && newQuantity <= productsData.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // console.log(`Added ${quantity} of ${productsData.name} to cart.`);
    if (productsData) {
      toast.success(`Added ${quantity} × ${productsData.name} to cart`);
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (productsData) {
      if (isWishlisted) {
        toast.error(`${productsData.name} has been removed from your wishlist`);
      } else {
        toast.success(`${productsData.name} has been added to your wishlist`);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setActiveImage((prev) =>
        prev === 0 ? (productsData?.images.length ?? 1) - 1 : prev - 1
      );
    } else {
      setActiveImage((prev) =>
        prev === (productsData?.images.length ?? 1) - 1 ? 0 : prev + 1
      );
    }
  };

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!productsData) return <p>Product not found.</p>;

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-8 dark:bg-gray-900 dark:text-gray-100">
        <div className="mb-6">
          <Link
            href="/shop"
            className="flex items-center hover:text-primary transition-colors text-base dark:text-gray-300 text-gray-600"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to shop
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <div
              className="relative aspect-square overflow-hidden rounded-lg border cursor-zoom-in"
              ref={imageRef}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleImageZoom}
            >
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-200",
                  isZoomed ? "opacity-100" : "opacity-0"
                )}
              >
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(${
                      productsData.images[activeImage] || "/placeholder.svg"
                    })`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: "scale(1.5)",
                  }}
                />
              </div>
              <Image
                src={productsData.images[activeImage] || "/placeholder.svg"}
                alt={productsData.name || "Product Image"}
                fill
                className={cn(
                  "object-cover transition-opacity duration-200",
                  isZoomed ? "opacity-0" : "opacity-100"
                )}
                priority
              />
              {productsData.discount && (
                <Badge
                  variant="destructive"
                  className="absolute top-2 right-2 text-sm font-medium"
                >
                  -{productsData?.discount}% OFF
                </Badge>
              )}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/80 dark:bg-black/50 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageNavigation("prev");
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/80 dark:bg-black/50 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageNavigation("next");
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-black/50 rounded-md p-1 shadow-md">
                <ZoomIn className="h-5 w-5" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productsData.images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative aspect-square cursor-pointer rounded-md overflow-hidden border-2 transition-all hover:opacity-90",
                    activeImage === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${productsData.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center">
                <Badge variant="outline" className="mb-2 text-sm">
                  {productsData.category.name}
                </Badge>
                {productsData.featured && (
                  <Badge variant="secondary" className="ml-2 mb-2">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold dark:text-white dark:drop-shadow-sm text-gray-700 drop-shadow-sm">
                {productsData.name}
              </h1>
              <div className="flex items-center mt-3 space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(productsData.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-base dark:text-gray-300 text-gray-600">
                    {productsData.rating} (
                    {Math.floor(Math.random() * 100) + 10} reviews)
                  </span>
                </div>
                {/* <div className="text-sm dark:text-gray-400 text-gray-500">SKU: {productsData._id.padStart(8, "0")}</div> */}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                {productsData.discount ? (
                  <>
                    <span className="text-3xl md:text-4xl font-bold">
                      $
                      {(
                        productsData.price *
                        (1 - productsData.discount / 100)
                      ).toFixed(2)}
                    </span>
                    <span className="text-lg text-muted-foreground line-through dark:text-gray-400 text-gray-500">
                      ${productsData.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl md:text-4xl font-bold">
                    ${productsData.price.toFixed(2)}
                  </span>
                )}
              </div>
              <div
                className={`text-base font-medium ${
                  productsData.stock > 10
                    ? "text-green-600 dark:text-green-400"
                    : productsData.stock > 0
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {productsData.stock > 10
                  ? "In Stock"
                  : productsData.stock > 0
                  ? `Only ${productsData.stock} left`
                  : "Out of Stock"}
              </div>
            </div>

            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="text-base md:text-lg leading-relaxed">
                {productsData.specifications.size}
              </p>
            </div>
            <div className="prose prose-sm max-w-none">
              <p>{productsData.description}</p>
            </div>

            {sizes.length > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-base font-medium mb-2 dark:text-gray-200 text-gray-700">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        type="button"
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[3rem] font-medium",
                          selectedSize === size && "shadow-md"
                        )}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {colors.length > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-base font-medium mb-2 dark:text-gray-200 text-gray-700">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <Button
                        key={color}
                        type="button"
                        variant={
                          selectedColor === color ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "min-w-[4.5rem] font-medium",
                          selectedColor === color && "shadow-md"
                        )}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="space-y-1">
                  <div className="text-base font-medium dark:text-gray-200 text-gray-700">
                    Quantity
                  </div>
                  <div className="flex items-center border rounded-md dark:border-gray-700 border-gray-300">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-base font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= productsData.stock}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 flex gap-2">
                  <Button
                    className="flex-1 h-12 text-base shadow-md hover:shadow-lg transition-shadow"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={productsData.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>

                  <Button
                    variant={isWishlisted ? "default" : "outline"}
                    size="icon"
                    className="h-12 w-12"
                    onClick={handleToggleWishlist}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Product link copied to clipboard");
                    }}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4">
                <div className="flex items-center space-x-2 p-3 rounded-lg dark:bg-gray-800 bg-gray-50">
                  <Truck className="h-5 w-5  flex-shrink-0 dark:text-gray-300 text-gray-600" />
                  <span className=" text-sm font-medium">
                    Free shipping over $50
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg dark:bg-gray-800 bg-gray-50">
                  <RotateCcw className="h-5 w-5  flex-shrink-0 dark:text-gray-300 text-gray-600" />
                  <span className=" text-sm font-medium">30-day returns</span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg dark:bg-gray-800 bg-gray-50">
                  <Shield className="h-5 w-5  flex-shrink-0 dark:text-gray-300 text-gray-600" />
                  <span className=" text-sm font-medium">2-year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 w-full space-y-6">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3 className="text-2xl font-bold">Product Description</h3>
            <p className="text-base md:text-lg leading-relaxed">
              {productsData.description}
            </p>
          </div>

          <div className="rounded-lg border overflow-hidden dark:border-gray-700 border-gray-200">
            <table className="min-w-full divide-y divide-border">
              <tbody className="divide-y dark:divide-gray-700 divide-gray-200">
                {Object.entries(productsData.specifications).map(
                  ([key, value], index) => (
                    <tr key={index} className="dark:bg-gray-800 bg-white">
                      <td className="px-6 py-4 text-base font-medium w-1/3 dark:text-gray-200 text-gray-700">
                        {key}
                      </td>
                      <td className="px-6 py-4 text-base">{value}</td>
                    </tr>
                  )
                )}
                <tr className="dark:bg-gray-800 bg-white">
                  <td className="px-6 py-4 text-base font-medium w-1/3 dark:text-gray-200 text-gray-700">
                    Category
                  </td>
                  <td className="px-6 py-4 text-base">
                    {productsData.category.name}
                  </td>
                </tr>
                <tr className="dark:bg-gray-800 bg-white">
                  <td className="px-6 py-4 text-base font-medium w-1/3 dark:text-gray-200 text-gray-700">
                    Brand
                  </td>
                  <td className="px-6 py-4 text-base">{productsData.brand}</td>
                </tr>
                <tr className="dark:bg-gray-800 bg-white">
                  <td className="px-6 py-4 text-base font-medium w-1/3 dark:text-gray-200 text-gray-700">
                    Model
                  </td>
                  <td className="px-6 py-4 text-base">
                    {productsData._id.padStart(8, "0")}
                  </td>
                </tr>
                <tr className="dark:bg-gray-800 bg-white">
                  <td className="px-6 py-4 text-base font-medium w-1/3 dark:text-gray-200 text-gray-700">
                    Warranty
                  </td>
                  <td className="px-6 py-4 text-base">2 Years</td>
                </tr>
                <tr className="dark:bg-gray-800 bg-white">
                  <td className="px-6 py-4 text-base font-medium w-1/3 dark:text-gray-200 text-gray-700">
                    Rating
                  </td>
                  <td className="px-6 py-4 text-base">
                    {productsData.rating} out of 5
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            <div className="space-y-6 p-6 rounded-lg dark:bg-gray-800 bg-gray-50">
              <div className="text-center">
                <div className="text-6xl font-bold">{productsData.rating}</div>
                <div className="flex justify-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(productsData.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-base mt-2 dark:text-gray-300 text-gray-600">
                  Based on {Math.floor(Math.random() * 100) + 10} reviews
                </div>
              </div>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const percentage =
                    rating === 5
                      ? 70
                      : rating === 4
                      ? 20
                      : rating === 3
                      ? 7
                      : rating === 2
                      ? 2
                      : 1;
                  return (
                    <div key={rating} className="flex items-center text-base">
                      <div className="w-12">{rating} ★</div>
                      <div className="flex-1 mx-3 h-2.5 rounded-full overflow-hidden dark:bg-gray-700 bg-gray-200">
                        <div
                          className="h-full bg-yellow-400"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-right">{percentage}%</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg space-y-3 dark:bg-gray-800 bg-white border"
                >
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-lg">
                        {i === 0
                          ? "John Doe"
                          : i === 1
                          ? "Jane Smith"
                          : "Robert Johnson"}
                      </h4>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-5 w-5 ${
                              j < (i === 0 ? 5 : i === 1 ? 4 : 3)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm px-2 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 bg-blue-50 text-blue-600">
                          Verified Purchase
                        </span>
                      </div>
                    </div>
                    <div className="text-sm dark:text-gray-400 text-gray-500">
                      {new Date(
                        Date.now() - i * 86400000 * 7
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-base leading-relaxed">
                    {i === 0
                      ? "Absolutely love this product! The quality is exceptional and it exceeded my expectations. Shipping was fast and the packaging was secure. Would definitely recommend to anyone looking for a high-quality " +
                        productsData.category.name.toLowerCase() +
                        "."
                      : i === 1
                      ? "Good product overall. The " +
                        productsData.category.name.toLowerCase() +
                        " is well-made and looks great. The only reason I'm giving 4 stars instead of 5 is that the color is slightly different from what's shown in the pictures."
                      : "Decent product for the price. It serves its purpose, but there are a few minor issues. Customer service was helpful when I had questions about the " +
                        productsData.category.name.toLowerCase() +
                        "."}
                  </p>
                </div>
              ))}

              <Button variant="outline" className="w-full py-6 text-base">
                Load More Reviews
              </Button>
            </div>
          </div>
        </div>

        {/* <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-4">
              <div className="prose prose-lg max-w-none">
                <h3>Product Description</h3>
                <p>{productsData.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="space-y-4">
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">Brand</td>
                      <td className="px-4 py-3 text-sm">
                        {productsData.brand}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">
                        Category
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {productsData.category.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">
                        Material
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {productsData.specifications.Material}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">Size</td>
                      <td className="px-4 py-3 text-sm">
                        {productsData.specifications.size}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">Color</td>
                      <td className="px-4 py-3 text-sm">
                        {productsData.specifications.color}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">
                        Warranty
                      </td>
                      <td className="px-4 py-3 text-sm">2 Years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">Rating</td>
                      <td className="px-4 py-3 text-sm">
                        {productsData.rating} out of 5
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 rounded-lg border space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">John Doe</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${
                                j < 4
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-xs text-muted-foreground">
                            Verified Purchase
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(
                          Date.now() - i * 86400000 * 7
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm">
                      {i === 0
                        ? "Great product! Exactly as described and arrived quickly. Would definitely recommend."
                        : i === 1
                        ? "Good quality for the price. The sizing runs a bit large, but otherwise very happy with my purchase."
                        : "Nice product but took longer than expected to arrive. Customer service was helpful though."}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div> */}

        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedproductsData.map((relatedProduct) => (
              <Link
                key={relatedProduct._id}
                href={`/shop/${relatedProduct._id}`}
              >
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                />
              </Link>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 p-4 transition-all duration-300 transform md:hidden z-50 dark:bg-gray-900 dark:border-t dark:border-gray-800 bg-white border-t border-gray-200",
            isScrolled ? "translate-y-0 shadow-lg" : "translate-y-full"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-medium text-lg truncate">
                {productsData.name}
              </div>
              <div className="font-bold text-xl">
                {productsData.discount
                  ? `$${(
                      productsData.price *
                      (1 - productsData.discount / 100)
                    ).toFixed(2)}`
                  : `$${productsData.price.toFixed(2)}`}
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={productsData.stock === 0}
              className="shadow-md"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
