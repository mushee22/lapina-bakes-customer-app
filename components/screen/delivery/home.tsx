import LocationFilter from "@/components/section/location-filter";
import OrderCard from "@/components/ui/order-card";
import useRefresh from "@/hooks/use-refresh";
import { commonService } from "@/service/common";
import { orderService } from "@/service/order";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, View } from "react-native";
import { ScreenWrapper, Typography } from "../../elements";

export default function DeliveryBoyHomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { isRefreshing, onRefresh } = useRefresh(['delivery-boy-orders'])

  const { data: { orders = [], meta } = {}, isLoading } = useQuery({
    queryKey: ["delivery-boy-orders", selectedLocation, page],
    queryFn: () => orderService.getDeliveryBoyOrders(selectedLocation, page),
  });

  const { data: locations = [], isLoading: isLoadingLocations } = useQuery({
    queryKey: ["delivery-boy-locations"],
    queryFn: () => commonService.getLocations(),
  });

  const handleLoadMore = () => {
    if ((meta?.last_page || 0) > page) {
      setPage(page + 1);
    }
  };

  const handleOnSelectCategory = (location: string) => {
    setSelectedLocation(location);
    setPage(1);
  };

  return (
    <ScreenWrapper edges={[]}>
      <View className="mb-4">
        <Typography.Lg className="font-bold text-gray-800">
          Your Orders to Deliver
        </Typography.Lg>
        <Typography.Sm className="text-gray-600 mt-1">
          Track and manage your bakery orders to be delivered
        </Typography.Sm>
      </View>
      <View className="mb-4">
        <Typography.Base className="font-semibold text-gray-800 mb-3">
          Locations
        </Typography.Base>
        {isLoadingLocations ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator color="#C85A2B" />
          </View>  
        ) : (
          <LocationFilter
            locations={locations}
            onSelectLocation={handleOnSelectCategory}
            selectedLocation={selectedLocation ?? ""}
          />
        )}
      </View>
      <ScrollView 
       showsVerticalScrollIndicator={false} 
       className="flex-1"
       refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>}
      >
      <View className="flex-1">
        {isLoading ? (
          <View className="flex-1 items-center justify-center mt-6">
            <ActivityIndicator  color="#C85A2B"/>
          </View>
        ) : (
          <FlatList
            
            data={orders}
            ItemSeparatorComponent={() => <View className="h-1" />}
            contentContainerClassName="pb-6"
            ListEmptyComponent={() => (
              <View className="flex-1 items-center justify-center mt-6">
                <Typography.Lg className="text-gray-400">
                  No orders found
                </Typography.Lg>
              </View>
            )}
            renderItem={({ item: order }) => (
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
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            onEndReached={() => {
              if ((meta?.last_page || 0) > page ) {
                handleLoadMore();
              }
            }}
          />
        )}
      </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
