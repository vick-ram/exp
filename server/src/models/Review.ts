import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
  user: mongoose.ObjectId;
  product: mongoose.ObjectId;
  rating: 0.0 | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 | 3.5 | 4.0 | 4.5 | 5.0;
  comment: string;
}

const ReviewSchema: Schema<IReview> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("Review", ReviewSchema);
