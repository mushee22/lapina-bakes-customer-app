import { cn } from "@/lib/utils";
import { OrderStatus } from "@/type/order";
import { Typography } from "../elements";

export default function OrderStatusBadge({status}: {status: keyof typeof ORDER_STATUS}) {
    const statusConfig = ORDER_STATUS[status] ?? ORDER_STATUS.order_placed;
    
    return (
        <Typography.Base className={cn(`font-bold px-3 py-1 rounded-full ${statusConfig.className}`)}>
            {statusConfig.label}
        </Typography.Base>
    )
}

const ORDER_STATUS: Record<OrderStatus, { label: string; className: string; }> = {
    order_placed: {
        label: "Order Placed",
        className: "text-white bg-yellow-400 ",
    },
    out_of_delivery: {
        label: "Out of Delivery",
        className: "text-white bg-blue-400 ",
    },
    delivered: {
        label: "Delivered",
        className: "text-white bg-success ",
    },
    cancelled: {
        label: "Cancelled",
        className: "text-white bg-red-400 ",
    },
    ready_to_dispatch: {
        label: "Ready to Dispatch",
        className: "text-white bg-primary ",
    },
}

