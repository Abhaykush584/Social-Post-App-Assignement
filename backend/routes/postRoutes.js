import express from "express";
import {
  createPost,
  getPosts,
  likePost,
  commentPost
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentPost);

export default router;

