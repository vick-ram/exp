import mongoose, { Schema, Document } from "mongoose";

interface ISubcategory extends Document {
  name: string;
  category: mongoose.ObjectId;
}

const SubcategorySchema: Schema<ISubcategory> = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISubcategory>("Subcategory", SubcategorySchema);
