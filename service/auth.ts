import apiClient from "@/lib/api-client";
import { LoginResponse } from "@/type/auth";
import { User } from "@/type/user";

class AuthService {
    async login(data:{email: string, password: string}) {
        const body = JSON.stringify(
            {
                email: data.email,
                password: data.password
            }
        )
        const response = await apiClient.post<LoginResponse>(`login`,{
            body
        })
        return response;
    }

    async getUser() {
        const response = await apiClient.get<User>(`profile`);
        return response;
    }

}

export const authService = new AuthService();
