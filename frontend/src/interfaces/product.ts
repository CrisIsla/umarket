import type { Seller } from "./user";

export interface Product {
  readonly id: string;
  title: string;
  date: string | Date;
  description: string;
  seller: Seller;
  photos: string[] | [];
  condition: "new" | "used";
  price: number;
  category: string;
  tags: string[];
}

