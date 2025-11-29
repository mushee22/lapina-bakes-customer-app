import { CartContext } from "@/context/cart-context";
import { useContext } from "react";

export function useCartContext() {
  return useContext(CartContext);
}