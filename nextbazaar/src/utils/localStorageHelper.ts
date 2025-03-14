const WISHLIST_KEY = "wishlist";

// Get Wishlist from Local Storage
export const getWishlistFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  }
  return [];
};

// Save Wishlist to Local Storage
export const saveWishlistToLocalStorage = (wishlist: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }
};
