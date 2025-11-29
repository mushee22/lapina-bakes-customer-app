export type TransactionAddInput = {
  transactionable_type: string;
  transactionable_id: number;
  amount?: number;
  payment_mode: string;
  payment_note?: string;
  payment_discount?: number;
  transaction_date?: string;
}