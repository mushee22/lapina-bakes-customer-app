import { Button, ScreenWrapper, Typography } from "@/components/elements";
import CartItemCard from "@/components/ui/cart-item-card";
import EmptyProduct from "@/components/ui/lottie/empty-product";
import OrderSuccessModal from "@/components/ui/order-success-modal";
import { CURRENCY } from "@/constants";
import { useCartContext } from "@/hooks/use-cart";
import { usePlatform } from "@/hooks/use-platform";
import { cn } from "@/lib/utils";
import { MapPin, Phone, ShoppingBag, Trash } from "lucide-react-native";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function Index() {
  const { isIOS } = usePlatform();

  const {
    cartItems,
    cartSummary,
    isFetchingCart,
    onClearCart,
    onCheckoutFromCart,
    isPlacingOrder,
    showOrderSuccess,
    lastOrder,
    onCloseOrderSuccess,
  } = useCartContext();

  const subtotal = cartSummary?.subtotal || 0;
  const tax = Math.round(subtotal * 0.08);
  const total = cartSummary?.subtotal || 0;

  return (
    <ScreenWrapper edges={[]}>
      <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-4">
        <View className="flex-row justify-between items-center">
          <Typography.Xl className="font-bold text-gray-800">
            Your Cart
          </Typography.Xl>
          <View className="flex-row items-center">
            <View className="flex-row items-center bg-primary/10 px-3 py-1.5 rounded-full">
              <ShoppingBag size={16} color="#C85A2B" />
              <Typography.Sm className="text-primary font-semibold ml-1">
                {cartItems?.length || 0}{" "}
                {cartItems?.length === 1 ? "item" : "items"}
              </Typography.Sm>
            </View>
            <Button className="ml-2 h-auto py-1.5 px-2" onPress={onClearCart}>
              <Trash size={16} color="#C85A2B" />
              <Typography.Sm className="text-primary font-semibold ml-1">
                Clear cart
              </Typography.Sm>
            </Button>
          </View>
        </View>
      </View>

      {isFetchingCart ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#C85A2B" />
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1"
            contentContainerClassName="pb-6"
            showsVerticalScrollIndicator={false}
          >
            {cartItems && cartItems?.length > 0 ? (
              <View className="mb-4">
                <View className="gap-y-3">
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={item.product_id}
                      onQuantityPress={() => {}}
                      onAdd={() => {}}
                      {...item}
                    />
                  ))}
                </View>
              </View>
            ) : (
              <View className="flex-1 justify-center items-center py-20">
                <EmptyProduct width={200} height={200} />
                <Typography.Lg className="text-gray-500 mt-4 text-center">
                  Your cart is empty
                </Typography.Lg>
              </View>
            )}

            {cartItems && cartItems?.length > 0 && (
              <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-4">
                <View className="flex-row items-center mb-3">
                  <MapPin size={20} color="#C85A2B" />
                  <Typography.Lg className="font-semibold text-gray-800 ml-2">
                    Delivery Address
                  </Typography.Lg>
                </View>
                <View className="bg-gray-50 rounded-xl p-3">
                  <Typography.Base className="font-semibold text-gray-800 mb-1">
                    Lapina Bakes
                  </Typography.Base>
                  <Typography.Sm className="text-gray-600 mb-1">
                    123 Baker Street, Sweet Valley
                  </Typography.Sm>
                  <Typography.Sm className="text-gray-600 mb-2">
                    City Center, 12345
                  </Typography.Sm>
                  <View className="flex-row items-center">
                    <Phone size={14} color="#666" />
                    <Typography.Sm className="text-gray-600 ml-1">
                      (555) 123-CAKE
                    </Typography.Sm>
                  </View>
                </View>
              </View>
            )}

            {cartItems && cartItems?.length > 0 && (
              <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-4">
                <Typography.Lg className="font-semibold text-gray-800 mb-4">
                  Order Summary
                </Typography.Lg>
                <View className="space-y-3">
                  <View className="flex-row justify-between py-2">
                    <Typography.Base className="text-gray-600">
                      Subtotal
                    </Typography.Base>
                    <Typography.Base className="font-medium">
                      {CURRENCY}
                      {subtotal}
                    </Typography.Base>
                  </View>
                  <View className="flex-row justify-between py-2">
                    <Typography.Base className="text-gray-600">
                      Delivery Fee
                    </Typography.Base>
                    <Typography.Base className="font-medium">
                      Free
                    </Typography.Base>
                  </View>
                  <View className="flex-row justify-between py-2">
                    <Typography.Base className="text-gray-600">
                      Tax (8%)
                    </Typography.Base>
                    <Typography.Base className="font-medium">
                      {CURRENCY}
                      {tax}
                    </Typography.Base>
                  </View>
                  <View className="border-t border-gray-200 pt-3">
                    <View className="flex-row justify-between">
                      <Typography.Lg className="font-bold text-gray-800">
                        Total
                      </Typography.Lg>
                      <Typography.Lg className="font-bold text-primary">
                        {CURRENCY}
                        {total}
                      </Typography.Lg>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {cartItems && cartItems?.length > 0 && (
            <View className={cn("px-4", isIOS ? "pb-8" : "pb-4")}>
              <Button
                className="bg-primary text-white font-bold rounded-2xl h-14 items-center justify-center shadow-lg shadow-primary/25"
                onPress={onCheckoutFromCart}
                disabled={isPlacingOrder}
                isLoading={isPlacingOrder}
              >
                <View className="flex-row items-center">
                  {!isPlacingOrder && (
                    <ShoppingBag size={20} color="white" />
                  )}
                  <Typography.Lg className="text-white font-semibold ml-2">
                    {isPlacingOrder ? "Placing Order..." : `Place Order • ${CURRENCY}${total}`}
                  </Typography.Lg>
                </View>
              </Button>
            </View>
          )}
        </>
      )}

      {showOrderSuccess ? (
      <OrderSuccessModal
        order={lastOrder}
      />
      ) : null}
    </ScreenWrapper>
  );
}
