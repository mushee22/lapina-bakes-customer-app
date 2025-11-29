import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Dialog from "./modal";
import Typography from "./Typography";

export interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  containerClassName?: string;
  leadinIcon?: ReactNode;
  endIcon?: ReactNode;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  touchableOpacity?: number;
  isLoading?: boolean;
  isConfirm?: boolean;
  onConfirm?: () => void;
  confirmTitle?: string;
  confirmSubtitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export default function Button(props: ButtonProps) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    children,
    className,
    containerClassName,
    touchableOpacity = 0.5,
    leadinIcon,
    endIcon,
    onPress,
    variant,
    isLoading = false,
    isConfirm = false,
    onConfirm,
    confirmTitle = "Confirm",
    confirmSubtitle = "Are you sure you want to continue?",
    confirmButtonText = "Confirm",
    cancelButtonText = "Cancel",
    ...rest
  } = props;

  const variantClassName =
    variant === "primary"
      ? "bg-brand text-white"
      : "bg-none border border-primary text-primary";

  const handlePress = (event: GestureResponderEvent) => {
     if(!isConfirm) {
       onPress?.();
     } else {
      setOpenConfirm(true);
     }
  }    

  return (
    <>
      <TouchableOpacity
        className={cn(
          " h-12  flex-col justify-center rounded-3xl",
          variantClassName,
          className
        )}
        activeOpacity={touchableOpacity}
        onPress={handlePress}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator className="text-white" />
        ) : (
          <View className={cn("flex-row items-center justify-center")}>
            {leadinIcon && <View className="mr-2">{leadinIcon}</View>}
            {children}
            {endIcon && <View className="ml-2">{endIcon}</View>}
          </View>
        )}
      </TouchableOpacity>
      <Dialog
        visible={openConfirm}
        onRequestClose={() => setOpenConfirm(false)}
      >
        <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 w-full">
          <Typography.Lg className="font-bold text-gray-800 mb-1">
            {confirmTitle}
          </Typography.Lg>
          <Typography.Sm className="text-gray-600">
            {confirmSubtitle}
          </Typography.Sm>
          <View className="flex-row gap-4 mt-4">
            <Button
              activeOpacity={0.8}
              onPress={() => {
                onConfirm?.();
                setOpenConfirm(false);
              }}
              className="flex-1 bg-primary rounded-2xl  shadow-sm shadow-black/5"
            >
              <Typography.Base className="font-semibold text-white">
                {confirmButtonText}
              </Typography.Base>
            </Button>
            <Button
              activeOpacity={0.8}
              onPress={() => setOpenConfirm(false)}
              className="flex-1 bg-gray-50 rounded-2xl  shadow-sm shadow-black/5 border border-gray-200"
            >
              <Typography.Base className="font-semibold text-gray-600">
                {cancelButtonText}
              </Typography.Base>
            </Button>
          </View>
        </View>
      </Dialog>
    </>
  );
}
