import useOrderStatusChange from "@/hooks/use-order-status-change";
import { X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Button, InputBox, Typography } from "../elements";
import Dialog from "../elements/modal";

export default function CancelOrder({ orderId }: { orderId: number }) {

  const [showDialog, setShowDialog] = useState(false);
  const [notes, setNotes] = useState("");

  const { onCancelOrder, isCancellingOrder } = useOrderStatusChange();

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleOpen = () => {
    setShowDialog(true);
  };

  const handleCancelOrder = async () => {
    await onCancelOrder(orderId, notes);
    handleClose();
  };

  return (
    <View>
      <Button variant="primary" className="bg-red-500" onPress={handleOpen} isLoading={isCancellingOrder} disabled={isCancellingOrder}>
        <X size={20} color={"white"} />
        <Typography.Base className="ml-2 text-white">
          Cancel Order
        </Typography.Base>
      </Button>
      <Dialog visible={showDialog} onRequestClose={handleClose}>
        <View className="bg-white flex w-full px-4  pt-4 pb-6 rounded-3xl">
          <View className="flex-row items-center ">
            <Typography.Lg weight="bold" className="flex-1">
              Add Comment
            </Typography.Lg>
            <Pressable
              onPress={handleClose}
              disabled={isCancellingOrder}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={20} color="#6B7280" />
            </Pressable>
          </View>
          <View className="gap-y-1 mt-1">
            <InputBox
              placeholder="Comment"
              multiline={true}
              containerClassName="h-auto"
              className="min-h-[100px] pt-3 align-top"
              onChangeText={(text) => setNotes(text)}
              value={notes}
            />
          </View>
          <View className="flex-row gap-x-2 mt-2">
            <Button className="bg-primary flex-1" isLoading={isCancellingOrder} disabled={isCancellingOrder} onPress={handleCancelOrder}>
              <Typography.Base className="text-white">Confirm</Typography.Base>
            </Button>
            <Button className="flex-1" onPress={handleClose} disabled={isCancellingOrder}>
              <Typography.Base className="text-primary">Cancel</Typography.Base>
            </Button>
          </View>
        </View>
      </Dialog>
    </View>
  );
}
