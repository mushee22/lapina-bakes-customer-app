import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Pressable, View } from "react-native";
import Typography from "./Typography";

export interface BadgeProps {
  label?: string;
  icon?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}


export default function Badge({label, icon, ...rest}: BadgeProps) {
  const { variant = "primary", onClick, className } = rest;

  const variantClass = variant === "primary" ? "bg-brand text-white border border-white hover:bg-brand/80" : "bg-none text-brand border border-primary hover:bg-primary/10";
  const variantTextClass = variant === "primary" ? "text-white" : "text-primary";
  
  return (
    <Pressable  className={cn("text-xs font-medium p-2 rounded-lg", variantClass, className)} onPress={onClick}>
        {
            icon && <View className="mr-1">{icon}</View>
        }
        <Typography.Sm className={variantTextClass}>{label}</Typography.Sm>
    </Pressable>
  );
}