import mongoose, { Document, Schema } from "mongoose";

interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  products: {
    product: mongoose.ObjectId;
    quantity: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    country: string;
    zip: string;
  };
  orderStatus: "pending" | "processing" | "shipped" | "delivered";
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      zip: { type: String, required: true },
    },
    orderStatus: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered"],
        default: "pending",
    },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
