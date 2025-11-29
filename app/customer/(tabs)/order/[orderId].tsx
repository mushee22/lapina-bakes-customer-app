import { Button, ScreenWrapper, Typography } from "@/components/elements";
import OrderItemCard from "@/components/ui/order-item-card";
import OrderStatus from "@/components/ui/order-status";
import PhoneCallLink from "@/components/ui/phone-call-link";
import { CURRENCY } from "@/constants";
import { useCartContext } from "@/hooks/use-cart";
import useDownloadInvoice from "@/hooks/use-download-invoice";
import useRefresh from "@/hooks/use-refresh";
import { orderService } from "@/service/order";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import {
  Clock,
  DownloadIcon,
  MapPin,
  Phone,
  Receipt,
  User
} from "lucide-react-native";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";

export default function Index() {
  const { orderId } = useLocalSearchParams();

  const { onCancelOrder, isCancellingOrder } = useCartContext();

  
  const { isRefreshing, onRefresh } = useRefresh([`order`, `${orderId}`])
  
  
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderService.getOrder(Number(orderId)),
    enabled: !!orderId,
  });
  
  const { onDownloadInvoice, isDownloadingInvoice } = useDownloadInvoice(orderId as string, order?.order_number || "");

  const handleCancelOrder = async () => {
    if (!orderId) return;
    await onCancelOrder(Number(orderId));
    refetch();
  };

  return (
    <ScreenWrapper edges={[]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-4">
            <View className="flex-row justify-between items-center mb-3">
              <Typography.Xl className="font-bold text-gray-800">
                Order #123456
              </Typography.Xl>
              <OrderStatus status={order?.status || "order_placed"} />
            </View>
            <View className="flex-row items-center">
              <Clock size={16} color="#666" />
              <Typography.Sm className="text-gray-600 ml-2">
                Placed on{" "}
                {order?.created_at
                  ? new Date(order.created_at).toLocaleString()
                  : ""}
              </Typography.Sm>
            </View>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerClassName="pb-6"
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl colors={['#C85A2B']} refreshing={isRefreshing} onRefresh={onRefresh}/>}
          >
            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <Receipt size={20} color="#C85A2B" />
                <Typography.Lg className="font-semibold text-gray-800 ml-2">
                  Order Items
                </Typography.Lg>
              </View>
              <View className="gap-y-3">
                {order?.order_items?.map((item) => (
                  <OrderItemCard
                    key={item.id}
                    name={item.product?.name || ""}
                    price={item.price || 0}
                    quantity={item.quantity || 0}
                    image={item.product?.main_image_url || ""}
                    gst_amount={item.gst_amount || 0}
                    gst_percentage={item.gst_percentage || 0}
                    total={item.subtotal_with_gst || item.subtotal || 0}
                  />
                ))}
              </View>
            </View>

            <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-4">
              <View className="flex-row items-center mb-3">
                <MapPin size={20} color="#C85A2B" />
                <Typography.Lg className="font-semibold text-gray-800 ml-2">
                  Store Information
                </Typography.Lg>
              </View>
              <View className="bg-gray-50 rounded-xl p-3">
                <Typography.Base className="font-semibold text-gray-800 mb-1">
                  {order?.delivery_address || ""}
                </Typography.Base>

                {order?.location?.name && (
                  <Typography.Base className="text-gray-600 mb-2">
                    {order?.location?.name || ""}
                  </Typography.Base>
                )}

                <View className="flex-row items-center">
                  <Phone size={14} color="#666" />
                  <Typography.Sm className="text-gray-600 ml-1">
                    {order?.phone || ""}
                  </Typography.Sm>
                </View>
              </View>
            </View>

            {order?.delivery_boy ? (
              <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-4">
                <View className="flex-row items-center mb-3">
                  <User size={20} color="#C85A2B" />
                  <Typography.Lg className="font-semibold text-gray-800 ml-2">
                    Delivery Boy Information
                  </Typography.Lg>
                </View>
                <View className="bg-gray-50 rounded-xl p-3">
                  <Typography.Base className="font-semibold text-gray-800 mb-1">
                    {order?.delivery_boy?.name || ""}
                  </Typography.Base>

                  {order?.delivery_boy?.phone && (
                    <PhoneCallLink phone={order?.delivery_boy?.phone || ""} />
                  )}
                </View>
              </View>
            ) : null}

            {order?.notes ? (
              <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-4">
                <Typography.Lg className="font-semibold text-gray-800 mb-4">
                  Special Instructions
                </Typography.Lg>
                <Typography.Sm className="text-gray-600">
                  {order?.notes || ""}
                </Typography.Sm>
              </View>
            ) : null}

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
                    {order?.subtotal_amount || 0}
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
                    Tax
                  </Typography.Base>
                  <Typography.Base className="font-medium">
                    {CURRENCY}
                    {order?.total_gst_amount || 0}
                  </Typography.Base>
                </View>
                {order?.discount_amount ? (
                  <View className="flex-row justify-between py-2">
                    <View>
                      <Typography.Base className="text-green-600">
                        Discount ({order?.discount_percentage || 0}%)
                      </Typography.Base>
                      {order?.discount_description ? (
                        <Typography.Sm className="text-gray-600">
                          ({order?.discount_description || ""})
                        </Typography.Sm>
                      ) : null}
                    </View>
                    <Typography.Base className="font-medium text-green-600">
                      -{CURRENCY} {order?.discount_amount || 0}
                    </Typography.Base>
                  </View>
                ) : null}

                <View className="border-t border-gray-200 pt-3">
                  <View className="flex-row justify-between">
                    <Typography.Lg className="font-bold text-gray-800">
                      Total
                    </Typography.Lg>
                    <Typography.Lg className="font-bold text-primary">
                      {CURRENCY} {order?.total_amount || 0}
                    </Typography.Lg>
                  </View>
                </View>
              </View>
            </View>

            {order?.status === "delivered" && order.has_invoice ? (
              <Button
                isLoading={isDownloadingInvoice}
                onPress={onDownloadInvoice}
                variant="primary"
                className="bg-primary border-primary shadow-sm"
              >
                <DownloadIcon size={20} color="white" className="" />
                <Typography.Base className="text-white font-semibold ml-2">
                  Download Invoice
                </Typography.Base>
              </Button>
            ) : null}
            {order?.status === "order_placed" && (
              <Button
                isLoading={isCancellingOrder}
                onPress={handleCancelOrder}
                variant="primary"
                className="bg-red-500 border-red-500 shadow-sm"
              >
                <Typography.Base className="text-white font-semibold">
                  Cancel Order
                </Typography.Base>
              </Button>
            )}
          </ScrollView>
        </>
      )}
    </ScreenWrapper>
  );
}
