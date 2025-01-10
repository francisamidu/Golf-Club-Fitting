import mongoose, { Schema, Document } from "mongoose";
import { Status } from "./Fitting";

export interface ISchedule extends Document {
  date: string;
  customerName: string;
  status: Status;
}

const ScheduleSchema: Schema = new Schema({
  date: { type: String, required: true },
  customerName: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(Status),
    required: true,
  },
});

export const Schedule =
  mongoose.models.Schedule ||
  mongoose.model<ISchedule>("Schedule", ScheduleSchema);
