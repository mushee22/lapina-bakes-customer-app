import { Phone } from "lucide-react-native";
import { Alert, Linking, TouchableOpacity } from "react-native";
import { Typography } from "../elements";

export default function PhoneCallLink({ phone = "" }: { phone: string }) {

  const makeAPhoneCall = async() => {
    try {
      const supported = await Linking.canOpenURL(`tel:${phone}`);
      if (!supported) {
        Alert.alert("Phone number is not supported");
        return;
      }
      Linking.openURL(`tel:${phone}`);
    } catch (error) {
      console.error("Error opening phone app:", error);
    }
  };   

  return (
    <TouchableOpacity
      className="flex-row items-center"
      onPress={makeAPhoneCall}
    >
      <Phone size={12} color="#C85A2B" />
      <Typography.Sm className="text-gray-600 ml-1">
        {phone}
      </Typography.Sm>
    </TouchableOpacity>
  );
}