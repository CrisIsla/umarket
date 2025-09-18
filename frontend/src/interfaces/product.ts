import type { User } from "./user"

export interface Product{
    readonly id : string,
    title: string,
    date: string | Date,
    description: string,
    seller: User['id'],
    photos: string[] | [],
    condition: "new" | "used"
}