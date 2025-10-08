import { kMaxLength } from "buffer";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export interface UserData {
  readonly id: string;
  name: string;
  contact: {
    phoneNumber: string;
    email: string;
  };
}

const userSchema = new mongoose.Schema<UserData>({
  name: String,
  contact: {
    required: false,
    phoneNumber: { type: String, minLength: 8 },
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
