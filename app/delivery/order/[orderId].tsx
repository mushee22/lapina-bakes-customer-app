import { Button, ScreenWrapper, Typography } from "@/components/elements";
import AddTransactionDialog from "@/components/ui/add-transaction-dialog";
import CancelOrder from "@/components/ui/order-cancellation";
import OrderItemCard from "@/components/ui/order-item-card";
import OrderStatus from "@/components/ui/order-status";
import PhoneCallLink from "@/components/ui/phone-call-link";
import { CURRENCY } from "@/constants";
import useDownloadInvoice from "@/hooks/use-download-invoice";
import useOrderStatusChange from "@/hooks/use-order-status-change";
import { usePlatform } from "@/hooks/use-platform";
import useRefresh from "@/hooks/use-refresh";
import { orderService } from "@/service/order";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Clock, DownloadIcon, MapPin, Receipt } from "lucide-react-native";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";

export default function Index() {

  const { orderId } = useLocalSearchParams();

  const { isRefreshing, onRefresh } = useRefresh(['order'])

  const { isIOS } = usePlatform()

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderService.getOrder(Number(orderId)),
    enabled: !!orderId,
  });

  const { isDownloadingInvoice, onDownloadInvoice } = useDownloadInvoice(orderId as string, order?.order_number || "")
  const { onMarkAsDelivered, isMarkingAsDelivered } = useOrderStatusChange()

  return (
    <ScreenWrapper edges={[]} className={isIOS ? 'pb-6' : 'pb-3'}>
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
            refreshControl={
            <RefreshControl 
             refreshing={isRefreshing}
             onRefresh={onRefresh} 
            />
          }
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
                    gst_amount={item.gst_amount}
                    gst_percentage={item.gst_percentage}
                    total={item.subtotal_with_gst || item.subtotal}
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
                <Typography.Sm className="text-gray-600 mb-2">
                  {order?.store?.name || ""}
                </Typography.Sm>
                <Typography.Base className="font-semibold text-gray-800 mb-1">
                  {order?.delivery_address || ""}
                </Typography.Base>
                <View className="flex-row items-center">
                  {order?.phone ? (
                    <PhoneCallLink phone={order?.phone || ""} />
                  ) : null}
                </View>
              </View>
            </View>

            {order?.notes ? (
              <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-4">
                <Typography.Lg className="font-semibold text-gray-800 mb-4">
                  Notes
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
                    {order?.subtotal_amount}
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
                    {order?.total_gst_amount}
                  </Typography.Base>
                </View>
                <View className="border-t border-gray-200 pt-3">
                  <View className="flex-row justify-between">
                    <Typography.Lg className="font-bold text-gray-800">
                      Total
                    </Typography.Lg>
                    <Typography.Lg className="font-bold text-primary">
                      {CURRENCY}
                      {order?.total_amount}
                    </Typography.Lg>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="gap-y-2">

           {
              order?.status === "out_of_delivery" ?
              <Button 
               variant="primary" 
               disabled={isMarkingAsDelivered} 
               isLoading={isMarkingAsDelivered} 
               className="bg-success"
               isConfirm={true}
               confirmButtonText="Yes"
               cancelButtonText="No"
               onConfirm={() => {
                onMarkAsDelivered(orderId as string);
               }}
               confirmTitle="Mark as delivered"
               confirmSubtitle="Are you sure you want to mark this order as delivered?"
               >
                <Typography.Base className="ml-2 text-white">
                  Mark As Delivered
                </Typography.Base>
              </Button>
              :
              null
            } 

            { order?.status === "delivered" ? 
              <AddTransactionDialog 
               orderAmount={order.total_amount} 
               orderId={order.id} /> 
               : 
               null
            }

            

            {
              order && order?.status !== "delivered" && order?.status !== "cancelled" ?
              <CancelOrder orderId={order.id}/>
              :
              null
            }
            {order?.has_invoice && order.status == "delivered" ? (
              <Button variant="primary" onPress={onDownloadInvoice} disabled={isDownloadingInvoice} isLoading={isDownloadingInvoice} className="bg-primary">
                <DownloadIcon size={20} color={"white"} />
                <Typography.Base className="ml-2 text-white">
                  Download Incoice
                </Typography.Base>
              </Button>
            ) : null}
          </View>
        </>
      )}
    </ScreenWrapper>
  );
}
