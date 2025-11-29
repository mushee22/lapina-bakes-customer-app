import { Product } from "./product";
import { Location, Store } from "./store";

export type OrderStatus = "order_placed" | "ready_to_dispatch" | "out_of_delivery" |  "delivered" | "cancelled" 

export type OrderItems = {
    id: number,
    order_id: number,
    product_id: number,
    product: Product,
    quantity: number,
    price: number,
    subtotal: number,
    gst_percentage?: number,
    gst_amount?: number,
    subtotal_with_gst?: number,
    created_at: string,
    updated_at: string,
    
}


export type Order = {
    id: number,
    user_id: number,
    order_number: string,
    store_id: number,
    location_id: number,
    location: Location,
    store: Store,
    total_amount: number,
    subtotal_amount: number,
    total_gst_amount: number,
    discount_percentage?: number,
    discount_amount?: number,
    discount_description?: string,
    status: OrderStatus,
    delivery_address: string,
    delivery_boy: User | null,
    phone: string,
    has_invoice: boolean,
    notes?: string,
    order_items: OrderItems[],
    has_invoice: boolean,
    created_at: string,
    updated_at: string,
}


export type CartItem = {
    id: number,
    user_id: number,
    product_id: number,
    product: Product,
    quantity: number,
    price: number,
    total: number,
    notes?: string,

    created_at: string,
    updated_at: string,
}

export type CartSummary = {
    total_items: number,
    subtotal: number,
    currency: string,
}

export type Cart = {
    cart_items: CartItem[],
    summary: CartSummary,
}