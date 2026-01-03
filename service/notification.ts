import apiClient from "@/lib/api-client";

class NotificationService {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'expo-tokens';
    }

    async registerForPushNotificationsAsync(token: string, platform: string, deviceId?: string) {
        const response = await apiClient.post<{ success: '' }>(`${this.baseUrl}/register`, {
            body: JSON.stringify({
                token,
                platform,
                deviceId
            })
        });
    }

    async unregisterForPushNotificationsAsync(token: string) {
        const response = await apiClient.delete<{ success: '' }>(`${this.baseUrl}/unregister`, {
            body: JSON.stringify({
                token
            })
        });
    }
}

export const notificationService = new NotificationService()