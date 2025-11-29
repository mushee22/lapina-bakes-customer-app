import { CURRENCY } from "@/constants";
import { Image, View } from "react-native";
import { Typography } from "../elements";

interface OrderItemCardProps {
  name?: string;
  price?: number;
  quantity?: number;
  image?: string;
  gst_percentage?: number;
  gst_amount?: number;
  total?: number;
}

export default function OrderItemCard({ 
  name = "",
  price = 0,
  quantity = 0,
  gst_percentage = 0,
  gst_amount = 0,
  total = 0,
  image
}: OrderItemCardProps) {
  // const total = price * quantity;
  
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100">
      <View className="flex-row items-center">
        <View className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
          <Image
            source={image ? { uri: image } : require('@/assets/images/logo.jpg')}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1 ml-4">
          <Typography.Base className="font-semibold text-gray-800 mb-1" numberOfLines={2}>
            {name}
          </Typography.Base>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Typography.Sm className="text-gray-600">Qty: </Typography.Sm>
              <Typography.Sm className="font-semibold text-primary">{quantity}</Typography.Sm>
            </View>
            <Typography.Base className="font-bold text-primary">
              {CURRENCY}{total?.toFixed(2)}
            </Typography.Base>
          </View>
          <Typography.Sm className="text-gray-500 mt-1">
            {CURRENCY}{price} each
          </Typography.Sm>
          {
            gst_amount > 0 && (
              <View className="flex-row items-center">
                <Typography.Sm className="text-gray-600">Tax({gst_percentage}%): </Typography.Sm>
                <Typography.Sm className="text-gray-500 mt-1">
                  {CURRENCY}{gst_amount}
                </Typography.Sm>
              </View>
            )
          }
        </View>
      </View>
    </View>
  );
}