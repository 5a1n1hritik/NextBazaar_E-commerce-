"use client";

import { useEffect, useState } from "react";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Info, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = useMemo(() => subtotal * 0.1, [subtotal]);
  const total = useMemo(
    () => subtotal + shipping + tax,
    [subtotal, shipping, tax]
  );

  if (!isMounted) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cart.length > 0 && (
          <Button
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        )}
      </div>
      {cart.length === 0 ? (
        <p className="mt-4">
          Shopping Cart is empty.{" "}
          <Link href="/shop" className="text-blue-500">
            Go Shopping
          </Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-6 divide-y">
              {/* Product 1 */}
              {cart.map((item, index) => (
                <div
                  key={item.id || `cart-item-${index}`}
                  className="pt-6 first:pt-0"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-24 h-24 bg-gray-100 rounded">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row justify-between">
                      <div>
                        <h3 className="text-base font-medium">{item.name}</h3>
                        <p className="font-medium mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="flex items-center text-green-600 text-sm mt-2">
                          <Check className="h-4 w-4 mr-1" />
                          <span className="text-sm">In stock</span>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 sm:mt-0">
                        <Select
                          defaultValue="1"
                          value={item.quantity.toString()}
                          onValueChange={(value) =>
                            updateQuantity(item.id, parseInt(value))
                          }
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="Qty" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString()}
                              >
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <button
                          className="ml-4 text-gray-400 hover:text-gray-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-6">Order summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-base">Subtotal</span>
                  <span className="text-base font-medium">
                    {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-base">Shipping estimate</span>
                    <button
                      className="ml-1 text-gray-400 hover:text-gray-500"
                      onClick={() =>
                        alert("Shipping estimate feature coming soon!")
                      }
                    >
                      <Info className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                  <span className="text-base font-medium">
                    ${shipping.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-base">Tax estimate</span>
                    <button
                      className="ml-1 text-gray-400 hover:text-gray-500"
                      onClick={() => alert("Tax estimate feature coming soon!")}
                    >
                      <Info className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                  <span className="text-base font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium">Order total</span>
                    <span className="text-base font-medium">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6 hover:bg-orange-600">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
