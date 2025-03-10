import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  addresses?: {
    street: string;
    city: string;
    country: string;
    zip: string;
  }[];
  phone?: string;
  avatar?: string;
}


const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, capitalize: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true },
      },
    ],
    phone: { type: String, required: false, maxlength: 15 },
    avatar: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
