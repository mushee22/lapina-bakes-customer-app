import { orderService } from "@/service/order";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View
} from "react-native";
import { Typography } from "../elements";
import { OrderCard, ScreenWrapper } from "../ui";

import useRefresh from "@/hooks/use-refresh";
import { Order } from "@/type/order";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function OrderScreen() {

  const { data: infiniteData, isLoading: infiniteLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam }) => orderService.getUserOrders(pageParam),
    initialPageParam: 1,
    getNextPageParam: (data) => {
      if (data.meta?.current_page && data.meta?.last_page && data.meta?.current_page < data.meta?.last_page) {
        return data.meta?.current_page + 1;
      }
      return undefined;
    },

  })


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
      {infiniteLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : infiniteData?.pages.length && infiniteData.pages.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl
              colors={["#C85A2B"]}
              refreshing={isRefreshing}
              onRefresh={() => {
                onRefresh()
              }}
            />
          }
          data={infiniteData?.pages.flatMap((page) => page.orders)}
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
              detailViewPathGroup="customer"
            />
          )}
          keyExtractor={(item: Order) => item.id.toString()}
          scrollEnabled={true}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <View className="items-center mt-10">
          <Typography.Lg className="text-gray-400">
            No Orders Found
          </Typography.Lg>
        </View>
      )}
    </ScreenWrapper>
  );
}
