import { useState } from "react";

export default function usePasswordToggle(defaultValue = false) {
    const [showPassword, setShowPassword] = useState(defaultValue);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return {
        showPassword,
        toggleShowPassword
    }
}