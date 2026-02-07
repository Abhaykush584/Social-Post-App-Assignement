const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createPost,
  getPosts,
  likePost,
  commentPost
} = require("../controllers/postController");

router.get("/", getPosts);
router.post("/", auth, createPost);
router.post("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentPost);

module.exports = router;
