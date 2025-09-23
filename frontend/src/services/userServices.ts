import type { User } from "@/interfaces/user";
import { connectingWithServer } from "./genericService";

const SUCCESSFULL_MESSAGES = {
    GET: 'Request has been successful',
};

const ERROR_MESSAGES = {
    GET: 'Request has failed',
}


export function getUserById(id: Pick<User, 'id'>) {
    return connectingWithServer<void, User>({
        method: 'get',
        url: `/users/${id}`,
        successfulMessage: SUCCESSFULL_MESSAGES.GET,
        errorMessage: ERROR_MESSAGES.GET
    })
}

