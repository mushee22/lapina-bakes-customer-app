import { ScreenWrapper, Typography } from "@/components/elements";
import DeliveryBoyLocationListDialog from "@/components/ui/delivery-boy-location-list-dialog";
import LogoutModal from "@/components/ui/logout-modal";
import StoreAddressDialog from "@/components/ui/store-address-dialog";
import { themeConfig } from "@/constants/theme-config";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  HelpCircle,
  LogOut,
  Package,
  Shield
} from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isStoreAddressDialogVisible, setIsStoreAddressDialogVisible] = useState(false);

  const router = useRouter();
  const { user, onLogout } = useAuthContext();

  return (
    <>
      <ScreenWrapper edges={[]}>
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-6">
            <View className="flex-row items-center">
              <View className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-primary/20">
                <Image
                  source={require("@/assets/images/logo.jpg")}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1 ml-4">
                <Typography.Lg className="font-bold text-gray-800 mb-1">
                  {user?.name}
                </Typography.Lg>
                <Typography.Sm className="text-gray-600">
                  {user?.email}
                </Typography.Sm>
                <Typography.Sm className="text-gray-600">
                  {user?.phone}
                </Typography.Sm>
              </View>
            </View>
          </View>

          <View className="flex-row flex-[4] gap-3 mb-6">
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100">
              <View className="items-center">
                <Typography.Lg className="font-bold text-primary">
                  {user?.delivery_boy_statistics?.pending_orders}
                </Typography.Lg>
                <Typography.Sm className="text-gray-600 text-center">
                  Total Orders
                </Typography.Sm>
              </View>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100">
              <View className="items-center">
                <Typography.Lg className="font-bold text-primary">
                  {user?.delivery_boy_statistics?.pending_orders}
                </Typography.Lg>
                <Typography.Sm className="text-gray-600 text-center">
                  Pending Orders
                </Typography.Sm>
              </View>
            </View>
            <View className="flex-1  bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100">
              <View className="items-center">
                <Typography.Lg className="font-bold text-primary">
                  {user?.delivery_boy_statistics?.completed}
                </Typography.Lg>
                <Typography.Sm className="text-gray-600 text-center">
                  Completed Orders
                </Typography.Sm>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl shadow-sm shadow-black/5 border border-gray-100 mb-6">
            <ProfileMenuItem
              icon={<Package size={20} color={themeConfig.colors.brand} />}
              title="Orders"
              subtitle="Orders in your locations"
              onPress={() => router.push("/delivery/(tabs)/home")}
            />

            <DeliveryBoyLocationListDialog/>
          </View>

          <View className="bg-white rounded-2xl shadow-sm shadow-black/5 border border-gray-100 mb-6">
            <ProfileMenuItem
              icon={<Shield size={20} color={themeConfig.colors.brand} />}
              title="Privacy Policy"
              subtitle="Data usage and privacy information"
            />
            <ProfileMenuItem
              icon={<HelpCircle size={20} color={themeConfig.colors.brand} />}
              title="Help & Support"
              subtitle="FAQs and customer service"
              showBorder
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsLogoutModalVisible(true)}
            className="bg-red-50 rounded-2xl p-4 shadow-sm shadow-black/5 border border-red-100 mb-6"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-red-100 items-center justify-center mr-3">
                <LogOut size={20} color="#EF4444" />
              </View>
              <View className="flex-1">
                <Typography.Base className="font-semibold text-red-600">
                  Logout
                </Typography.Base>
                <Typography.Sm className="text-red-500">
                  Sign out of your account
                </Typography.Sm>
              </View>
              <ChevronRight size={20} color="#EF4444" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ScreenWrapper>
      <LogoutModal
        visible={isLogoutModalVisible}
        onLogout={() => {
          onLogout();
          setIsLogoutModalVisible(false);
        }}
        onCancel={() => setIsLogoutModalVisible(false)}
      />
      <StoreAddressDialog
        visible={isStoreAddressDialogVisible}
        onClose={() => setIsStoreAddressDialogVisible(false)}
        data={user?.primary_store}
      />
    </>
  );
}

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  showBorder?: boolean;
  onPress?: () => void;
}

export function ProfileMenuItem({
  icon,
  title,
  subtitle,
  showBorder = false,
  onPress,
}: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`flex-row items-center p-4 ${showBorder ? "border-t border-gray-100" : ""}`}
    >
      <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
        {icon}
      </View>
      <View className="flex-1">
        <Typography.Base className="font-semibold text-gray-800 mb-1">
          {title}
        </Typography.Base>
        <Typography.Sm className="text-gray-600">{subtitle}</Typography.Sm>
      </View>
      <ChevronRight size={20} color="#666" />
    </TouchableOpacity>
  );
}
