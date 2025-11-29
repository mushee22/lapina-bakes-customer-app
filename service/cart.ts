import apiClient from "@/lib/api-client";
import { Cart } from "@/type/order";

class CartService {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'cart';
    }

    async getUserCart() {
        const response = await apiClient.get<Cart>(this.baseUrl);
        return response.data;
    }

    async addItem(item: { product_id: number, quantity: number, notes?: string }) {
        const response = await apiClient.post<Cart>(this.baseUrl, {
            body: JSON.stringify(item),
        });
        return response.data;
    }

    async updateItemQuantity(id: number, data: { quantity: number, notes?: string }) {
        const response = await apiClient.put<Cart>(`${this.baseUrl}/${id}`, {
            body: JSON.stringify(data),
        });
        return response.data;
    }

    async removeItem(id: number) {
        const response = await apiClient.delete<Cart>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async clearCart() {
        const response = await apiClient.delete<Cart>(`${this.baseUrl}`);
        return response.data;
    }

   
}

export const cartService = new CartService()