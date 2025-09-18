export interface User {
    readonly id: string;
    name: string;
}

export interface Seller extends User{
    contact: {
        whatsapp: string,
        email: string
    }
}