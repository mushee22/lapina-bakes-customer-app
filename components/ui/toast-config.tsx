import { Typography } from "@/components/elements";
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react-native";
import React from "react";
import { View, Dimensions } from "react-native";
import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";

const CustomSuccessToast = ({ text1, text2, ...props }: any) => {
  const { width } = Dimensions.get('window');
  return (
    <View 
      className="bg-white mx-4 rounded-2xl shadow-xl border-l-4 border-green-500 p-4 flex-row items-start"
      style={{ 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        maxWidth: width - 32
      }}
    >
      <View className="bg-green-100 rounded-full p-2.5 mr-4 mt-0.5">
        <CheckCircle size={20} color="#16A34A" />
      </View>
      <View className="flex-1">
        <Typography.Base className="font-semibold text-gray-800 mb-1 leading-tight">
          {text1}
        </Typography.Base>
        {text2 && (
          <Typography.Sm className="text-gray-600 leading-relaxed">
            {text2}
          </Typography.Sm>
        )}
      </View>
    </View>
  );
};

const CustomErrorToast = ({ text1, text2, ...props }: any) => {
  const { width } = Dimensions.get('window');
  return (
    <View 
      className="bg-white mx-4 rounded-2xl shadow-xl border-l-4 border-red-500 p-4 flex-row items-start"
      style={{ 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        maxWidth: width - 32
      }}
    >
      <View className="bg-red-100 rounded-full p-2.5 mr-4 mt-0.5">
        <XCircle size={20} color="#DC2626" />
      </View>
      <View className="flex-1">
        <Typography.Base className="font-semibold text-gray-800 mb-1 leading-tight">
          {text1}
        </Typography.Base>
        {text2 && (
          <Typography.Sm className="text-gray-600 leading-relaxed">
            {text2}
          </Typography.Sm>
        )}
      </View>
    </View>
  );
};

const CustomInfoToast = ({ text1, text2, ...props }: any) => {
  const { width } = Dimensions.get('window');
  return (
    <View 
      className="bg-white mx-4 rounded-2xl shadow-xl border-l-4 border-blue-500 p-4 flex-row items-start"
      style={{ 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        maxWidth: width - 32
      }}
    >
      <View className="bg-blue-100 rounded-full p-2.5 mr-4 mt-0.5">
        <Info size={20} color="#2563EB" />
      </View>
      <View className="flex-1">
        <Typography.Base className="font-semibold text-gray-800 mb-1 leading-tight">
          {text1}
        </Typography.Base>
        {text2 && (
          <Typography.Sm className="text-gray-600 leading-relaxed">
            {text2}
          </Typography.Sm>
        )}
      </View>
    </View>
  );
};

const CustomWarningToast = ({ text1, text2, ...props }: any) => {
  const { width } = Dimensions.get('window');
  return (
    <View 
      className="bg-white mx-4 rounded-2xl shadow-xl border-l-4 border-amber-500 p-4 flex-row items-start"
      style={{ 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        maxWidth: width - 32
      }}
    >
      <View className="bg-amber-100 rounded-full p-2.5 mr-4 mt-0.5">
        <AlertCircle size={20} color="#D97706" />
      </View>
      <View className="flex-1">
        <Typography.Base className="font-semibold text-gray-800 mb-1 leading-tight">
          {text1}
        </Typography.Base>
        {text2 && (
          <Typography.Sm className="text-gray-600 leading-relaxed">
            {text2}
          </Typography.Sm>
        )}
      </View>
    </View>
  );
};

export const toastConfig: ToastConfig = {
  success: (props) => <CustomSuccessToast {...props} />,
  error: (props) => <CustomErrorToast {...props} />,
  info: (props) => <CustomInfoToast {...props} />,
  warning: (props) => <CustomWarningToast {...props} />,
};