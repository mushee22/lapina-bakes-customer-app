import { useCartContext } from "@/hooks/use-cart";
import { useRouter } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "../elements";

export default function CartButton() {
  const { cartItems, cartSummary } = useCartContext();
  
  const route = useRouter();
  
  const cartCount = cartItems.length;
  
  const onPress = () => {
    route.navigate('/customer/cart');
  };

  if(!cartSummary?.total_items) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} className="flex-row items-center justify-center w-8 h-8 border relative border-primary bg-secondary rounded-full gap-x-2 mr-2">
      <ShoppingCart color="#C85A2B" size={22} />
      <View className="bg-brand p-[2px] text-white leading-none text-xs rounded-full min-w-4 min-h-4 items-center justify-center absolute -top-1.5 right-0">
        <Typography.Sm className="text-white text-xs">{cartCount}</Typography.Sm>
      </View>
    </TouchableOpacity>
  );
}
