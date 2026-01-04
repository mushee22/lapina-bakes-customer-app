import { Product } from "@/type/product";

interface Props {
  products: Product[];
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function ProductList({ products, hasMore, onLoadMore }: Props) {
  return (
    // <FlatList
    //   ListHeaderComponent={() => (
    //     <>
    //     <View className="mb-6">
    //     <InputBox
    //       placeholder="Search for cakes, pastries, cookies..."
    //       startIcon={<Search color="#666" size={20} />}
    //       onChangeText={debouced}
    //     // className="h-10"
    //     />
    //   </View>

    //   <View className="mb-4">
    //     <Typography.Base className="font-semibold text-gray-800 mb-3">Categories</Typography.Base>
    //     {
    //       isLoadingCategories ?
    //         <ActivityIndicator color="#C85A2B" />
    //         : (
    //           <CategoryFilter
    //             categories={categories || []}
    //             onSelect={handleOnSelectCategory}
    //             selectedCategory={selectedCategory}
    //           />
    //         )
    //     }
    //   </View>
    //     </>
    //   )}
    //   data={products}
    //   numColumns={2}
    //   columnWrapperClassName="gap-4"
    //   ItemSeparatorComponent={() => <View className="h-4" />}
    //   contentContainerClassName="pb-6"
    //   ListEmptyComponent={() => (
    //     <View className="flex-1 items-center justify-center">
    //       <EmptyProduct width={200} height={200} />
    //       <Typography.Lg className="text-gray-400">
    //         No products found
    //       </Typography.Lg>
    //     </View>
    //   )}
    //   renderItem={({ item }) => (
    //     <ProductCard
    //       image={item.main_image_url}
    //       name={item.name}
    //       price={item.price}
    //       sellingPrice={item.selling_price}
    //       discount={item.discount_percentage}
    //       id={item.id}
    //       gst={item.gst}
    //     />
    //   )}
    //   keyExtractor={(item) => item.id.toString()}
    //   scrollEnabled={true}
    //   onEndReached={() => {
    //     if (hasMore) {
    //       onLoadMore();
    //     }
    //   }}
    // />
    <></>
  );
}
