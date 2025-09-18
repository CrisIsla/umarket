import type { Product } from "@/interfaces/product";
import { connectingWithServer, type ApiResponse } from "./genericService";

const SUCCESSFULL_MESSAGES = {
    CREATE: 'Product has been create successfully',
    GET_ALL: 'Request has been successful', 
    GET: 'Request has been successful',
    DELETE: 'Request has been successful',

};

const ERROR_MESSAGES = {
    CREATE: 'Error creating product',
    GET_ALL: 'Request has failed',
    GET: 'Request has failed',
    DELETE: 'Request has failed',

}

export function createProduct(product: Omit<Product, 'id'>){
    return connectingWithServer<Omit<Product, 'id'>,Product>({
        method: 'post',
        url: '/products',
        data: product,
        errorMessage: ERROR_MESSAGES.CREATE,
        successfulMessage: SUCCESSFULL_MESSAGES.CREATE
    })
}

export function getProducts(page: number, limit: number): Promise<ApiResponse<Product[]>>{
    return connectingWithServer<void,Product[]>({
        method: 'get',
        url: '/products',
        successfulMessage: SUCCESSFULL_MESSAGES.GET_ALL,
        errorMessage: ERROR_MESSAGES.GET_ALL,
        ...(page && limit ? { params: { page, limit } } : {}),
    })
}

export function getProductById(id: Pick<Product, 'id'>) {
    return connectingWithServer<void, Product>({
        method: 'get',
        url: `/products/${id}`,
        successfulMessage: SUCCESSFULL_MESSAGES.GET,
        errorMessage: ERROR_MESSAGES.GET
    })
}

export function deleteProductById(id: Pick<Product, 'id'>){
    return connectingWithServer<void, Product>({
        method: 'delete',
        url: `/products/${id}`,
        successfulMessage: SUCCESSFULL_MESSAGES.DELETE,
        errorMessage: ERROR_MESSAGES.DELETE
    })
}