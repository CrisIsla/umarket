import type { User } from "./user"

export interface Product{
    readonly id : number,
    title: string,
    date: string | Date,
    description: string,
    seller: User['id'],
    photos: string | [],
    condition: "new" | "used"
}