import { cn } from "@/lib/utils";
import { Image } from "react-native";

export function Logo(
    { size = 'md', className, shape = 'none' }: 
    {
        size: 'sm' | 'md' | 'lg'; 
        className?: string; 
        shape?: 'rounded' | 'curved' | 'none'
    }
) {

  const logoSizeVariantClass = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-64 h-64',
  }[size];

  const logoShapeClass = {
    rounded: 'rounded-full',
    curved: 'rounded-md',
    none: 'rounded-none'
  }[shape]

  return (
    <Image
      source={require("@/assets/images/logo.jpg")}
      className={cn("rounded-full", logoSizeVariantClass, logoShapeClass, className)}
    />
  );
}