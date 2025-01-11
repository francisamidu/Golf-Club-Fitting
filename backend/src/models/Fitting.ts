import mongoose, { Schema, Document } from "mongoose";

export enum Status {
  Submitted = "Submitted",
  Scheduled = "Scheduled",
  Completed = "Completed",
  Canceled = "Canceled",
}
export interface IFitting extends Document {
  customerName: string;
  email: string;
  phone: string;
  fittingType: "swing analysis" | "club fitting";
  date: Date;
  time: string;
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
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ["Submitted", "Scheduled", "Completed", "Canceled"],
    default: "Submitted",
  },
  comments: { type: String },
});

export const Fitting = mongoose.model<IFitting>("Fitting", FittingSchema);
