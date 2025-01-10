import mongoose, { Schema, Document } from "mongoose";
import { Status } from "./Fitting";

export interface IRequest extends Document {
  date: string;
  time: string;
  fittingId: string;
  customerName: string;
  email: string;
  phone: string;
  receivedAt: string;
  status: Status;
}

const FittingRequestSchema: Schema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  customerName: { type: String, required: true },
  fittingId: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  receivedAt: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(Status),
    required: true,
  },
});

export const FittingRequestModel =
  mongoose.models.FittingRequestModel ||
  mongoose.model<IRequest>("FittingRequest", FittingRequestSchema);
