import mongoose, { Schema, Document } from "mongoose";
import { Status } from "./Fitting";

export interface IProgress extends Document {
  fittingId: string;
  status: Status;
}

const ProgressSchema: Schema = new Schema({
  fittingId: { type: String, required: true },
  status: {
    type: String,
    enum: ["Submitted", "Scheduled", "Completed", "Canceled"],
    default: "Submitted",
  },
});

export const Progress = mongoose.model<IProgress>("Progress", ProgressSchema);
