import { orderService } from "@/service/order";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { Typography } from "../elements";
import { OrderCard, ScreenWrapper } from "../ui";

import useRefresh from "@/hooks/use-refresh";
import { Order } from "@/type/order";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function OrderScreen() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => orderService.getUserOrders(page),
  });

  const handleLoadMore = () => {
    if ((data?.meta?.last_page || 0) > page) {
      setPage(page + 1);
    }
  };

  const { isRefreshing, onRefresh } = useRefresh(["orders"]);

  return (
    <ScreenWrapper edges={[]}>
      <View className="mb-4">
        <Typography.Lg className="font-bold text-gray-800">
          Your Orders
        </Typography.Lg>
        <Typography.Sm className="text-gray-600 mt-1">
          Track and manage your bakery orders
        </Typography.Sm>
      </View>

      <ScrollView
        contentContainerClassName="pb-6"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={["#C85A2B"]}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : data?.orders.length ? (
          <FlatList
            data={data.orders}
            ItemSeparatorComponent={() => <View className="h-1" />}
            contentContainerClassName="pb-4"
            ListEmptyComponent={() => (
              <View className="flex-1 items-center justify-center mt-6">
                <Typography.Lg className="text-gray-400">
                  No orders found
                </Typography.Lg>
              </View>
            )}
            renderItem={({ item: order }: { item: Order }) => (
              <OrderCard
                key={order.id}
                id={order.id}
                orderId={order.order_number}
                date={order.created_at}
                total={order.total_amount}
                itemCount={order.order_items?.length}
                status={order.status}
                items={order.order_items}
                detailViewPathGroup="delivery"
              />
            )}
            keyExtractor={(item: Order) => item.id.toString()}
            scrollEnabled={false}
            onEndReached={() => {
              if ((data?.meta?.last_page || 0) > page) {
                handleLoadMore();
              }
            }}
          />
        ) : (
          <View className="items-center mt-10">
            <Typography.Lg className="text-gray-400">
              No Orders Found
            </Typography.Lg>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
