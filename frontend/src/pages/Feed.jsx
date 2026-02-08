import React, { useEffect, useState } from "react";
import API from "../services/api";


export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  const createPost = async () => {
    await API.post("/posts", { text });
    setText("");
    fetchPosts();
  };

  const like = async (id) => {
    await API.post(`/posts/${id}/like`);
    fetchPosts();
  };

  const comment = async (id) => {
    const text = prompt("Comment");
    await API.post(`/posts/${id}/comment`, { text });
    fetchPosts();
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="What's on your mind?" />
      <button onClick={createPost}>Post</button>

      {posts.map(p => (
        <div key={p._id}>
          <h4>{p.username}</h4>
          <p>{p.text}</p>
          <button onClick={() => like(p._id)}>❤️ {p.likes.length}</button>
          <button onClick={() => comment(p._id)}>💬 {p.comments.length}</button>
        </div>
      ))}
    </div>
  );
}


