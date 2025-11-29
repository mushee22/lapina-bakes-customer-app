import { Category } from "@/type/product";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Typography } from "../elements";

interface Props {
  categories: Category[];
  onSelect: (category: string) => void;
  selectedCategory: string;
}

export default function CategoryFilter({ categories, onSelect, selectedCategory }: Props) {

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 4 }}
    >
      <View className="flex-row gap-4">
        <CategoryBadge
          id={"all"}
          isSelected={selectedCategory === ""}
          name={"All"}
          onSelect={() => onSelect("")}
        />
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id.toString();

          return (
            <CategoryBadge
              key={category.id}
              id={category.id.toString()}
              isSelected={isSelected}
              name={category.name}
              onSelect={onSelect}
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

function CategoryBadge({ id, onSelect, isSelected, name }: CategoryBadge) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(id)}
      className={`items-center justify-center rounded-2xl min-w-[80px] ${
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
