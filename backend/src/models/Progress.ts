import mongoose, { Schema, Document } from "mongoose";

export interface IProgress extends Document {
  fittingId: mongoose.Types.ObjectId;
  steps: {
    submitted: boolean;
    prepped: boolean;
    scheduled: boolean;
    canceled: boolean;
    completed: boolean;
  };
}

const ProgressSchema: Schema = new Schema({
  fittingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fitting",
    required: true,
  },
  steps: {
    submitted: { type: Boolean, default: false },
    prepped: { type: Boolean, default: false },
    scheduled: { type: Boolean, default: false },
    canceled: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
  },
});

export const Progress = mongoose.model<IProgress>("Progress", ProgressSchema);
