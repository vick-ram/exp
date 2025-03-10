import mongoose, { Schema, Document } from "mongoose";

interface ICart extends Document {
  user: {
    type: mongoose.Types.ObjectId;
    ref: "User";
    required: true;
  };
  products: {
    product: mongoose.Types.ObjectId;
    quantity: Number;
  }[];
}

const CartSchema: Schema<ICart> = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", CartSchema);
