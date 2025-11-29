import { Typography } from "@/components/elements";
import { CURRENCY } from "@/constants";
import { Order } from "@/type/order";
import { Package } from "lucide-react-native";
import { View } from "react-native";
import Success from "./lottie/success";

interface OrderSuccessModalProps {
  // visible: boolean;
  // onClose: () => void;
  order: Order | null;
}

export default function OrderSuccessModal({
  order,
}: OrderSuccessModalProps) {
  
 
  return (
    // <Dialog visible={visible} onRequestClose={onClose} className="">
    // </Dialog>
      <View className="bg-green-500  absolute inset-0 z-50">
        <View className="flex-row justify-between items-center p-6 pb-4">
          <View className="flex-1">
            <Typography.Xl className="font-bold text-white">
              Order Success
            </Typography.Xl>
          </View>
        </View>
        <View className="items-center px-6 pb-6">
          <View className="bg-green-50 rounded-full p-2 mb-4">
            <Success width={200} height={200} speed={0.5} loop={false} autoPlay={true} />
          </View>
          <Typography.Lg className="font-semibold text-white text-center mb-2">
            Your order has been placed!
          </Typography.Lg>
        </View>

        <View className="mx-6 mb-2">
          <View className="bg-gray-50 rounded-2xl p-5">
            <View className="items-start mb-4">
              <Typography.Lg className="font-semibold text-gray-800">
                Order #{order?.order_number}
              </Typography.Lg>
            </View>
            <View className="space-y-4">
              <View className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-3">
                    <Package size={16} color="#3B82F6" />
                  </View>
                  <Typography.Base className="text-gray-700">Total Amount</Typography.Base>
                </View>
                <Typography.Lg className="font-bold text-gray-800">
                  {CURRENCY}{order?.total_amount}
                </Typography.Lg>
              </View>
          </View>
         </View>
        </View>
      </View>
  );
}