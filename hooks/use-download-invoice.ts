import Toast from "react-native-toast-message";

import apiClient from "@/lib/api-client";
import { File, Paths } from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import * as Sharing from 'expo-sharing';
import { fetch } from 'expo/fetch';
import { useState } from "react";

export default function useDownloadInvoice(orderId: string, orderCode: string) {
    const [isDownloadingInvoice, setIsDownloadingInvoice] = useState(false);

    const handleDownloadInvoice = async () => {
        try {
            setIsDownloadingInvoice(true)
            const URL = `${apiClient.baseUrl}orders/${orderId}/invoice/download`

            const token = await SecureStore.getItemAsync('token');

            const response = await fetch(URL, {
                headers: {
                    'Authorization' :`Bearer ${token}`
                }
            });

            const fileName = `${orderCode}.pdf`;

            const src = new File(Paths.cache, fileName);
            src.write(await response.bytes());

              if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(src.uri);
              }
            return src.uri

        } catch (error) {
            console.log(error)
            Toast.show({
                type: "error",
                text1: "Failed to download invoice",
                text2: "Please try again or contact support",
            });
        } finally {
            setIsDownloadingInvoice(false)
        }
    };

    return {
        onDownloadInvoice: handleDownloadInvoice,
        isDownloadingInvoice,
    };
}