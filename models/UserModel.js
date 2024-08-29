import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Field is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Field is required"],
  },
  password: {
    type: String,
    required: [true, "Field is required"],
  },
  blog: [
    {
      type: mongoose.Types.ObjectId,
      ref: "blog",
      required: [true, "Field is required"],
    },
  ],
});

export default mongoose.model("user", UserSchema);
