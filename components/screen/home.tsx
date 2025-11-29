import useRefresh from "@/hooks/use-refresh";
import { categoryService } from "@/service/category";
import { productService } from "@/service/product";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import { useDebouncedCallback } from 'use-debounce';
import { InputBox, ScreenWrapper, Typography } from "../elements";
import { CategoryFilter, ProductList } from "../section";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);

  const { isRefreshing, onRefresh } = useRefresh(['products', 'categories'])

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories()
  })

  const {data: {products = [], meta = {last_page: 1}} = {}, isLoading: isLoadingProducts} = useQuery({
    queryKey: ['products', selectedCategory, query, page],
    queryFn: () => productService.getProducts(selectedCategory, query, page)
  })

  const handleLoadMore = () => {
    if((meta?.last_page) > page) {
      setPage(page + 1);
    }
  }

  const handleOnSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  }

  const debouced = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);



  return (
      <ScreenWrapper edges={[]}>
        <ScrollView 
         showsVerticalScrollIndicator={false} 
         className="flex-1"
         refreshControl={
         <RefreshControl 
          refreshing={isRefreshing} 
          onRefresh={onRefresh}
         />
        }
         >
          {/* Header Section */}
          <View className="mb-6">
            <Typography.Lg className="font-bold text-gray-800 mb-1">Welcome to Lapina Bakes</Typography.Lg>
            <Typography.Sm className="text-gray-600">Discover our freshly baked delights</Typography.Sm>
          </View>

          {/* Search Section */}
          <View className="mb-6">
            <InputBox
              placeholder="Search for cakes, pastries, cookies..."
              startIcon={<Search color="#666" size={20} />}
              onChangeText={debouced}
              // className="h-10"
            />
          </View>

          {/* Categories Section */}
          <View className="mb-4">
            <Typography.Base className="font-semibold text-gray-800 mb-3">Categories</Typography.Base>
            {
              isLoadingCategories ?
              <ActivityIndicator color="#C85A2B"/>
              :(
                <CategoryFilter 
                  categories={categories || []}
                  onSelect={handleOnSelectCategory}
                  selectedCategory={selectedCategory}
                />
              )
            }
          </View>

          {/* Products Section */}
          <View>
            <Typography.Base className="font-semibold text-gray-800 mb-3">Fresh from our Oven</Typography.Base>
            {
              isLoadingProducts ?
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator color="#C85A2B"/>
              </View>
              :(
                <ProductList 
                  products={products}
                  hasMore={(meta?.last_page) > page }
                  onLoadMore={handleLoadMore}
                />
              )
            }
          </View>
        </ScrollView>
      </ScreenWrapper>
  );
}
