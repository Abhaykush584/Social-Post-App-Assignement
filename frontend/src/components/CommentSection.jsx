import React from "react";
import { useState } from "react";
import API from "../services/api";

const CommentSection = ({ postId, refresh }) => {
  const [text, setText] = useState("");

  const addComment = async () => {
    if (!text) return;
    await API.post(`/posts/${postId}/comment`, { text });
    setText("");
    refresh();
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        placeholder="Add comment..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={addComment}>Send</button>
    </div>
  );
};

export default CommentSection;
