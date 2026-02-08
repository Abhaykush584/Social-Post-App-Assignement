import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { text, image } = req.body;

  const post = await Post.create({
    user: req.user.id,
    username: req.user.username,
    text,
    image,
    likes: [],
    comments: []
  });

  res.json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.user.username)) {
    post.likes.push(req.user.username);
    await post.save();
  }

  res.json(post);
};

export const commentPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.comments.push({
    username: req.user.username,
    text: req.body.text
  });

  await post.save();
  res.json(post);
};

