import { type AxiosRequestConfig } from "axios";
import axiosSecure from "@/utils/axiosSecure";

interface ApiRequest<T> {
  method: "get" | "post" | "put" | "delete";
  url: string;
  body?: T | FormData;
  params?: {
    page: number;
    limit: number;
  };
  successfulMessage: string;
  errorMessage: string;
}

interface ApiResponse<R> {
  success: boolean;
  message: string;
  data?: R;
}

async function connectingWithServer<T, R>(
  request: ApiRequest<T>
): Promise<ApiResponse<R>> {
  try {
    const config: AxiosRequestConfig = {
      method: request.method,
      url: request.url,
      data: request.body,
      params: request.params,
    };

    const response = await axiosSecure(config);

    return {
      success: true,
      message: request.successfulMessage,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      message: request.errorMessage,
    };
  }
}

async function connectingWithServerSecure<T, R>(
  request: ApiRequest<T>
): Promise<ApiResponse<R>> {
  try {
    const response = await axiosSecure({
      method: request.method,
      url: request.url,
      data: request.body,
      params: request.params,
    });

    return {
      success: true,
      message: request.successfulMessage,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      message: request.errorMessage,
    };
  }
}

export type { ApiRequest, ApiResponse };
export { connectingWithServer, connectingWithServerSecure };
