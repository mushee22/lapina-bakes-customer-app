import useRefresh from "@/hooks/use-refresh";
import { RefreshControl } from "react-native";

export default function RefresLoader() {

    const { isRefreshing, onRefresh } = useRefresh()

    return (
        <RefreshControl
         refreshing={isRefreshing}
         onRefresh={onRefresh}
        />
    )
}