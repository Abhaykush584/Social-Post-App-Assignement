import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CreatePost from "./components/CreatePost";
import PostCard from "./components/PostCard";
import ProtectedRoute from "./components/ProtectedRoute";

import Auth from "./pages/Auth";
import API from "./services/api";

function Feed() {
  const [posts, setPosts] = React.useState([]);

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <CreatePost refresh={fetchPosts} />

        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            refresh={fetchPosts}
          />
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;




