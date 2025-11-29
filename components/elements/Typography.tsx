import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Text } from "react-native";

export interface TypographyProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "muted";
  size?: "base" | "lg" | "sm" | "xl";
  weight?: "regular" | "medium" | "semibold" | "bold";
  numberOfLines?: number;
}

export default function Typography({children, numberOfLines, ...rest}: TypographyProps) {
  return (
    <Text className={generateCombinedClass(rest)} numberOfLines={numberOfLines}>{children}</Text>
  );
}

Typography.Base = TypographyBase;
Typography.Lg = TypographyLg;
Typography.Sm = TypographySm;
Typography.Xl = TypographyXl;

function TypographyBase(props: TypographyProps) {
  const combinedClassName = generateCombinedClass({ size: "base", weight: "medium", ...props });
  return (
    <Typography className={cn("text-base font-medium", combinedClassName)}>
      {props.children}
    </Typography>
  );
}

function TypographyLg(props: TypographyProps) {
  const combinedClassName = generateCombinedClass({ size: "lg", weight: "medium", ...props });
  return (
    <Typography className={cn("text-lg font-medium", combinedClassName)}>
      {props.children}
    </Typography>
  );
}

function TypographySm(props: TypographyProps) {
  const combinedClassName = generateCombinedClass({ size: "sm", weight: "medium", ...props });
  return (
    <Typography className={cn("text-sm font-medium", combinedClassName)}>
      {props.children}
    </Typography>
  );
}

function TypographyXl(props: TypographyProps) {
  const combinedClassName = generateCombinedClass({ size: "xl", weight: "medium", ...props });
  return (
    <Typography className={cn("text-xl font-medium", combinedClassName)}>
      {props.children}
    </Typography>
  );
}



function generateCombinedClass(props:Omit<TypographyProps, 'children'>) {
    const { className, variant = "primary", size = "base", weight = "medium" } = props;
   const variantClassName =
    variant === "primary"
      ? "text-primary"
      : variant === "secondary"
      ? "text-white"
      : "text-muted";

  const sizeClassName =
    size === "base"
      ? "text-base"
      : size === "lg"
      ? "text-lg"
      : size === "sm"
      ? "text-sm"
      : "text-xl";
  const weightClassName =
    weight === "regular"
      ? "font-regular"
      : weight === "medium"
      ? "font-medium"
      : weight === "semibold"
      ? "font-semibold"
      : "font-bold";

  const combineClassName = cn(variantClassName, sizeClassName, weightClassName, className);

  return combineClassName;
}