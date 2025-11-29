import { StackHeader } from "@/components/elements/stack-header";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
       name="index" 
       options={{
        headerTitle: 'Orders',
         header: ({ options  }) => <StackHeader title={'Orders'} isBackButtonVisible={false} />
       }}
      />
      <Stack.Screen 
       name="[orderId]" 
       options={{ 
        headerTitle: 'Order Details',
        header: ({ options  }) => <StackHeader title={'Order Details'} isCart={true} />
       }}
       
      />
    </Stack>
  );
}