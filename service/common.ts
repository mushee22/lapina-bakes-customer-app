import apiClient from "@/lib/api-client";
import { Location } from "@/type/store";

class CommonService {
    async getLocations() {
        const response = await apiClient.get<Location[]>(`locations/delivery-boy/my-locations`);
        return response.data;
    }

    async getSettings() {
        const response = await apiClient.get<Location[]>(`settings`);
         return response.data;
    }
}

export const commonService = new CommonService();
