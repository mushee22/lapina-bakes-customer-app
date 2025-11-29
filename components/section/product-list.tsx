import { Product } from "@/type/product";
import { FlatList, View } from "react-native";
import { Typography } from "../elements";
import { ProductCard } from "../ui";
import EmptyProduct from "../ui/lottie/empty-product";

interface Props {
  products: Product[];
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function ProductList({ products, hasMore, onLoadMore }: Props) {
  return (
    <FlatList
      data={products}
      numColumns={2}
      columnWrapperClassName="gap-4"
      ItemSeparatorComponent={() => <View className="h-4" />}
      contentContainerClassName="pb-6"
      ListEmptyComponent={() => (
        <View className="flex-1 items-center justify-center">
          <EmptyProduct width={200} height={200} />
          <Typography.Lg className="text-gray-400">
            No products found
          </Typography.Lg>
        </View>
      )}
      renderItem={({ item }) => (
        <ProductCard
          image={item.main_image_url}
          name={item.name}
          price={item.price}
          sellingPrice={item.selling_price}
          discount={item.discount_percentage}
          availableQuantity={item.stock}
          id={item.id}
          gst={item.gst}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      onEndReached={() => {
        if (hasMore) {
          onLoadMore();
        }
      }}
    />
  );
}
