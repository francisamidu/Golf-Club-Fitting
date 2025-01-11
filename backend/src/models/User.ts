import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "consumer" | "admin";
  address?: string;
  phone?: string;
  golfClubSize?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["consumer", "admin"], default: "consumer" },
  address: { type: String },
  phone: { type: String },
  golfClubSize: { type: String },
});

UserSchema.pre("save", function (next) {
  const user = this as unknown as IUser;

  if (
    user.role === "admin" &&
    (user.address || user.phone || user.golfClubSize)
  ) {
    return next(new Error("Admins cannot have consumer-specific fields."));
  }

  next();
});

export const User = mongoose.model<IUser>("User", UserSchema);
