'use client'

import { createContext, useContext, useEffect, useState } from "react";


interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCartStore = create<CartContextType>((set) => ({
//   cart: [],
//   addToCart: (item) =>
//     set((state) => {
//       const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
//       if (existingItem) {
//         return {
//           cart: state.cart.map((cartItem) =>
//             cartItem.id === item.id
//               ? { ...cartItem, quantity: cartItem.quantity + 1 }
//               : cartItem
//           ),
//         };
//       }
//       return { cart: [...state.cart, { ...item, quantity: 1 }] };
//     }),
//   removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
//   updateQuantity: (id, quantity) =>
//     set((state) => ({
//       cart: state.cart.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       ),
//     })),
//   clearCart: () => set({ cart: [] }),
// }));


export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  
    // Load cart from localStorage AFTER the component mounts
    useEffect(() => {
      setIsMounted(true);
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }, []);
  
    // Save cart to localStorage when it changes
    useEffect(() => {
      if (isMounted) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }, [cart, isMounted]);
  
    const addToCart = (item: CartItem) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        }
        return [...prevCart, item];
      });
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item
          )
        );
      };
  
    const removeFromCart = (id: string) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };
  
    const clearCart = () => {
      setCart([]);
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart  }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  // Custom hook to use cart context
  export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };