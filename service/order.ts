import apiClient from "@/lib/api-client";
import { Order } from "@/type/order";

class OrderService {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'orders';
    }

    async getUserOrders(page?: number) {
        const urlParams = new URLSearchParams()
        if (page) {
            urlParams.append("page", page.toString())
        }
        const response = await apiClient.get<Order[]>(this.baseUrl + '?' + urlParams.toString());
        return {
            orders: response.data,
            meta: response.meta || undefined,
        };
    }

    async getOrder(id: number) {
        const response = await apiClient.get<Order>(this.baseUrl + '/' + id);
        return response.data;
    }

    async checkoutFromCart() {
        const response = await apiClient.post<{ order: Order }>(`${this.baseUrl}/checkout`);
        return response.data?.order || undefined;
    }

    async cancelOrder(id: number, notes?: string) {
        const response = await apiClient.put<Order>(`${this.baseUrl}/${id}/status-delivery`, {
            method: "PATCH",
            body: JSON.stringify({
                status: "cancelled",
                notes
            })
        });
        return response.data;
    }

    async getDeliveryBoyOrders(location_id?: string | null, page?: number) {
        const urlParams = new URLSearchParams()
        
        if (page) {
            urlParams.append("page", page.toString())
        }
        
        if (location_id) {
            urlParams.append("location_id", location_id.toString())
        }
        
        const response = await apiClient.get<Order[]>(`${this.baseUrl}/delivery-boy/my-orders?` + urlParams.toString());
        

        return {
            orders: response.data,
            meta: response.meta || undefined,
        };
    }

   async markAsDelivered(orderId: number) {
    const response = await apiClient.put<Order>(`${this.baseUrl}/${orderId}/status-delivery`, {
        method: "PATCH",
        body: JSON.stringify({
            status: "delivered",
        })
    });
    return response.data;
   }
}

export const orderService = new OrderService()