import { useAppState } from '@/hooks/use-app-state';
import { useOnlineManager } from '@/hooks/use-online-manager';
import {
    focusManager,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { AppStateStatus, Platform } from 'react-native';


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2
        }
    }
})

export default function ReactQueryProvider({ children }: PropsWithChildren) {
    useOnlineManager();
    useAppState(onAppStateChange);
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}


function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }