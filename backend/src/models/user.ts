import mongoose from "mongoose";
import { User } from "../interfaces/User";

mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  contact: {
    whatsapp: { type: String, minLength: 8 },
    email: { type: String, required: true, unique: true },
  },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

userSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: {
      id?: string;
      _id?: mongoose.Types.ObjectId;
      __v?: number;
      password?: string;
    },
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export default User;
