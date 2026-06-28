import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;