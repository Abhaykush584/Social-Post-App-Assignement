import React from "react";
import API from "../services/api";
import CommentSection from "./CommentSection";
import { Card, CardContent, Button } from "@mui/material";

const PostCard = ({ post, refresh }) => {
  const likePost = async () => {
    await API.post(`/posts/${post._id}/like`);
    refresh();
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <h4>{post.user.username}</h4>
        <p>{post.text}</p>

        <Button onClick={likePost}>
          ❤️ {post.likes.length}
        </Button>

        <span>💬 {post.comments.length}</span>

        {post.comments.map((c, i) => (
          <p key={i}>
            <b>{c.username}</b>: {c.text}
          </p>
        ))}

        <CommentSection postId={post._id} refresh={refresh} />
      </CardContent>
    </Card>
  );
};

export default PostCard;
