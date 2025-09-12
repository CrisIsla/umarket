export interface User {
    readonly id: number;
    name: string;
}

export interface Seller extends User{
    contact: {
        whatsapp: string,
        email: string
    }
}