import { ScreenWrapper, Typography } from "@/components/elements";
import { StackHeader } from "@/components/elements/stack-header";
import { CURRENCY } from "@/constants";
import { themeConfig } from "@/constants/theme-config";
import { useAuthContext } from "@/hooks/use-auth-context";
import useRefresh from "@/hooks/use-refresh";
import { transactionService } from "@/service/transaction";
import { Transactions } from "@/type/transaction";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Calendar, Clock, Store } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";

export default function TransactionsListPage() {
    const { user } = useAuthContext();
    const { isRefreshing, onRefresh } = useRefresh(["store-transactions"]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["store-transactions", user?.stores?.[0]?.id],
        queryFn: async ({ pageParam }) => {
            if (!user?.stores?.[0]?.id) return { data: [], meta: undefined };
            const response = await transactionService.getAllTransactions(user.stores[0].id, pageParam);
            return {
                data: response.data,
                meta: response.meta,
            };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const meta = lastPage.meta;
            if (meta && meta.current_page < meta.last_page) {
                return meta.current_page + 1;
            }
            return undefined;
        },
        enabled: !!user?.stores?.[0]?.id,
    });

    const transactions = data?.pages.flatMap((page) => page.data) || [];

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    header: () => (
                        <StackHeader
                            title="Transactions"
                            isCart={false}
                            isBackButtonVisible={true}
                        />
                    ),
                }}
            />
            <ScreenWrapper edges={["bottom", "left", "right"]} className="">
                <View className="mb-4">
                    <Typography.Lg className="font-bold text-gray-800">
                        Transactions
                    </Typography.Lg>
                    <Typography.Sm className="text-gray-600 mt-1">
                        Transactions history
                    </Typography.Sm>
                </View>
                {isLoading ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <ActivityIndicator size="large" color={themeConfig.colors.brand} />
                    </View>
                ) : (
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <TransactionCard transaction={item} />}
                        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                        refreshControl={
                            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                        }
                        ListFooterComponent={
                            isFetchingNextPage ? (
                                <View className="py-4">
                                    <ActivityIndicator size="small" color={themeConfig.colors.brand} />
                                </View>
                            ) : null
                        }
                        ListEmptyComponent={
                            <View className="flex-1 items-center justify-center py-20">
                                <Typography.Base className="text-gray-400">No transactions found</Typography.Base>
                            </View>
                        }
                    />
                )}
            </ScreenWrapper>
        </>
    );
}

function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function formatTime(date: Date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
}

function TransactionCard({ transaction }: { transaction: Transactions }) {
    const dateObj = transaction.transaction_date ? new Date(transaction.transaction_date) : new Date(transaction.created_at);
    const formattedDate = formatDate(dateObj);
    const formattedTime = formatTime(dateObj);
    const status = transaction.payment_status?.toLowerCase() || "";
    const isSuccess = ["paid", "fully_paid"].includes(status);
    const isPending = status === "pending";

    return (
        <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 mb-3">
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                    <View className="w-10 h-10 rounded-full bg-orange-100 items-center justify-center mr-3">
                        <Store size={20} color={themeConfig.colors.brand} />
                    </View>
                    <View className="flex-1">
                        <Typography.Base className="font-bold text-gray-800" numberOfLines={1}>
                            {transaction.store?.name || "Unknown Store"}
                        </Typography.Base>
                        <View className="flex-row items-center mt-1">
                            <Calendar size={12} color="#666" />
                            <Typography.Sm className="text-gray-500 ml-1 mr-2">
                                {formattedDate}
                            </Typography.Sm>
                            <Clock size={12} color="#666" />
                            <Typography.Sm className="text-gray-500 ml-1">
                                {formattedTime}
                            </Typography.Sm>
                        </View>
                    </View>
                </View>
                <View className="items-end">
                    <Typography.Lg className="font-bold text-primary">
                        {CURRENCY}{transaction.amount}
                    </Typography.Lg>
                </View>
            </View>

            {(transaction.payment_note || (transaction.payment_discount && transaction.payment_discount > 0)) ? (
                <View className="bg-gray-50 p-2 rounded-lg mb-3">
                    {transaction.payment_discount && transaction.payment_discount > 0 ? (
                        <View className="flex-row items-center justify-between mb-1">
                            <Typography.Sm className="text-gray-500">Discount:</Typography.Sm>
                            <Typography.Sm className="font-medium text-gray-800">
                                {CURRENCY}{transaction.payment_discount}
                            </Typography.Sm>
                        </View>
                    ) : null}
                    {transaction.payment_note ? (
                        <View>
                            <Typography.Sm className="text-gray-700 italic">
                                {transaction.payment_note}
                            </Typography.Sm>
                        </View>
                    ) : null}
                </View>
            ) : null}

            <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                <View className="flex-row items-center">
                    {transaction.payment_mode ? (
                        <Typography.Sm className="text-gray-500 uppercase font-bold mr-2 text-xs">
                            {transaction.payment_mode}
                        </Typography.Sm>
                    ) : null}

                </View>
                {transaction.collected_by_user?.name ? (
                    <Typography.Sm className="text-gray-500 text-xs">
                        Collected by: {transaction.collected_by_user.name}
                    </Typography.Sm>
                ) : null}
            </View>
        </View>
    );
}