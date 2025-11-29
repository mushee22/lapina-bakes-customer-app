import { Typography } from "@/components/elements";
import OrderStatusBadge from "@/components/ui/order-status";
import { CURRENCY } from "@/constants";
import { themeConfig } from "@/constants/theme-config";
import { OrderItems, OrderStatus } from "@/type/order";
import { Link } from "expo-router";
import { Calendar, ChevronRight, Clock, Package } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

interface OrderCardProps {
  id: number;
  orderId?: string;
  date?: string;
  time?: string;
  total?: number;
  itemCount?: number;
  status?: OrderStatus;
  items?: OrderItems[];
}

export default function OrderCard({
  id,
  orderId,
  date,
  total,
  itemCount,
  status,
  items 
}: OrderCardProps) {

  const dateString = new Date(date || "").toLocaleDateString();
  const timeString = new Date(date || "").toLocaleTimeString();

  

  return (
    <Link href={`/delivery/order/${id}`} asChild>
      <TouchableOpacity activeOpacity={0.95}>
        <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-3">
          {/* Header Section */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                <Package size={20} color={themeConfig.colors.brand} />
              </View>
              <View>
                <Typography.Base className="font-bold text-gray-800">Order {orderId}</Typography.Base>
                <View className="flex-row  items-center mt-1">
                  <Calendar size={12} color="#666" />
                  <Typography.Sm className="text-gray-500 ml-1 mr-1">{dateString}</Typography.Sm>
                  <Clock size={12} color="#666" className="" />
                  <Typography.Sm className="text-gray-500 ml-1">{timeString}</Typography.Sm>
                </View>
              </View>
            </View>
            <View className="items-end">
              <Typography.Lg className="font-bold text-primary">{CURRENCY}{total}</Typography.Lg>
              <Typography.Sm className="text-gray-500">{itemCount} items</Typography.Sm>
            </View>
          </View>

          {/* Items Preview */}
          <View className="flex-row flex-wrap gap-2 mb-3">
            {items?.slice(0, 3).map((item, index) => (
              <OrderItem key={index} productName={item.product.name} quantity={item.quantity} />
            ))}
            {items?.length && items.length > 3 && (
              <View className="bg-gray-100 px-3 py-1 rounded-full">
                <Typography.Sm className="text-gray-600">+{items.length - 3} more</Typography.Sm>
              </View>
            )}
          </View>

          {/* Footer */}
          <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
            <OrderStatusBadge status={status || "pending"} />
            <View className="flex-row items-center">
              <Typography.Sm className="text-gray-500 mr-1">View Details</Typography.Sm>
              <ChevronRight size={14} color="#666" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export function OrderItem({
  productName,
  quantity,
}: {
  productName: string;
  quantity: number;
}) {
  return (
    <View className="bg-primary/10 px-3 py-1 rounded-full flex-row items-center">
      <Typography.Sm className="text-primary font-medium">
        {productName}
      </Typography.Sm>
      <Typography.Sm className="text-primary/60 font-bold mx-1">
        ×
      </Typography.Sm>
      <Typography.Sm className="text-primary font-bold">
        {quantity}
      </Typography.Sm>
    </View>
  );
}
