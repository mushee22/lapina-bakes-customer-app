import { useCartContext } from "@/hooks/use-cart";
import { CartItem } from "@/type/order";
import { Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { Button, Typography } from "../elements";
import Dialog from "../elements/modal";

export default function CartItemDeleteButton({ cartItem }: { cartItem: CartItem }) {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false); 

  const { onRemoveItem, isRemovingItem } =
      useCartContext();

 const handleRemoveItem = async () => {
    if (!cartItem?.id) {
      return;
    }
    setShowRemoveDialog(false);
    onRemoveItem(cartItem?.id);
  };     

  const { width } = Dimensions.get('window');

  return (
    <>
      <Pressable
        onPress={() => setShowRemoveDialog(true)}
        className="p-2"
      >
        <Trash2 size={16} color="#ef4444" />
      </Pressable>
      
      <Dialog
        visible={showRemoveDialog}
        onRequestClose={() => setShowRemoveDialog(false)}
      >
        <View 
          className="bg-white rounded-2xl p-6"
          style={{ maxWidth: width - 48, width: width - 48 }}
        >
          <Typography.Lg className="font-semibold text-gray-800 text-center mb-3">
            Remove Item
          </Typography.Lg>
          
          <Typography.Base className="text-gray-600 text-center mb-6">
            Remove {cartItem?.product?.name} from your cart?
          </Typography.Base>

          <View className="flex-row gap-x-2">
            <Button
              className="bg-red-500 rounded-xl flex-1 h-12"
              onPress={handleRemoveItem}
              isLoading={isRemovingItem}
              disabled={isRemovingItem}
            >
              <Typography.Base className="text-white font-semibold">
                {isRemovingItem ? "Removing..." : "Remove"}
              </Typography.Base>
            </Button>
            
            <Button
              className="bg-gray-100 rounded-xl flex-1 h-12"
              onPress={() => setShowRemoveDialog(false)}
              disabled={isRemovingItem}
            >
              <Typography.Base className="text-gray-700 font-medium">
                Cancel
              </Typography.Base>
            </Button>
          </View>
        </View>
      </Dialog>
    </>
  );
}
