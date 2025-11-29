import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    const subscriber = AppState.addEventListener('change', onChange);
    return () => {
      subscriber.remove();
    };
  }, [onChange]);
}