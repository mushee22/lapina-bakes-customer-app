import apiClient from "@/lib/api-client";
import { Category } from "@/type/product";

class CategoryService {

    baseUrl: string;

    constructor() {
        this.baseUrl = 'categories/';
    }

    async getCategories() {
        const response = await apiClient.get<Category[]>(this.baseUrl);
        return response.data;
    }
}

export const categoryService = new CategoryService();