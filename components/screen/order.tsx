import { orderService } from "@/service/order";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import { Typography } from "../elements";
import { OrderCard, ScreenWrapper } from "../ui";

import useRefresh from "@/hooks/use-refresh";
import { useQuery } from "@tanstack/react-query";

export default function OrderScreen() {
  
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.getUserOrders(),
  });

  const { isRefreshing, onRefresh } = useRefresh(["orders"])

  return (
    <ScreenWrapper edges={[]}>
      <View className="mb-4">
        <Typography.Lg className="font-bold text-gray-800">Your Orders</Typography.Lg>
        <Typography.Sm className="text-gray-600 mt-1">Track and manage your bakery orders</Typography.Sm>
      </View>
      <ScrollView 
        contentContainerClassName="pb-6" 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl colors={['#C85A2B']} refreshing={isRefreshing} onRefresh={onRefresh}/>}
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : (
          data?.orders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              orderId={order.order_number}
              date={order.created_at}
              total={order.total_amount}
              itemCount={order.order_items?.length}
              status={order.status}
              items={order.order_items}
              detailViewPathGroup="customer"
            />
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
