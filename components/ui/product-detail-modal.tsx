import { CURRENCY } from "@/constants";
import { useCartContext } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Typography } from "../elements";
import CartItemDeleteButton from "./cart-item-delete";
import ProductPrice from "./product-price";

interface ProductDetailModalProps {
  visible: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    description?: string;
    price: number;
    sellingPrice?: number;
    discount?: number;
    gst?: number;
    image?: string;
    imageUrls?: string[];
  };
}

const { width: screenWidth } = Dimensions.get("window");

export default function ProductDetailModal({
  visible,
  onClose,
  product,
}: ProductDetailModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const insets = useSafeAreaInsets();
  
  const { cartItems, onAddItem, onUpdateItemQuantity } = useCartContext();

  const cartItem = useMemo(() => {
    return cartItems.find((item) => item.product_id === product.id);
  }, [cartItems, product.id]);

  const uniqueImages = useMemo(() => {
    const list: string[] = [];
    if (product.image) {
      list.push(product.image);
    }
    if (product.imageUrls && Array.isArray(product.imageUrls)) {
      product.imageUrls.forEach((img) => {
        if (img && typeof img === "string") {
          list.push(img);
        }
      });
    }
    return Array.from(new Set(list));
  }, [product.image, product.imageUrls]);

  const discountPercentage = useMemo(() => {
    if (product.discount !== undefined) {
      return product.discount;
    }
    if (product.price && product.sellingPrice && product.price > product.sellingPrice) {
      return Math.round(((product.price - product.sellingPrice) / product.price) * 100);
    }
    return 0;
  }, [product.discount, product.price, product.sellingPrice]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / screenWidth);
    setActiveIndex(index);
  };

  const handleAddToCart = () => {
    onAddItem({
      product_id: product.id,
      quantity: 1,
      notes: "",
    });
  };

  const handleIncrease = () => {
    if (cartItem) {
      onUpdateItemQuantity(cartItem.id, {
        quantity: cartItem.quantity + 1,
        notes: cartItem.notes,
      });
    }
  };

  const unitPrice = product.sellingPrice || product.price || 0;
  const totalPrice = useMemo(() => {
    const qty = cartItem ? cartItem.quantity : 1;
    return (unitPrice * qty).toFixed(2);
  }, [unitPrice, cartItem]);

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View className="flex-1 bg-gray-50">
        {/* Floating Close Button */}
        <TouchableOpacity
          onPress={onClose}
          className="absolute right-6 bg-black/40 w-10 h-10 rounded-full items-center justify-center z-50 shadow-sm"
          style={{ top: insets.top > 0 ? insets.top + 10 : 20 }}
          activeOpacity={0.7}
        >
          <X size={20} color="white" />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        >
          {/* Image Slider Section */}
          <View style={{ width: screenWidth, height: 400 }} className="relative bg-neutral-950">
            {uniqueImages.length > 0 ? (
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={{ width: screenWidth, height: 400 }}
              >
                {uniqueImages.map((imgUrl, index) => (
                  <View key={index} style={{ width: screenWidth, height: 400 }}>
                    <Image
                      source={{ uri: imgUrl }}
                      style={{ width: screenWidth, height: 400 }}
                      resizeMode="contain"
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={{ width: screenWidth, height: 400 }} className="items-center justify-center">
                <Image
                  source={require("@/assets/images/logo.jpg")}
                  style={{ width: screenWidth, height: 400 }}
                  resizeMode="contain"
                />
              </View>
            )}

            {/* Pagination Dots */}
            {uniqueImages.length > 1 && (
              <View className="flex-row justify-center items-center absolute bottom-8 left-0 right-0 gap-x-2">
                {uniqueImages.map((_, idx) => (
                  <View
                    key={idx}
                    className={cn(
                      "h-2 rounded-full",
                      activeIndex === idx ? "bg-primary w-5" : "bg-white/60 w-2"
                    )}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Details Section */}
          <View className="bg-white rounded-t-[32px] -mt-6 px-6 pt-8 pb-10 min-h-[400px] shadow-sm">
            {/* Product Name */}
            <Typography.Xl className="font-bold text-gray-900 mb-3 text-2xl leading-8">
              {product.name}
            </Typography.Xl>

            {/* Price & Discount Row */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <ProductPrice price={product.price} sellingPrice={product.sellingPrice} />
                {discountPercentage > 0 && (
                  <View className="bg-green-50 border border-green-200 px-2 py-0.5 rounded-lg ml-3">
                    <Typography.Sm className="text-green-700 font-bold">
                      {discountPercentage}% OFF
                    </Typography.Sm>
                  </View>
                )}
              </View>
            </View>

            {/* GST Indicator */}
            {product.gst && product.gst > 0 ? (
              <Typography.Sm className="text-gray-500 mb-6 font-medium">
                Price inclusive of GST ({product.gst}%)
              </Typography.Sm>
            ) : null}

            <View className="h-[1px] bg-gray-100 mb-6" />

            {/* Description */}
            <Typography.Base className="font-bold text-gray-900 mb-2">
              Product Details
            </Typography.Base>
            <Typography.Sm className="text-gray-600 leading-6 font-normal">
              {product.description || "Freshly baked and prepared with the finest ingredients. Enjoy our delicious and mouthwatering treats."}
            </Typography.Sm>
          </View>
        </ScrollView>

        {/* Fixed Bottom Action Bar */}
        <View
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex-row items-center justify-between shadow-lg"
          style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 12 : 16 }}
        >
          <View className="flex-col">
            <Typography.Sm className="text-gray-400 font-medium mb-0.5">
              {cartItem ? "Total Price" : "Price"}
            </Typography.Sm>
            <Typography.Lg className="font-extrabold text-primary text-2xl">
              {CURRENCY}{totalPrice}
            </Typography.Lg>
          </View>

          {cartItem ? (
            <View className="flex-row items-center bg-gray-50 rounded-xl border border-gray-200 p-1 flex-1 ml-6 max-w-[180px]">
              <CartItemDeleteButton cartItem={cartItem} />
              
              <View className="px-4 py-2 border-x border-gray-200 flex-1">
                <Typography.Base className="font-semibold text-primary min-w-[20px] text-center text-lg">
                  {cartItem.quantity}
                </Typography.Base>
              </View>

              <TouchableOpacity
                onPress={handleIncrease}
                className="p-2"
                activeOpacity={0.7}
              >
                <Plus size={16} color="#22c55e" />
              </TouchableOpacity>
            </View>
          ) : (
            <Button
              className="bg-primary px-8 rounded-xl h-12 justify-center items-center flex-1 ml-6"
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center">
                <Plus size={16} color="white" className="mr-1.5" />
                <Typography.Base className="text-white font-bold">
                  Add to Cart
                </Typography.Base>
              </View>
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
}
