import mongoose, { Schema, Document } from "mongoose";

export enum Status {
  Submitted = "submitted",
  Prepped = "prepped",
  Scheduled = "scheduled",
  Completed = "completed",
  Canceled = "canceled",
}
export interface IFitting extends Document {
  customerName: string;
  email: string;
  phone: string;
  fittingType: "swing analysis" | "club fitting";
  date: Date;
  status: Status;
  comments: string;
}

const FittingSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  fittingType: {
    type: String,
    enum: ["swing analysis", "club fitting"],
    required: true,
  },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["submitted", "prepped", "scheduled", "completed", "canceled"],
    default: "submitted",
  },
  comments: { type: String },
});

export const Fitting = mongoose.model<IFitting>("Fitting", FittingSchema);
