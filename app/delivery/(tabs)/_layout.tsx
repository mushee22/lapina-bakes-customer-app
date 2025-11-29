import { StackHeader } from "@/components/elements/stack-header";
import { CartButton, TabBarIcon } from "@/components/ui";
import { deliveryBoysBottomBar } from "@/constants";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
      <Tabs
        screenOptions={{
          tabBarStyle: {
            paddingTop: 12,
            paddingBottom: 12,
            borderTopWidth: 0.5,
            borderTopColor: "#E7DACE",
            height:65
          },
          headerShown: false,
          headerRight: () => <CartButton />,
        }}
      >
        {deliveryBoysBottomBar.map((item) => (
          <Tabs.Screen
            key={item.route}
            name={item.route}
            options={{
              title: "",
              headerTitle: item.name,
              header: () =>
                item.options.headerShown ? (
                  <StackHeader
                    title={item.name}
                    isBackButtonVisible={item.options.backButtonVisible}
                  />
                ) : null,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon
                  icon={item.icon}
                  color={focused ? "#C85A2B" : "gray"}
                  name={item.name}
                  isFocused={focused}
                />
              ),
              ...item.options,
            }}
          />
        ))}
      </Tabs>
  );
}
