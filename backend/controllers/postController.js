const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const post = await Post.create({
    user: {
      userId: req.user.id,
      username: req.user.username
    },
    text: req.body.text,
    image: req.body.image,
    likes: [],
    comments: []
  });
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.username)) {
    post.likes.push(req.user.username);
    await post.save();
  }
  res.json(post);
};

exports.commentPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({
    username: req.user.username,
    text: req.body.text
  });
  await post.save();
  res.json(post);
};
