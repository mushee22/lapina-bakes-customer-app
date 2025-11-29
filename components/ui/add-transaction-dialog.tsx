import CustomError from "@/lib/error";
import { transactionService } from "@/service/transaction";
import { TransactionAddInput } from "@/type/transaction";
import { useMutation } from "@tanstack/react-query";
import { DollarSign, X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { Button, InputBox, Typography } from "../elements";
import Dialog from "../elements/modal";

interface FormValues {
  transactionable_type: string;
  transactionable_id: number;
  amount?: number;
  payment_mode: string;
  payment_note?: string;
  payment_discount?: number;
  transaction_date?: string;
}

export default function AddTransactionDialog({
  orderAmount,
  orderId,
}: {
  orderAmount: number;
  orderId: number;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleOpen = () => {
    setShowDialog(true);
  };

  const transactionMutation = useMutation({
    mutationFn: (data: FormValues) =>
      transactionService.addNewTransactions(data),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Payment Added",
        text2: "New payment added to the order",
      });
    },
    onError: (error: CustomError) => {
      Toast.show({
        type: "error",
        text1: "Payment Add Filed",
        text2: "Somthing went wrong",
      });
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TransactionAddInput>({
    defaultValues: {
      amount: 0,
      payment_discount: 0.0,
      payment_mode: "cash",
      payment_note: "",
      transactionable_id: orderId,
      transactionable_type: "order",
    },
  });

  const transactionMaxAmount = useMemo(() => {
    const discountAmount = getValues("payment_discount") ?? 0;
    return orderAmount - discountAmount;
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (isValid) {
      await transactionMutation.mutateAsync(data)
    } else {
       Toast.show({
        type: "error",
        text1: "Payment Add Filed",
        text2: "Somthing went wrong",
      });
    }
  };

  return (
    <View>
      <Button variant="secondary" onPress={handleOpen}>
        <DollarSign size={20} color={"black"} />
        <Typography.Base className="ml-2 text-primary">
          Add Transaction
        </Typography.Base>
      </Button>
      <Dialog visible={showDialog} onRequestClose={handleClose}>
        <View className="bg-white flex w-full px-4  pt-4 pb-6 rounded-3xl">
          <View className="flex-row items-center ">
            <Typography.Lg weight="bold" className="flex-1">
              Add New Transaction
            </Typography.Lg>
            <Pressable
              onPress={handleClose}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={20} color="#6B7280" />
            </Pressable>
          </View>
          <View className="gap-y-4 mb-3">
            <View className="gap-y-1">
              <Typography.Base>Amount</Typography.Base>
              <Controller
                control={control}
                name="amount"
                rules={{
                  required: true,
                  max: transactionMaxAmount,
                }}
                render={({ field: { onChange, value } }) => (
                  <InputBox
                    placeholder="Enter the amount"
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChange={onChange}
                  />
                )}
              />
            </View>
            <View className="gap-y-1">
              <Typography.Base>Cash Discount</Typography.Base>
              <Controller
                control={control}
                name="payment_discount"
                rules={{
                  required: false,
                  max: orderAmount,
                }}
                render={({ field: { onChange, value } }) => (
                  <InputBox
                    placeholder="Enter discount amount"
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChange={onChange}
                  />
                )}
              />
            </View>
            <View className="gap-y-1">
              <Typography.Base>Payment Mode</Typography.Base>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 4,
                  paddingVertical: 4,
                }}
              >
                <Controller
                 control={control}
                 name="payment_mode"

                 render={({field:{ value }}) => (
                    <View className="flex-row gap-x-2">
                  {paymentModes.map((mode) => (
                    <TouchableOpacity
                      key={mode.value}
                      activeOpacity={0.7}
                      className={`items-center justify-center rounded-2xl min-w-[80px] ${ value == mode.value ? 'bg-primary text-white': 'bg-white border-green-50' }`}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                      }}
                      onPress={() => {
                        setValue("payment_mode", mode.value);
                      }}
                    >
                      <Typography.Sm
                        className={`font-semibold text-center ${"text-gray-700"}`}
                      >
                        {mode.label}
                      </Typography.Sm>
                    </TouchableOpacity>
                  ))}
                </View>
                 )}
                />
              </ScrollView>
            </View>
            <View className="gap-y-1">
              <Typography.Base>Comment</Typography.Base>
              <Controller
                control={control}
                name="payment_note"
                render={({ field: { onChange, value } }) => (
                  <InputBox
                    placeholder="Enter comment"
                    multiline={true}
                    containerClassName="h-auto"
                    className="min-h-[100px] pt-3 align-top"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </View>
          </View>
          <View className="flex-row gap-x-2">
            <Button className="bg-primary flex-1" onPress={handleSubmit(onSubmit)}>
              <Typography.Base className="text-white">Add</Typography.Base>
            </Button>
            <Button className="flex-1" onPress={handleClose}>
              <Typography.Base className="text-primary">Cancel</Typography.Base>
            </Button>
          </View>
        </View>
      </Dialog>
    </View>
  );
}

const paymentModes = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "Online",
    value: "online",
  },
  {
    label: "Cheque",
    value: "cheque",
  },
  {
    label: "Google Pay",
    value: "google_pay",
  },
];
