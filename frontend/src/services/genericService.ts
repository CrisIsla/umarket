import { api } from "./api_config";

interface ApiRequest<T>{
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    data?: T;
    params?: {
        page: number,
        limit: number
    },
    successfulMessage: string;
    errorMessage: string;
}

interface ApiResponse<R>{
    success: boolean,
    message: string,
    data?: R;
}

async function connectingWithServer<T,R>(request: ApiRequest<T>): Promise<ApiResponse<R>>{
    try{
        const response = await api({
            method: request.method,
            url: request.url,
            data: request.data,
            params: request.params
        });

        return {
            success: true,
            message: request.successfulMessage,
            data: response.data
        }
    } catch {
        return {
            success: false,
            message: request.errorMessage,
        }
    }
}

export type {
    ApiRequest,
    ApiResponse
}
export {
    connectingWithServer
}