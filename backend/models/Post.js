import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String,
    text: String,
    image: String,
    likes: [{ type: String }],
    comments: [
      {
        username: String,
        text: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);


