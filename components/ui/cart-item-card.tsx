import { CURRENCY } from "@/constants";
import { CartItem } from "@/type/order";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Typography } from "../elements";
import AddToCartBottomSheet from "./add-to-cart-bottom-sheet";
import CartItemDeleteButton from "./cart-item-delete";

interface CartItemCardProps extends CartItem {
  onQuantityPress?: () => void;
  onAdd?: () => void;
}

export default function CartItemCard({ 
  onQuantityPress,
  onAdd,
  ...cartItem
}: CartItemCardProps) {

  const [visible, setVisible] = useState(false);

  const total = cartItem.price * cartItem.quantity;
  const product = cartItem.product;
  
  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-100 mb-3">
      <View className="flex-row items-center">
        <View className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
          <Image
            source={product?.main_image_url ? { uri: product.main_image_url } : require('@/assets/images/logo.jpg')}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1 ml-4">
          <Typography.Base className="font-semibold text-gray-800 mb-1" numberOfLines={2}>
            {product.name}
          </Typography.Base>
          <Typography.Sm className="text-gray-500 mb-1">
            {CURRENCY}{cartItem.price.toFixed(2)} each
          </Typography.Sm>
          {
            product.gst && (
              <Typography.Sm className="text-gray-500 mb-1">
                GST({product.gst}%)
              </Typography.Sm>
            )
          }
    
          
          <View className="flex-row items-center justify-between">
            {/* Row format: Delete | Quantity | Add */}
            <View className="flex-row items-center bg-gray-50 rounded-lg">
              <CartItemDeleteButton cartItem={cartItem}/>
              
              <TouchableOpacity 
                onPress={onQuantityPress}
                className="px-4 py-2 border-x border-gray-200"
                activeOpacity={0.7}
              >
                <Typography.Base className="font-semibold text-primary min-w-[20px] text-center">
                  {cartItem.quantity}
                </Typography.Base>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="p-2"
                activeOpacity={0.7}
                onPress={() => setVisible(true)}
              >
                <Plus size={16} color="#22c55e" />
              </TouchableOpacity>
            </View>
            
            <Typography.Base className="font-bold text-primary">
              {CURRENCY}{total.toFixed(2)}
            </Typography.Base>
          </View>
        </View>
      </View>
      <AddToCartBottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        product={{
          id: product.id,
          name: product.name,
          sellingPrice: product.selling_price,
          price: product.price,
          image: product.main_image_url,
          availableQuantity: product.stock,
          gst: product.gst,
        }}
      />
    </View>
  );
}