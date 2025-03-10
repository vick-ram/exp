import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  order: mongoose.ObjectId;
  paymentMethod: string;
  transactionId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
}

const PaymentSchema: Schema<IPayment> = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", PaymentSchema);
