import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Field is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Field is required"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    require: [true, "user id is required"],
  },
});

export default mongoose.model("blog", BlogSchema);
