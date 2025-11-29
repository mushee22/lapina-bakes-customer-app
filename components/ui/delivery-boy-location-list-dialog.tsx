import { themeConfig } from "@/constants/theme-config";
import { commonService } from "@/service/common";
import { Store } from "@/type/store";
import { useQuery } from "@tanstack/react-query";
import { MapIcon, MapPin, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Typography } from "../elements";
import Dialog from "../elements/modal";
import { ProfileMenuItem } from "../screen/delivery/profile";

export interface Props {
  visible: boolean;
  onClose: () => void;
  data?: Store;
}

export default function DeliveryBoyLocationListDialog() {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => {
    setShowDialog(true);
  }

  const handleCloseDialog = () => {
    setShowDialog(false);
  }

  const { data: locations = [], isLoading: isLoadingLocations } = useQuery({
    queryKey: ["delivery-boy-locations", showDialog],
    queryFn: () => commonService.getLocations(),
    enabled:showDialog
  });

  return (
    <>
      <ProfileMenuItem
        icon={<MapIcon size={20} color={themeConfig.colors.brand} />}
        title="Locations"
        subtitle="Locations you can deliver to"
        onPress={handleOpenDialog}
      />
      <Dialog
        visible={showDialog}
        onRequestClose={handleCloseDialog}
        className="justify-center"
      >
        <View className="bg-white rounded-3xl w-full max-h-[85%]">
          {/* Header */}
          <View className="flex-row justify-between items-center p-6 pb-4 border-b border-gray-100">
            <Typography.Lg className="font-bold text-gray-800">
             Locations You Can Deliver To
            </Typography.Lg>
            <Pressable
              onPress={handleCloseDialog}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={20} color="#6B7280" />
            </Pressable>
          </View>

          <ScrollView className="p-6">
            <View className="gap-y-3">
              {
                locations.map((location) => (
                  <View key={location.id} className="flex-row gap-x-1 items-center bg-gray-50 rounded-2xl p-2">
                    <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mr-2">
                    <MapPin size={24} color={themeConfig.colors.brand} />
                  </View>
                  <View className="flex-1">
                    <Typography.Base className="font-semibold text-gray-800 mb-1">
                      {location.name}
                    </Typography.Base>
                  </View>
                  </View>
                ))
              }
            </View>
          </ScrollView>
        </View>
      </Dialog>
    </>
  );
}
