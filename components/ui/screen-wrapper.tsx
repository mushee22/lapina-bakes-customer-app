import { cn } from "@/lib/utils";
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";

export default function ScreenWrapper({
  children,
  className,
  edges = ["top", 'left', 'right'],
}: {
  children: ReactNode;
  className?: string;
  isSafeArea?: boolean;
  edges?: Edges;
}) {

  const colorScheme = useColorScheme();

  return (
        <>
        <SafeAreaView 
         edges={edges} 
         className={cn("flex-col flex-1 px-4 pt-4 bg-secondary",className)}
         >
          {children}
        </SafeAreaView>
        <StatusBar 
         style={'light'} 
         backgroundColor={ '#000'}
        />
        </>
     
  );
}
