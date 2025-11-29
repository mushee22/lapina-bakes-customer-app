import { queryClient } from "@/provider/react-query-provider";
import { useCallback, useState } from "react";

export default function useRefresh(invalidateQueryKeys?: string[]) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
      setIsRefreshing(true);
      if (invalidateQueryKeys) {
        for (const queryKey of invalidateQueryKeys) {
          await queryClient.invalidateQueries({ queryKey: [queryKey] });
        }
      }
      setIsRefreshing(false);
    }, [invalidateQueryKeys])

    return {
        isRefreshing,
        onRefresh
    }
}