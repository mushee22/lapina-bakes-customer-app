import { MetaData } from '@/type';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import CustomError from "./error";



export type ApiResponse<T> = {
    data: T;
    message?: string;
    status: number;
    meta?: MetaData;
}


class ApiClient {
  baseUrl: string;

  constructor(base_url="") {
    this.baseUrl = base_url;
  }

  private async request<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const token = await SecureStore.getItemAsync('token');

    const isFormData = options?.body instanceof FormData;
    const defaultHeaders: Record<string, string> = {}
    
    if(!isFormData) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    if(token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options?.headers,
      },
    };

    try {

        const path = this.baseUrl + url

        const response = await fetch(path, config);
       
        if(response.status === 401) {
          router.replace('/(auth)/login');
          throw new CustomError('Unautherized',response.status);
        }
       
        if(!response.ok) {
            console.error("Response status:", response.status, path);
            const errorData = await response.json();
            console.error(errorData);
            throw new CustomError(errorData?.message || 'Request failed', response.status, errorData?.data?.error);
        }

        const data = await response.json();
        return {
            data: data.data,
            message: data.message || 'Success',
            status: response.status,
            meta: data.meta || undefined,
        };
    }
    catch(error) {
        console.error(error);
        if(error instanceof CustomError) {
            throw error;
        }
        
        throw new CustomError('Something went wrong', 500);
    }
  }

  async get<T>(url: string, config?: RequestInit): Promise<ApiResponse<T>> {
      return this.request<T>(url, { method: "GET", ...config })
  }

  async post<T>(url: string, config?: RequestInit): Promise<ApiResponse<T>> {
      return this.request<T>(url, { method: "POST", ...config })
  }

  async put<T>(url: string, config: RequestInit): Promise<ApiResponse<T>> {
      return this.request<T>(url, { method: "PUT", ...config })
  }

  async delete<T>(url: string, config?: RequestInit): Promise<ApiResponse<T>> {
      return this.request<T>(url, { method: "DELETE", ...config })
  }
}

const apiClient = new ApiClient(process.env.EXPO_PUBLIC_API_URL || '');

export default apiClient