import { Store } from "./store";

export type User = {
  id: number;
  name: string;
  email: string;
  roles: string[];
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
  primary_store: Store;
  stores: Store[];
  stores_count: number;
  delivery_boy_statistics?: DeliveryStatistics;
  order_statistics?: OrderStatistics;
}

export type DeliveryStatistics = {
  total: number;
  completed: number;
  total_amount: number;
  pending_orders: number;
  delivered_orders: number;
}

export type OrderStatistics = {
  total_orders: number;
  completed_orders: number;
  total_amount: number;
}

export type Settings = {
  key: string,
  value: string,
}