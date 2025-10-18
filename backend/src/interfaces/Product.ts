import mongoose from "mongoose";
import { Photo } from "../interfaces/Photo";

export interface Product {
  readonly id: string;
  title: string;
  date: string | Date;
  description: string;
  seller: mongoose.Types.ObjectId;
  photos: Photo[];
  condition: "new" | "used";
  price: number;
  category: string;
  tags: string[];
}
