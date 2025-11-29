import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Modal, ModalProps, View } from "react-native";

export interface Props extends ModalProps {
  className?: string;
  children: ReactNode;
  closeIcon?: boolean;
};

export default function Dialog(props: Props) {
  const { visible, children, className, closeIcon, onRequestClose, ...rest } = props;
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}
      
      {...rest}
    >
      <View className={cn('flex-1 relative h-[100px] bg-black/15 justify-center items-center px-4', className)}>
        {children}
      </View>
    </Modal>
  );
}
