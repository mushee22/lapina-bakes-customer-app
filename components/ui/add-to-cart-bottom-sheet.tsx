import { CURRENCY } from "@/constants";
import { useCartContext } from "@/hooks/use-cart";
import { X } from "lucide-react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Typography } from "../elements";
import ProductPrice from "./product-price";

interface AddToCartBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
    availableQuantity: number;
    gst?: number;
    sellingPrice?: number;
  };
}

const { height: screenHeight } = Dimensions.get("window");

export default function AddToCartBottomSheet({
  visible,
  onClose,
  product,
}: AddToCartBottomSheetProps) {
  const [quantity, setQuantity] = useState(1);
  const [quantityText, setQuantityText] = useState("1");
  const [sheetHeight, setSheetHeight] = useState(0);
  const [maxQuantityWarning, setMaxQuantityWarning] = useState("");
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const {
    cartItems,
    onAddItem,
    onUpdateItemQuantity,
    getCartItem,
    isFetchingCart,
    isRefetchingCart
  } = useCartContext();

  const handleAddToCart = () => {
    onClose();
    const cartItem = getCartItem(product.id);
    if (cartItem) {
      onUpdateItemQuantity(cartItem.id, {
        notes: cartItem.notes,
        quantity: quantity,
      });
      return;
    }
    onAddItem({
      product_id: product.id,
      quantity: quantity,
      notes: "",
    });
  };

  useEffect(() => {

    if(!cartItem) {
      setQuantity(1);
      setQuantityText("1");
      return;
    }

    if (cartItems.length > 0) {
      const cartItem = getCartItem(product.id);
      if (cartItem) {
        setQuantity(cartItem.quantity);
        setQuantityText(cartItem.quantity.toString());
      }
    }
  }, [cartItems, isFetchingCart, isRefetchingCart]);

  useEffect(() => {
    if (visible && sheetHeight > 0) {
      translateY.setValue(sheetHeight);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (!visible && sheetHeight > 0) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: sheetHeight,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, sheetHeight]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          gestureState.dy > 5 &&
          Math.abs(gestureState.dx) < Math.abs(gestureState.dy)
        );
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy >= 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > sheetHeight * 0.3 || gestureState.vy > 0.5) {
          onClose();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleQuantityChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setQuantityText(numericText);

    const numValue = parseInt(numericText);

    if(
      numValue > product.availableQuantity
    ) {
      setMaxQuantityWarning(`Max quantity is ${product.availableQuantity}`);
      setQuantity(numValue);
      return;
    }

    if (
      !isNaN(numValue) &&
      numValue >= 1 &&
      numValue <= product.availableQuantity
    ) {
      setQuantity(numValue);
      setMaxQuantityWarning("");
    }
  };

  const handleQuantityBlur = () => {
    const numValue = parseInt(quantityText);
    if (isNaN(numValue) || numValue < 1) {
      setQuantity(1);
      setQuantityText("1");
    } else if (numValue > product.availableQuantity) {
      setQuantity(product.availableQuantity);
      setQuantityText(product.availableQuantity.toString());
    }
  };


  const cartItem = useMemo(() => cartItems.find((item) => item.product_id === product.id), [cartItems, product.id]);
  const total = useMemo(() => (product.sellingPrice || product.price) * quantity || 0, [product.sellingPrice, product.price, quantity])?.toFixed(2);
  


  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          className="flex-1 bg-black/50"
          style={{ opacity: backdropOpacity }}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
        style={{
          transform: [{ translateY }],
        }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setSheetHeight(height);
        }}
        {...panResponder.panHandlers}
      >
        <View className="items-center py-3">
          <View className="w-10 h-1 bg-gray-300 rounded-full" />
        </View>

        <View className="flex-row items-center justify-between px-6 pb-4">
          <Typography.Xl className="font-bold text-gray-900">
            Add to Cart
          </Typography.Xl>
          <TouchableOpacity
            onPress={onClose}
            className="p-2 rounded-full bg-gray-100"
            activeOpacity={0.7}
          >
            <X size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View className="px-6 pb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 mr-4">
              {
                <Image
                  source={
                    product.image
                      ? { uri: product.image }
                      : require("@/assets/images/logo.jpg")
                  }
                  className="w-full h-full"
                  resizeMode="cover"
                />
              }
            </View>
            <View className="flex-1">
              <Typography.Lg
                className="font-bold text-gray-900 mb-1"
                numberOfLines={2}
              >
                {product.name}
              </Typography.Lg>
              <ProductPrice price={product.price} sellingPrice={product.sellingPrice} />
              {
                product.gst && (
                  <Typography.Sm className="text-gray-600">
                    GST({product.gst}%)
                  </Typography.Sm>
                )
              }
              <Typography.Sm className="text-gray-500 mt-1">
                {product.availableQuantity} available
              </Typography.Sm>
            </View>
          </View>

          <View className="mb-4">
            <Typography.Lg className="font-semibold text-gray-900 mb-3">
              Quantity
            </Typography.Lg>

            <View className="items-center">
              <View className="bg-white border-2 border-primary/20 rounded-2xl shadow-sm shadow-primary/5">
                <TextInput
                  value={quantityText}
                  onChangeText={handleQuantityChange}
                  onBlur={handleQuantityBlur}
                  keyboardType="number-pad"
                  selectTextOnFocus
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#C85A2B",
                    textAlign: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    minWidth: 100,
                  }}
                  placeholder="1"
                  placeholderTextColor="#C85A2B80"
                  maxLength={3}
                />
              </View>
              {
                maxQuantityWarning ? (
                  <Typography.Sm className="text-red-500 mt-3">
                    {maxQuantityWarning}
                  </Typography.Sm>
                )
                :
              <Typography.Sm className="text-gray-500 mt-3">
                Max {product.availableQuantity} items available
              </Typography.Sm>
              }
            </View>
          </View>
          <View className="bg-gray-50 rounded-2xl p-4 mb-4">
            <View className="flex-row justify-between items-center">
              <Typography.Lg className="font-semibold text-gray-700">
                Total
              </Typography.Lg>
              <Typography.Xl className="font-bold text-primary">
                {CURRENCY}
                {total}
              </Typography.Xl>
            </View>
          </View>
          <View className="flex-row  items-center">
          {
            cartItem?.quantity == quantity ? (
              <Button
                activeOpacity={0.8}
                onPress={handleAddToCart}
                className="bg-primary flex-1"
                disabled={true}
              >
                <Typography.Base className="text-white font-bold text-center">
                  Current Quantity: {cartItem.quantity}
                </Typography.Base>
              </Button>
            ) : 
            maxQuantityWarning.length ?
            null :
            <Button
              activeOpacity={0.8}
              onPress={handleAddToCart}
              className="bg-primary flex-1"
            >
              <Typography.Base className="text-white font-bold text-center">
                {cartItem ? "Update" : "Add"} {quantity} to Cart 
              </Typography.Base>
            </Button>
          }
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}
