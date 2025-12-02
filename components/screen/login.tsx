import { Typography } from "@/components/elements";
import { Logo, ScreenWrapper } from "@/components/ui";
import { KeyboardAvoidingView, View } from "react-native";
import { LoginForm } from "../section";

export default function LoginScreen() {
  return (
    <ScreenWrapper className="flex-1">
      <KeyboardAvoidingView className="flex-1" behavior="padding" >
      <View className="flex-1 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 ">
        <View className="flex-1 justify-center">
          <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 mx-2">
            <View className="items-center mb-8">
              <View className="bg-gradient-to-r from-orange-400 to-pink-500 p-4 rounded-full mb-6 shadow-xl">
                <Logo size="md" shape="rounded" />
              </View>
              <Typography.Xl className="font-bold text-gray-800">
                 Welcome Back!
              </Typography.Xl>
            </View>
            <LoginForm />
          </View>
        </View>
      </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
