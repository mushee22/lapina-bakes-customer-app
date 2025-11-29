import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react-native";
import { View } from "react-native";
import { Typography } from "../elements";

export default function TabBarIcon({
  icon: LucideIcon,
  color,
  name,
  isFocused,
  className,
}: {
  icon: LucideIcon;
  color: string;
  name: string;
  isFocused: boolean;
  className?: string;
}) {
  return (
    <View className="flex-1 w-12 items-center gap-y-1">
      <LucideIcon color={isFocused ? "#C85A2B" : "gray"} />
      <Typography.Sm
        className={cn(
          "text-xs",
          { "font-bold": isFocused },
          { "text-[#C85A2B]": isFocused },
          className
        )}
      >
        {name}
      </Typography.Sm>
    </View>
  );
}
