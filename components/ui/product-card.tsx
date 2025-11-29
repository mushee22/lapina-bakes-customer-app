import { useCartContext } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Typography } from "../elements";
import AddToCartBottomSheet from "./add-to-cart-bottom-sheet";
import CartItemDeleteButton from "./cart-item-delete";
import ProductPrice from "./product-price";

export interface ProductCardProps {
  id: number;
  image?: string;
  name: string;
  price: number;
  className?: string;
  stock?: number;
  sellingPrice?: number;
  discount?: number;
  availableQuantity?: number;
  gst?: number;
}

export default function ProductCard({
  id,
  image,
  name,
  price,
  className,
  sellingPrice,
  availableQuantity = 0,
  gst = 0,
}: ProductCardProps) {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const { getCartItem, cartItems } =
    useCartContext();
  const cartItem = useMemo(() => {
    if (cartItems.length > 0) {
      return getCartItem(id);
    }
  }, [cartItems, id]);

 

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.95}
        className={cn(
          "bg-white flex-col flex-1 overflow-hidden rounded-2xl shadow-sm shadow-black/5 border border-gray-100",
          className
        )}
      >
        <View>
          <Image
            source={
              image ? { uri: image } : require("@/assets/images/logo.jpg")
            }
            className="w-full h-[140px] rounded-t-2xl"
            resizeMode="cover"
          />
        </View>

        {/* Content Container */}
        <View className="p-3 flex-1">
          {/* Product Name */}
          <Typography.Base
            className="font-semibold text-gray-800 mb-2 leading-5"
            numberOfLines={2}
          >
            {name ?? ""}
          </Typography.Base>

          {/* Price Container */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <View className="flex-row items-baseline">
                <ProductPrice price={price} sellingPrice={sellingPrice} />
              </View>
            </View>
          </View>

          {cartItem?.id ? (
            <View className="flex-row items-center bg-gray-50 rounded-lg">
              <CartItemDeleteButton cartItem={cartItem} />
              <TouchableOpacity
                // onPress={onQuantityPress}
                className="px-4 py-2 border-x border-gray-200 flex-1"
                activeOpacity={0.7}
              >
                <Typography.Base className="font-semibold text-primary min-w-[20px] text-center">
                  {cartItem.quantity}
                </Typography.Base>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowBottomSheet(true)}
                className="p-2"
                activeOpacity={0.7}
              >
                <Plus size={16} color="#22c55e" />
              </TouchableOpacity>
            </View>
          ) : (
            availableQuantity > 0 ? (
              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-primary flex-row items-center justify-center py-2.5 px-4 rounded-xl shadow-sm"
                onPress={() => setShowBottomSheet(true)}
              >
                <Plus size={16} color="white" strokeWidth={2} />
                <Typography.Sm className="text-white font-semibold ml-1">
                  Add to Cart
                </Typography.Sm>
              </TouchableOpacity>
            ) : (
              <Typography.Sm className="text-red-500 font-semibold">
                Out of Stock
              </Typography.Sm>
            )
          )}
        </View>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <AddToCartBottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        product={{
          id,
          name,
          price,
          image,
          sellingPrice: sellingPrice ,
          availableQuantity,
          gst,
        }}
      />
     
    </>
  );
}
