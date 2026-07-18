import apiClient from "@/lib/api-client";
import { TransactionAddInput, Transactions } from "@/type/transaction";

class TransactionService {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'transactions';
    }

    async addNewTransactions(data: TransactionAddInput) {
        const response = await apiClient.post(this.baseUrl, {
            body: JSON.stringify(data)
        })
        return response
    }

    async getAllTransactions(storeId: number, page?: number) {
        let url = `stores/${storeId}/transactions`;
        if (page) {
            url += `?page=${page}`;
        }

        const response = await apiClient.get<Transactions[]>(url)
        return response
    }

}

export const transactionService = new TransactionService()