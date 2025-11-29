import { CartItem, CartSummary, Order } from "@/type/order";
import { createContext } from "react";

export type CartContextType = {
  cartItems: CartItem[];
  cartSummary?:CartSummary;
  isFetchingCart: boolean;
  isRefetchingCart: boolean;
  isUpdatingCart: boolean;
  isRemovingItem: boolean;
  isAddingItem: boolean;
  isPlacingOrder: boolean;
  isCancellingOrder: boolean;

  onAddItem: (item: { product_id: number, quantity: number, notes?: string }) => void;
  onUpdateItemQuantity: (id: number, data: { quantity: number, notes?: string }) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  getCartItem: (id: number) => CartItem | undefined;
  onCheckoutFromCart: () => void;
  onCancelOrder: (id: number) => void;
  
  // Order success modal state
  showOrderSuccess: boolean;
  lastOrder: Order | null;
  onCloseOrderSuccess: () => void;
};


export const CartContext = createContext<CartContextType>({
  cartItems: [],
  isFetchingCart: false,
  isRefetchingCart: false,
  isUpdatingCart: false,
  isRemovingItem: false,
  isAddingItem: false,
  isPlacingOrder: false,
  isCancellingOrder: false,
  cartSummary: {
    total_items: 0,
    subtotal: 0,
    currency: "PHP",
  },
  onAddItem: () => {},
  onUpdateItemQuantity: () => {},
  onRemoveItem: () => {},
  onClearCart: () => {},
  getCartItem: (id: number) => undefined,
  onCheckoutFromCart: () => {},
  onCancelOrder: () => {},
  
  // Order success modal default values
  showOrderSuccess: false,
  lastOrder: null,
  onCloseOrderSuccess: () => {},
});