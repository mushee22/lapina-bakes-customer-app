import { usePlatform } from "@/hooks/use-platform";
import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { CartButton } from "../ui";
import Typography from "./Typography";

export function StackHeader({ title, isCart = true, isBackButtonVisible = true }: { title: string, isCart?: boolean, isBackButtonVisible?: boolean }) {
  const { isIOS } = usePlatform();
  
  return (
    <View className={cn(
      "flex-row items-end  gap-x-3 bg-primary justify-center  py-4",
      isIOS ? "h-[90px] px-5" : "h-[80px] px-3"
    )}>
      {
        isBackButtonVisible && <BackButton label="Back"/>
      }
     <View className="flex-1 items-center">
         <Typography.Lg className="font-bold text-white">{title}</Typography.Lg>
     </View>
      <View className="absolute right-0 bottom-4">
        {
        isCart && <CartButton/>
      }
      </View>
    </View>
  );
}

export function BackButton({ label }: { label?: string }) {
    const router = useRouter();
    const handlePress = () => {
        router.back();
    };
  return (
    <TouchableOpacity className="flex-row rounded-full absolute left-0 bottom-4 items-end" onPress={handlePress}>
      <ChevronLeft color="#fff" />
      <Typography.Lg className="font-bold text-white">{label ?? ''}</Typography.Lg>
    </TouchableOpacity>
  );
}