import mongoose, { Schema, Document } from "mongoose";
import { Status } from "./Fitting";

export interface IHistory extends Document {
  customerName: string;
  date: Date | string;
  fittingId: string;
  status: Status;
  completedAt: string;
}

const HistorySchema: Schema = new Schema({
  customerName: { type: String, required: true },
  date: { type: Schema.Types.Mixed, required: true },
  fittingId: {
    type: mongoose.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(Status),
    required: true,
  },
  completedAt: { type: String, required: true },
});

export const HistoryModel =
  mongoose.models.HistoryModel ||
  mongoose.model<IHistory>("History", HistorySchema);
