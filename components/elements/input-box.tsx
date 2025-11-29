import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

export interface InputBoxProps extends TextInputProps {
    placeholder?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    onChangeText?: (text: string) => void;
    value?: string;
    containerClassName?: string;
}

export default function InputBox(props: InputBoxProps) {
    const { placeholder, startIcon, endIcon, onChangeText, value, containerClassName, className, ...rest } = props;
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className={cn(
            "flex flex-row items-center rounded-2xl h-16 px-5 border-2 bg-white/90 w-full",
            isFocused 
                ? "border-orange-400 shadow-lg shadow-orange-200" 
                : "border-gray-200 shadow-md shadow-gray-100",
            containerClassName
        )}>
            {startIcon && (
                <View className="mr-3" style={{ opacity: isFocused ? 0.8 : 0.6 }}>
                    {startIcon}
                </View>
            )}
            <TextInput 
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={cn("flex-1 text-gray-900", className)} 
                placeholderTextColor="#9CA3AF"
                style={{
                    fontSize: 16,
                    fontWeight: '500',
                }}
                {...rest}
            />
            {endIcon && (
                <View className="ml-3" style={{ opacity: isFocused ? 0.8 : 0.6 }}>
                    {endIcon}
                </View>
            )}
        </View>
    )
}