"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Minus, Plus, Heart, ShoppingCart, Share2, Star, Truck, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import ProductCard from "@/components/Product-Card";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  finalPrice: number;
  images: string[];
  stock: number;
  rating: number;
  featured: boolean;
  category: { _id: string; name: string };
}

const Page = () => {
  const { id } = useParams();
  const [productsData, setProductsData] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState([])
  const [isWishlisted, setIsWishlisted] = useState(false)


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
          fetchRelatedProducts(data.product.category)
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

  // useEffect(() => {
  //   if (productsData) {
  //     const fetchRelatedProducts = async () => {
  //       try {
  //         const response = await fetch(`/api/products?category=${productsData.category._id}`);
  //         const data = await response.json();

  //         if (data.success) {
  //           setRelatedProducts(data.products.filter((p: Product) => p._id !== productsData._id).slice(0, 4));
  //         } else {
  //           setError("Failed to load related products.");
  //         }
  //       } catch (error) {
  //         console.error("Error Fetching Related Products:", error);
  //         setError("Failed to load related products. Please try again later.");
  //       }
  //     };

  //     fetchRelatedProducts();
  //   }
  // }, [productsData]);

  const fetchRelatedProducts = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`);
      const data = await response.json();
  
      if (data.success) {
        // Exclude the current product from related products
        const filteredProducts = data.products.filter((prod: Product) => prod._id !== categoryId);
        setRelatedProducts(filteredProducts.slice(0, 4));
      }
    } catch (error) {
      console.error("Error Fetching Related Products:", error);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (productsData && newQuantity >= 1 && newQuantity <= productsData.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // console.log(`Added ${quantity} of ${productsData.name} to cart.`);
    if (productsData) {
      toast({
        title: "Added to cart",
        description: `${quantity} × ${productsData.name} added to your cart`,
      });
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (productsData) {
      toast({
        title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
        description: isWishlisted
          ? `${productsData.name} has been removed from your wishlist`
          : `${productsData.name} has been added to your wishlist`,
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!productsData) return <p>Product not found.</p>;

  return (
    <>
      {/* <div className="container px-4 md:px-6 py-8">
        <div className="mb-6">
          <Link href="/user/shop" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to shop
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={productsData.images?.[activeImage] || "/placeholder.svg"}
                alt={productsData.name || "Product Image"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{productsData.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(productsData.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">{productsData.rating} ({Math.floor(Math.random() * 100) + 10} reviews)</span>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <p>{productsData.description}</p>
            </div>

            <div className="pt-4 space-y-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                <Share2 className="h-5 w-5" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4 text-muted-foreground" />
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>2-year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>{productsData.description}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div> */}





      <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <Link
          href="/user/shop"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to shop
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={productsData.images?.[0] || "/placeholder.svg"}
              alt={productsData.name || "Product Image"}
              fill
              className="object-cover"
              priority
            />
            {productsData.discount && (
              <Badge variant="destructive" className="absolute top-2 right-2">
                -{productsData?.discount}% OFF
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productsData.images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
                  activeImage === index ? "border-primary" : "border-transparent"
                }`}
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

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{productsData.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(productsData.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {productsData.rating} ({Math.floor(Math.random() * 100) + 10} reviews)
                </span>
              </div>
              <div className="text-sm text-muted-foreground">SKU: {productsData._id.padStart(8, "0")}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              {productsData.discount ? (
                <>
                  <span className="text-3xl font-bold">
                    ${(productsData.price * (1 - productsData.discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">${productsData.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-3xl font-bold">${productsData.price.toFixed(2)}</span>
              )}
            </div>
            <div
              className={`text-sm ${productsData.stock > 10 ? "text-green-600" : productsData.stock > 0 ? "text-amber-600" : "text-red-600"}`}
            >
              {productsData.stock > 10 ? "In Stock" : productsData.stock > 0 ? `Only ${productsData.stock} left` : "Out of Stock"}
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <p>{productsData.description}</p>
          </div>

          <div className="pt-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">Quantity</div>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= productsData.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 flex gap-2">
                <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={productsData.stock === 0}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Button
                  variant={isWishlisted ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10"
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    toast.success({
                      title: "Link copied",
                      description: "Product link copied to clipboard",
                    })
                  }}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>2-year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl eget aliquam
                tincidunt, nunc nunc aliquet nunc, eget aliquam magna nunc eget nunc. Sed euismod, nisl eget aliquam
                tincidunt, nunc nunc aliquet nunc, eget aliquam magna nunc eget nunc.
              </p>
              <h4>Features</h4>
              <ul>
                <li>Premium quality materials</li>
                <li>Durable construction</li>
                <li>Comfortable fit</li>
                <li>Versatile design</li>
                <li>Easy maintenance</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="space-y-4">
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-border">
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">Brand</td>
                    <td className="px-4 py-3 text-sm">StyleShop</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">Category</td>
                    <td className="px-4 py-3 text-sm">{productsData.category.name}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">Material</td>
                    <td className="px-4 py-3 text-sm">
                      Premium{" "}
                      {productsData.category.name === "Clothing"
                        ? "Fabric"
                        : productsData.category.name === "Electronics"
                          ? "Components"
                          : "Materials"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">Color</td>
                    <td className="px-4 py-3 text-sm">Multiple Options</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">Warranty</td>
                    <td className="px-4 py-3 text-sm">2 Years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">Rating</td>
                    <td className="px-4 py-3 text-sm">{productsData.rating} out of 5</td>
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
                            className={`h-4 w-4 ${j < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-muted-foreground">Verified Purchase</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(Date.now() - i * 86400000 * 7).toLocaleDateString()}
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
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedproductsData.map((relatedProduct) => (
            <Link key={relatedProduct._id} href={`/shop/${relatedProduct._id}`}>
              <ProductCard key={relatedProduct._id} product={relatedProduct} />
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Page;
