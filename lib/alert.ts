import { Alert } from "react-native";

const AlertDialog = {
    validationError(message?: string): void {
      Alert.alert("Validation Error", message || "Invalid form");
    },
    success(message?: string): void {
      Alert.alert("Success", message || "Operation successful");
    },
    error(message?: string): void {
      Alert.alert("Error", message || "Something went wrong");
    },
}

export default AlertDialog;