'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getWishlistFromLocalStorage, saveWishlistToLocalStorage } from "@/utils/localStorageHelper";

// Define Wishlist Item Type
interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: number;
}

// Define Context Type
interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

// Create Context
export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Provider Component
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from local storage on mount
  useEffect(() => {
    setWishlist(getWishlistFromLocalStorage());
  }, []);

  // Add to Wishlist
  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = [...prevWishlist, item];
      saveWishlistToLocalStorage(updatedWishlist);
      return updatedWishlist;
    });
  };

  // Remove from Wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((item) => item.id !== id);
      saveWishlistToLocalStorage(updatedWishlist);
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};


export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
      throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
  };