import { CartContext } from "@/context/cart-context";
import CustomError from "@/lib/error";
import { cartService } from "@/service/cart";
import { orderService } from "@/service/order";
import { Cart, Order } from "@/type/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ReactNode, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import { queryClient } from "./react-query-provider";

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const {
    data,
    isLoading: isFetchingCart,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartService.getUserCart(),
  });

  const { mutateAsync: addItem, isPending: isAddingItem } = useMutation({
    mutationKey: ["addItem"],
    mutationFn: (item: {
      product_id: number;
      quantity: number;
      notes?: string;
    }) => cartService.addItem(item),
    onSuccess: (data) => {
      refetch();
      // Toast.show({
      //   type: "success",
      //   text1: "Item added to cart! 🎉",
      //   text2: "Check your cart to review your order",
      // });
    },
    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Failed to add item",
        text2: "Please try again or contact support",
      });
    },
  });

  const { mutateAsync: removeItem, isPending: isRemovingItem } = useMutation({
    mutationKey: ["removeItem"],
    mutationFn: (id: number) => cartService.removeItem(id),
    onSuccess: (data) => {
      refetch();
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to remove item",
        text2: "Please try again or contact support",
      });
      console.log(error);
    },
  });

  const { mutateAsync: updateItemQuantity, isPending: isUpdatingItemQuantity } =
    useMutation<
      Cart,
      CustomError,
      { id: number; data: { quantity: number; notes?: string } }
    >({
      mutationKey: ["updateItemQuantity"],
      mutationFn: async (payload) =>
        cartService.updateItemQuantity(payload.id, payload.data),
      onSuccess: (data: Cart) => {
        refetch();
        // Toast.show({
        //   type: "success",
        //   text1: "Quantity updated!",
        //   text2: "Your cart has been refreshed",
        // });
      },
      onError: (error) => {
        console.log(error?.details || error);
        Toast.show({
          type: "error",
          text1: "Failed to update quantity",
          text2: "Please try again or contact support",
        });
      },
    });

  const { mutateAsync: clearCart, isPending: isClearingCart } = useMutation({
    mutationKey: ["clearCart"],
    mutationFn: () => cartService.clearCart(),
    onSuccess: (data) => {
      refetch();
      Toast.show({
        type: "success",
        text1: "Cart cleared!",
        text2: "Ready to add new delicious items",
      });
    },
    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Failed to clear cart",
        text2: "Please try again or contact support",
      });
    },
  });

  const { mutateAsync: checkoutFromCart, isPending: isPlacingOrder } =
    useMutation({
      mutationKey: ["placeOrder"],
      mutationFn: () => orderService.checkoutFromCart(),
      onSuccess: (data: Order) => {
        refetch();
        setLastOrder(data);
        setShowOrderSuccess(true);
        setTimeout(() => {
          setShowOrderSuccess(false);
          setLastOrder(null);
          router.push("/customer/(tabs)/order");
        }, 3000);
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Order placement failed",
          text2: "Please check your connection and try again",
        });
      },
    });

  const { mutateAsync: cancelOrder, isPending: isCancellingOrder } = useMutation({
    mutationKey: ["cancelOrder"],
    mutationFn: (id: number) => orderService.cancelOrder(id),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Order cancelled!",
        text2: "You can place a new order anytime",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to cancel order",
        text2: "Please contact customer support",
      });
    },
  });


  const handleAddItem = async (item: {
    product_id: number;
    quantity: number;
    notes?: string;
  }) => {
    await addItem(item);
  };

  const handleUpdateItemQuantity = async (
    id: number,
    data: { quantity: number; notes?: string }
  ) => {
    await updateItemQuantity({ id, data });
  };

  const handleRemoveItem = async (id: number) => {
    await removeItem(id);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  const getCartItem = (id: number) => {
    return data?.cart_items?.find((item) => item.product_id === id);
  };

  const handleCheckoutFromCart = async () => {
    return await checkoutFromCart();
  };

  const handleCancelOrder = async (id: number) => {
    await cancelOrder(id);
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    queryClient.invalidateQueries({ queryKey: ["order", id] });
  };

  const handleCloseOrderSuccess = () => {
    setShowOrderSuccess(false);
    setLastOrder(null);
    router.push("/customer/(tabs)/order");
  };


  const isUpdatingCart = useMemo(
    () =>
      isUpdatingItemQuantity ||
      isAddingItem ||
      isRemovingItem ||
      isClearingCart,
    [isUpdatingItemQuantity, isAddingItem, isRemovingItem, isClearingCart]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: data?.cart_items || [],
        isFetchingCart,
        isRefetchingCart: isRefetching,
        isUpdatingCart,
        isRemovingItem,
        isAddingItem,
        isPlacingOrder,
        isCancellingOrder,
        cartSummary: data?.summary,
        onAddItem: handleAddItem,
        onUpdateItemQuantity: handleUpdateItemQuantity,
        onRemoveItem: handleRemoveItem,
        onClearCart: handleClearCart,
        onCheckoutFromCart: handleCheckoutFromCart,
        onCancelOrder: handleCancelOrder,
        getCartItem,
        showOrderSuccess,
        lastOrder,
        onCloseOrderSuccess: handleCloseOrderSuccess,
      }}
    >
      {children}
      {isUpdatingCart && (
        <View className="flex-1 bg-black/50 z-40 absolute h-full top-0 left-0 right-0 bottom-0 justify-center items-center">
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
    </CartContext.Provider>
  );
}
