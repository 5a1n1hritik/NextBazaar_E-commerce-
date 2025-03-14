import { useContext } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const WishlistButton = ({
  product,
}: {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: number;
  };
}) => {
  const wishlistContext = useContext(WishlistContext);
  if (!wishlistContext) return null;

  const { wishlist, addToWishlist, removeFromWishlist } = wishlistContext;
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <>
      <Button
        variant={isInWishlist ? "default" : "outline"}
        className="h-12 w-12"
        onClick={() =>
          isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product)
        }
      >
        {/* {isInWishlist ? (
          <HeartOff className="h-4 w-4 mr-2" />
        ) : (
          <Heart className="h-4 w-4 mr-2" />
        )}
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"} */}
        <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
      </Button>
    </>
  );
};

export default WishlistButton;
