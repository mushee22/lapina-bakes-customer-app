import { Button, InputBox, Typography } from "@/components/elements";
import { useAuthContext } from "@/hooks/use-auth-context";
import usePasswordToggle from "@/hooks/use-password-toggle";
import AlertDialog from "@/lib/alert";
import { ApiResponse } from "@/lib/api-client";
import CustomError from "@/lib/error";
import { extractErrorMessages } from "@/lib/helper";
import { authService } from "@/service/auth";
import { LoginResponse } from "@/type/auth";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react-native";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";

export interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  
  const { showPassword, toggleShowPassword } = usePasswordToggle();
  const { onSuccessFullyLogin } = useAuthContext()
  
  const { mutateAsync: loginMutation } = useMutation<ApiResponse<LoginResponse>, CustomError, FormValues>({
        mutationFn: async (payload) => authService.login(payload),
        onSuccess: (data) => {
            onSuccessFullyLogin?.(data.data?.user, data.data?.token)
        },
        onError: (error) => {
            AlertDialog.error(error.message);
        } 
    })

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (isValid) {
      await loginMutation(data)
    } else {
      AlertDialog.error("Something went wrong");
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    const errorMessage = extractErrorMessages<FormValues>(errors);
    AlertDialog.validationError(errorMessage);
  };

  return (
    <View className="w-full">
      <View className="gap-y-5">
        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <InputBox
              placeholder="Enter Your email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              startIcon={<Mail size={22} color="#FB923C" />}
            />
          )}
        />

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
          }}
          render={({ field: { onChange, value } }) => (
            <InputBox
              placeholder="Enter Your Password"
              secureTextEntry={!showPassword}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              startIcon={<Lock size={22} color="#FB923C" />}
              endIcon={
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={toggleShowPassword}
                  className="p-2 bg-orange-100 rounded-full"
                >
                  {showPassword ? (
                    <Eye size={18} color="#FB923C" />
                  ) : (
                    <EyeClosed size={18} color="#FB923C" />
                  )}
                </TouchableOpacity>
              }
            />
          )}
        />
      </View>

      <Button
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmit, onError)}
        disabled={isSubmitting}
        className="mt-4"
        variant="primary"
      >
        <Typography.Lg className="text-white font-bold text-center">
          Login
        </Typography.Lg>
      </Button>
    </View>
  );
}
