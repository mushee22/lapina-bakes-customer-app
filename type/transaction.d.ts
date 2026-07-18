export type TransactionAddInput = {
  transactionable_type: string;
  transactionable_id: number;
  amount?: number;
  payment_mode: string;
  payment_note?: string;
  payment_discount?: number;
  transaction_date?: string;
}



export interface Transactions {
  id: number
  order_id: string
  order: any
  store_id: number
  store: Store
  amount: number
  payment_mode: string
  payment_status: string
  payment_note: any
  payment_discount: number
  collected_by: number
  collected_by_user: CollectedByUser
  added_by: number
  added_by_user: AddedByUser
  transaction_date: string
  created_at: string
  updated_at: string
}

export interface Store {
  id: number
  name: string
  slug: string
}

export interface CollectedByUser {
  id: number
  name: string
  email: string
  phone: string
}

export interface AddedByUser {
  id: number
  name: string
  email: string
  phone: string
}