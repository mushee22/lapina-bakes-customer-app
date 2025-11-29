import { queryClient } from "@/provider/react-query-provider";
import { orderService } from "@/service/order";
import { Order } from "@/type/order";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export default function useOrderStatusChange() {
    const { mutateAsync: markAsDelivered, isPending: isMarkingAsDelivered } = useMutation({
        mutationKey: ["markAsDelivered"],
        mutationFn: (orderId: string) => orderService.markAsDelivered(Number(orderId)),
        onSuccess: (data) => {
           Toast.show({
            type: "success",
            text1: "Order marked as delivered",
            text2: "The order has been marked as delivered",
           });
           queryClient.invalidateQueries({queryKey: ['order', 'delivery-boy-orders']})
        },
        onError: (error) => {
           Toast.show({
            type: "error",
            text1: "Failed to mark order as delivered",
            text2: "Please try again",
           });
        }
    });

    const { mutateAsync: cancelOrder, isPending: isCancellingOrder } = useMutation<Order, Error, { orderId: number, notes: string }>({
        mutationKey: ["cancelOrder"],
        mutationFn: ({ orderId, notes }) => orderService.cancelOrder(orderId, notes),
        onSuccess: (data) => {
            Toast.show({
                type: "success",
                text1: "Order cancelled",
                text2: "The order has been cancelled",
            });
            queryClient.invalidateQueries({queryKey: ['order', 'delivery-boy-orders']})
        },
        onError: (error) => {
            Toast.show({
                type: "error",
                text1: "Failed to cancel order",
                text2: "Please try again",
            });
        }
    });

    const onMarkAsDelivered = async (orderId: string) => {
        await markAsDelivered(orderId);
    }

    const onCancelOrder = async (orderId: number, notes: string) => {
        await cancelOrder({orderId, notes});
    }

    return {
        onMarkAsDelivered,
        onCancelOrder,
        isMarkingAsDelivered,
        isCancellingOrder
    }
}