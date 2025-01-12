import mongoose, { Schema, Document } from "mongoose";
import { Status } from "./Fitting";

export interface IHistory extends Document {
  customerName: string;
  date: string;
  fittingId: string;
  completedAt: string;
  status: Status;
}

const HistorySchema: Schema = new Schema({
  customerName: { type: String, required: true },
  date: { type: Schema.Types.Mixed, required: true },
  fittingId: { type: String, required: true },
  status: {
    type: String,
    enum: ["Submitted", "Scheduled", "Completed", "Canceled"],
    default: "Submitted",
  },
  completedAt: { type: String, required: true },
});

export const HistoryModel = mongoose.model<IHistory>("History", HistorySchema);
