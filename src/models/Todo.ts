import mongoose, { Schema, models } from "mongoose";

const todoSchema = new Schema(
  {
    title: String,
    description: String,
    completed: Boolean,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default models.Todo || mongoose.model("Todo", todoSchema);
