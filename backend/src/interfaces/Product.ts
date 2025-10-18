export interface Product {
  readonly id: string;
  title: string;
  date: string | Date;
  description: string;
  seller: mongoose.Types.ObjectId;
  photos: string[] | [];
  condition: "new" | "used";
  price: number;
  category: string;
  tags: string[];
}
