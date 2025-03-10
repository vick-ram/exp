import mongoose, { Schema, Document, Types } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  tags: string[];
  images: string[];
  category: mongoose.ObjectId;
  seller: mongoose.ObjectId;
  subcatergory: mongoose.ObjectId;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    tags: [{ type: String }],
    images: [{ type: String }],
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    seller: { type: Types.ObjectId, ref: "User", required: true },
    subcatergory: {
      type: mongoose.Types.ObjectId,
      ref: "Subcategory",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
