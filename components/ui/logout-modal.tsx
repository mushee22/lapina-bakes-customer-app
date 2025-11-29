import { View } from "react-native";
import { Button, Typography } from "../elements";
import Dialog from "../elements/modal";

export interface LogoutModalProps {
  visible: boolean;
  onLogout: () => void;
  onCancel: () => void;
}

export default function LogoutModal(props: LogoutModalProps) {
  const { onLogout, onCancel, visible } = props;
  return (
    <Dialog
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 w-full">
        <Typography.Lg className="font-bold text-gray-800 mb-1">
          Logout
        </Typography.Lg>
        <Typography.Sm className="text-gray-600">
          Are you sure you want to logout?
        </Typography.Sm>
        <View className="flex-row gap-4 mt-4">
          <Button
            activeOpacity={0.8}
            onPress={() => {
              onLogout();
              onCancel();
            }}
            className="flex-1 bg-red-50 rounded-2xl  shadow-sm shadow-black/5 border border-red-100"
          >
            <Typography.Base className="font-semibold text-red-600">
              Logout
            </Typography.Base>
          </Button>
          <Button
            activeOpacity={0.8}
            onPress={() => onCancel()}
            className="flex-1 bg-gray-50 rounded-2xl  shadow-sm shadow-black/5 border border-gray-200"
          >
            <Typography.Base className="font-semibold text-gray-600">
              Cancel
            </Typography.Base>
          </Button>
        </View>
      </View>
    </Dialog>
  );
}
