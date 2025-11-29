import Fontisto from "@expo/vector-icons/Fontisto";


export interface IconProps {
    name: keyof typeof Fontisto.glyphMap;
    size: 'sm' | 'md' | 'lg';
    className?: string;
    variant?: 'primary' | 'secondary';
}

export default function Icon({name, size, className, variant}: IconProps) {
    const color = variant === 'primary' ? '#C85A2B' : '#3B2F2F';
    const sizeMap = {
        sm: 16,
        md: 20,
        lg: 24,
    }
    return (
        <Fontisto 
         name={name} 
         size={sizeMap[size]}
         color={color} 
         className={`${className}`} 
        />
    )
}