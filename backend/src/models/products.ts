import mongoose from "mongoose";
import { Product } from "../interfaces/Product";
import { photoSchema } from "../models/photos";

mongoose.set("strictQuery", false);

const productSchema = new mongoose.Schema<Product>({
  title: String,
  date: {
    type: Date,
    default: () => Date.now(),
  },
  description: {
    type: String,
    minLength: 5,
    maxLength: 2048,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photos: {
    type: [photoSchema],
    minLength: 0,
    maxLength: 5,
  },
  condition: {
    type: String,
    validate: {
      validator: (v) => v === "new" || v === "used",
      message: (props) =>
        `Condition must be 'used' or 'new', but got '${props.value}' instead.`,
    },
  },
  price: { type: Number, min: 0 },
  category: String,
  tags: { type: [String], maxLength: 5 },
});

const Product = mongoose.model("Product", productSchema);

productSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: {
      id?: string;
      _id?: mongoose.Types.ObjectId;
      __v?: number;
    },
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default Product;
