import mongoose from "mongoose";
import { Photo } from "../interfaces/Photo";

export const photoSchema = new mongoose.Schema<Photo>({
  name: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});

const Photo = mongoose.model("Photo", photoSchema);

photoSchema.set("toJSON", {
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

export default Photo;
