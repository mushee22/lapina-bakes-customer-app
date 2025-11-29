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
          {/* Floating Glass Card */}
          <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 mx-2">
            {/* Animated Header */}
            <View className="items-center mb-8">
              <View className="bg-gradient-to-r from-orange-400 to-pink-500 p-4 rounded-full mb-6 shadow-xl">
                <Logo size="md" shape="rounded" />
              </View>
              
              <Typography.Xl className="font-bold text-gray-800">
                 Welcome Back!
              </Typography.Xl>
              {/* <Typography.Base className="text-gray-600 text-center">
                Ready to bake some magic? ✨
              </Typography.Base> */}
            </View>

            {/* Login Form */}
            <LoginForm />
            
            {/* Fun Footer */}
            {/* <View className="items-center mt-6 pt-6 border-t border-gray-200">
              <Typography.Sm className="text-gray-500 text-center">
                Sweet dreams are made of cakes 🧁
              </Typography.Sm>
            </View> */}
          </View>
        </View>
      </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
