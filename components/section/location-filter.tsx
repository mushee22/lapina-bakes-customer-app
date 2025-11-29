import { Location } from "@/type/store";
import { MapPin } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Typography } from "../elements";

interface Props {
  locations: Location[];
  onSelectLocation: (location: string) => void;
  selectedLocation: string;
}

export default function LocationFilter({
  locations,
  onSelectLocation,
  selectedLocation,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 4 }}
    >
      <View className="flex-row gap-4">
        <LocationBadge
          id={"all"}
          isSelected={selectedLocation === ""}
          name={"All"}
          onSelect={() => onSelectLocation("")}
        />
        {locations.map((location) => {
          const isSelected = selectedLocation === location.id.toString();

          return (
            <LocationBadge
              key={location.id}
              id={location.id.toString()}
              isSelected={isSelected}
              name={location.name}
              onSelect={onSelectLocation}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

interface CategoryBadge {
  id: string;
  onSelect: (category: string) => void;
  isSelected: boolean;
  name: string;
}

function LocationBadge({ id, onSelect, isSelected, name }: CategoryBadge) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(id)}
      className={`items-center flex-row gap-x-1 justify-center rounded-2xl min-w-[80px] ${
        isSelected
          ? "bg-primary shadow-sm shadow-primary/10"
          : "bg-white shadow-sm shadow-black/5"
      }`}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: isSelected ? 0 : 1,
        borderColor: isSelected ? "transparent" : "#E5E7EB",
      }}
    >
      <MapPin size={16} color={isSelected ? "white" : "gray"} />
      <Typography.Sm
        className={`font-semibold text-center ${
          isSelected ? "text-white" : "text-gray-700"
        }`}
      >
        {name}
      </Typography.Sm>
    </TouchableOpacity>
  );
}
