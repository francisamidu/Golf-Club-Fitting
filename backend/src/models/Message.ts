import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  message: string;
}

const MessageSchema: Schema = new Schema({
  message: {
    type: String,
    required: true,
    default: "Welcome to the golf club",
  },
});

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
