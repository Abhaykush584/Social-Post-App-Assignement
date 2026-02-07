const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    userId: String,
    username: String
  },
  text: String,
  image: String,
  likes: [String], // usernames
  comments: [
    {
      username: String,
      text: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
