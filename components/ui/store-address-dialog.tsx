import { Store } from "@/type/store";
import { Globe, Mail, MapPin, Phone, X } from "lucide-react-native";
import { Linking, Pressable, View } from "react-native";
import { Typography } from "../elements";
import Dialog from "../elements/modal";

export interface StoreAddressDialogProps {
  visible: boolean;
  onClose: () => void;
  data?: Store;
}

export default function StoreAddressDialog(props: StoreAddressDialogProps) {
  const { visible, onClose, data } = props;

  if (!data) return null;

  const handlePhoneCall = () => {
    if (data.phone) {
      Linking.openURL(`tel:${data.phone}`);
    }
  };

  const handleEmailPress = () => {
    if (data.email) {
      Linking.openURL(`mailto:${data.email}`);
    }
  };

  const handleWebsitePress = () => {
    if (data.website) {
      Linking.openURL(data.website.startsWith('http') ? data.website : `https://${data.website}`);
    }
  };

  return (
    <Dialog visible={visible} onRequestClose={onClose} className="justify-center">
      <View className="bg-white rounded-3xl w-full max-h-[85%]">
        {/* Header */}
        <View className="flex-row justify-between items-center p-6 pb-4 border-b border-gray-100">
          <Typography.Xl className="font-bold text-gray-800">
            Store Information
          </Typography.Xl>
          <Pressable 
            onPress={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={20} color="#6B7280" />
          </Pressable>
        </View>

        {/* Store Details */}
        <View className="p-6">
          {/* Store Name */}
      

          {/* Contact Information */}
          <View className="gap-y-2">
            {/* Address */}
            <View className="flex-row items-start p-4 bg-gray-50 rounded-xl">
              <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-4">
                <MapPin size={20} color="#F97316" />
              </View>
              <View className="flex-1">
                <Typography.Base className="font-semibold text-gray-800 mb-1">
                  Address
                </Typography.Base>
                <Typography.Base className="text-gray-600 leading-relaxed">
                  {data.address}
                </Typography.Base>
              </View>
            </View>

            {/* Phone */}
            {data.phone && (
              <Pressable onPress={handlePhoneCall}>
                <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
                  <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
                    <Phone size={20} color="#22C55E" />
                  </View>
                  <View className="flex-1">
                    <Typography.Base className="font-semibold text-gray-800 mb-1">
                      Phone
                    </Typography.Base>
                    <Typography.Base className="text-green-600 underline">
                      {data.phone}
                    </Typography.Base>
                  </View>
                </View>
              </Pressable>
            )}

            {/* Email */}
            {data.email && (
              <Pressable onPress={handleEmailPress}>
                <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4">
                    <Mail size={20} color="#3B82F6" />
                  </View>
                  <View className="flex-1">
                    <Typography.Base className="font-semibold text-gray-800 mb-1">
                      Email
                    </Typography.Base>
                    <Typography.Base className="text-blue-600 underline">
                      {data.email}
                    </Typography.Base>
                  </View>
                </View>
              </Pressable>
            )}

            {/* Website */}
            {data.website && (
              <Pressable onPress={handleWebsitePress}>
                <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
                  <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-4">
                    <Globe size={20} color="#8B5CF6" />
                  </View>
                  <View className="flex-1">
                    <Typography.Base className="font-semibold text-gray-800 mb-1">
                      Website
                    </Typography.Base>
                    <Typography.Base className="text-purple-600 underline">
                      {data.website}
                    </Typography.Base>
                  </View>
                </View>
              </Pressable>
            )}

          </View>

        </View>
      </View>
    </Dialog>
  );
}
