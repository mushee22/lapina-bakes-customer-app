import apiClient from "@/lib/api-client";
import { Product } from "@/type/product";



class ProductService {

    baseUrl: string;

    constructor() {
        this.baseUrl = 'products';
    }


    async getProducts(categoryId?: string, query?: string, page?: number) {
        const urlParams = new URLSearchParams()

        if (categoryId) {
            urlParams.append("category_id", categoryId)
        }

        if (query) {
            urlParams.append("search", query)
        }

        if (page) {
            urlParams.append("page", page.toString())
        }


        const response = await apiClient.get<Product[]>(this.baseUrl + '?' + urlParams.toString());

        console.log(response.meta)

        return {
            products: response.data,
            meta: response.meta || undefined,
        };
    }

    async getProduct(id: number) {
        const response = await apiClient.get<Product>(this.baseUrl + id);
        return response;
    }
}

export const productService = new ProductService()