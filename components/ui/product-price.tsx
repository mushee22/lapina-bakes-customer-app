import { CURRENCY } from "@/constants";
import { View } from "react-native";
import { Typography } from "../elements";

export default function ProductPrice({
  price,
  sellingPrice,
}: {
  price: number;
  sellingPrice?: number;
}) {
  return (
    <View className="flex-row items-baseline">
      <Typography.Sm className="text-primary font-bold text-lg">
        {CURRENCY}
        {sellingPrice || price}
      </Typography.Sm>
      {sellingPrice && price > sellingPrice && (
        <Typography.Sm className="text-gray-400 line-through ml-2">
          {CURRENCY}
          {price}
        </Typography.Sm>
      )}
    </View>
  );
}