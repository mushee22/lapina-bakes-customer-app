import Toast from 'react-native-toast-message';

export interface ToastOptions {
  title: string;
  message?: string;
  duration?: number;
}

export const showSuccessToast = ({ title, message, duration = 3000 }: ToastOptions) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    visibilityTime: duration,
  });
};

export const showErrorToast = ({ title, message, duration = 4000 }: ToastOptions) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    visibilityTime: duration,
  });
};

export const showInfoToast = ({ title, message, duration = 3000 }: ToastOptions) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    visibilityTime: duration,
  });
};

export const showWarningToast = ({ title, message, duration = 3500 }: ToastOptions) => {
  Toast.show({
    type: 'warning',
    text1: title,
    text2: message,
    visibilityTime: duration,
  });
};

// Quick shortcuts for common cart actions
export const cartToast = {
  addedItem: (itemName?: string) => showSuccessToast({
    title: `${itemName ? itemName + ' added' : 'Item added'} to cart! 🎉`,
    message: 'Check your cart to review your order',
  }),
  
  removedItem: (itemName?: string) => showSuccessToast({
    title: `${itemName ? itemName + ' removed' : 'Item removed'} from cart`,
    message: 'Your cart has been updated',
  }),
  
  updatedQuantity: () => showSuccessToast({
    title: 'Quantity updated! ✨',
    message: 'Your cart has been refreshed',
  }),
  
  clearedCart: () => showSuccessToast({
    title: 'Cart cleared! 🗑️',
    message: 'Ready to add new delicious items',
  }),
  
  orderPlaced: () => showSuccessToast({
    title: 'Order placed successfully! 🎉',
    message: 'We\'ll prepare your treats with care',
  }),
  
  orderCancelled: () => showSuccessToast({
    title: 'Order cancelled! ❌',
    message: 'You can place a new order anytime',
  }),
  
  // Error toasts
  addError: () => showErrorToast({
    title: 'Failed to add item',
    message: 'Please try again or contact support',
  }),
  
  removeError: () => showErrorToast({
    title: 'Failed to remove item',
    message: 'Please try again or contact support',
  }),
  
  updateError: () => showErrorToast({
    title: 'Failed to update quantity',
    message: 'Please check your connection and try again',
  }),
  
  clearError: () => showErrorToast({
    title: 'Failed to clear cart',
    message: 'Please try again or contact support',
  }),
  
  orderError: () => showErrorToast({
    title: 'Order placement failed',
    message: 'Please check your connection and try again',
  }),
  
  cancelError: () => showErrorToast({
    title: 'Failed to cancel order',
    message: 'Please contact customer support',
  }),
};