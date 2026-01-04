import useExpoPushNotification from "@/hooks/use-expo-push-notification";
import useRefresh from "@/hooks/use-refresh";
import { categoryService } from "@/service/category";
import { productService } from "@/service/product";
import { Product } from "@/type/product";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import { useDebouncedCallback } from 'use-debounce';
import { InputBox, ScreenWrapper, Typography } from "../elements";
import { CategoryFilter } from "../section";
import { ProductCard } from "../ui";
import EmptyProduct from "../ui/lottie/empty-product";


export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = useExpoPushNotification()

  const { isRefreshing, onRefresh } = useRefresh(['products', 'categories'])

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories()
  })

  const { data: infiniteData, isLoading: isLoadingProducts, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['products', selectedCategory, query],
    queryFn: ({ pageParam }) => productService.getProducts(selectedCategory, query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (data) => {
      if (data.meta?.current_page && data.meta?.last_page && data.meta?.current_page < data.meta?.last_page) {
        return data.meta?.current_page + 1;
      }
      return undefined;
    },
  })



  const handleOnSelectCategory = (category: string) => {
    setSelectedCategory(category);
  }

  const debouced = useDebouncedCallback((value: string) => {
    setQuery(value);
  }, 300);



  return (
    <ScreenWrapper edges={[]}>

      <View className="mb-6">
        <Typography.Lg className="font-bold text-gray-800 mb-1">Welcome to Lapina Bakes</Typography.Lg>
        <Typography.Sm className="text-gray-600">Discover our freshly baked delights</Typography.Sm>
      </View>

      <FlatList
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refetch} />}
        ListHeaderComponent={() => (
          <>
            <View className="mb-6">
              <InputBox
                placeholder="Search for cakes, pastries, cookies..."
                startIcon={<Search color="#666" size={20} />}
                onChangeText={debouced}
              // className="h-10"
              />
            </View>

            <View className="mb-4">
              <Typography.Base className="font-semibold text-gray-800 mb-3">Categories</Typography.Base>
              {
                isLoadingCategories ?
                  <ActivityIndicator color="#C85A2B" />
                  : (
                    <CategoryFilter
                      categories={categories || []}
                      onSelect={handleOnSelectCategory}
                      selectedCategory={selectedCategory}
                    />
                  )
              }
            </View>
          </>
        )}
        data={infiniteData?.pages.flatMap((page) => page.products) ?? []}
        numColumns={2}
        columnWrapperClassName="gap-4"
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerClassName="pb-6"

        ListEmptyComponent={() => (
          isLoadingProducts ?
            <ActivityIndicator color="#C85A2B" />
            : (
              <View className="flex-1 items-center justify-center">
                <EmptyProduct width={200} height={200} />
                <Typography.Lg className="text-gray-400">
                  No products found
                </Typography.Lg>
              </View>
            )
        )}
        renderItem={({ item }: { item: Product }) => (
          <ProductCard
            image={item.main_image_url}
            name={item.name}
            price={item.price}
            sellingPrice={item.selling_price}
            discount={item.discount_percentage}
            id={item.id}
            gst={item.gst}
          />
        )}
        keyExtractor={(item: Product) => item.id.toString()}
        scrollEnabled={true}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />

      {/* Products Section */}
      {/* <View>
        <Typography.Base className="font-semibold text-gray-800 mb-3">Fresh from our Oven</Typography.Base>
        {
          isLoadingProducts ?
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator color="#C85A2B" />
            </View>
            : (
              <ProductList
                products={infiniteData?.pages.flatMap((page) => page.products) ?? []}
                hasMore={hasNextPage}
                onLoadMore={fetchNextPage}
              />
            )
        }
      </View> */}
    </ScreenWrapper>
  );
}
