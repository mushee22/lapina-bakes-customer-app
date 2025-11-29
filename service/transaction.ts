import apiClient from "@/lib/api-client";
import { TransactionAddInput } from "@/type/transaction";

class TransactionService {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'transactions';
    }

    async addNewTransactions(data:TransactionAddInput) {
       const response = await apiClient.post(this.baseUrl,{
            body: JSON.stringify(data)
       })
       return response
    }
}

export const transactionService = new TransactionService()