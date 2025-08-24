import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 1,
      maxlength: 200
    },
    description: {
      type: String,
      default: ""
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

/**
 * Make JSON match your frontend shape:
 * - expose "id" instead of "_id"
 * - include createdAt / updatedAt
 */
todoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

export const Todo = mongoose.model("Todo", todoSchema);
