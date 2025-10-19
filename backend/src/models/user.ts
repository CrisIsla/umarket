import mongoose from "mongoose";
import { User } from "../interfaces/User";

mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema<User>({
  name: String,
  contact: {
    whatsapp: { type: String, minLength: 8 },
    email: String,
  },
});

const User = mongoose.model("User", userSchema);

userSchema.set("toJSON", {
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

export default User;
