import mongoose, { Schema, Document } from "mongoose";

export interface IProgress extends Document {
  fittingId: mongoose.Types.ObjectId;
  steps: {
    Submitted: boolean;
    Scheduled: boolean;
    Canceled: boolean;
    Completed: boolean;
  };
}

const ProgressSchema: Schema = new Schema({
  fittingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fitting",
    required: true,
  },
  steps: {
    Submitted: { type: Boolean, default: false },
    Scheduled: { type: Boolean, default: false },
    Canceled: { type: Boolean, default: false },
    Completed: { type: Boolean, default: false },
  },
});

export const Progress = mongoose.model<IProgress>("Progress", ProgressSchema);
