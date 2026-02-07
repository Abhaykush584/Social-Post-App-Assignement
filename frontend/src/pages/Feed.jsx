import React from "react";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ width: "50%", margin: "auto", marginTop: "20px" }}>
        <CreatePost refresh={fetchPosts} />
        {posts.map(post => (
          <PostCard key={post._id} post={post} refresh={fetchPosts} />
        ))}
      </div>
    </>
  );
};

export default Feed;
