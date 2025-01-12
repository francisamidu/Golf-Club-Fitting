import mongoose, { Schema, Document } from "mongoose";
import { Status } from "./Fitting";

export interface ISchedule extends Document {
  fittingId: string;
  date: string;
  time: string;
  customerName: string;
  status: Status;
}

const ScheduleSchema: Schema = new Schema({
  date: { type: String, required: true },
  fittingId: { type: String, required: true },
  time: { type: String, required: true },
  customerName: { type: String, required: true },
  status: {
    type: String,
    enum: ["Submitted", "Scheduled", "Completed", "Canceled"],
    default: "Submitted",
  },
});

export const Schedule = mongoose.model<ISchedule>("Schedule", ScheduleSchema);
