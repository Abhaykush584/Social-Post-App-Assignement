import React from "react";
import { useState } from "react";
import API from "../services/api";
import { TextField, Button, Card, CardContent } from "@mui/material";

const CreatePost = ({ refresh }) => {
  const [text, setText] = useState("");

  const submitPost = async () => {
    if (!text) return;
    await API.post("/posts", { text });
    setText("");
    refresh();
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="What's on your mind?"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 1 }}
          onClick={submitPost}
        >
          Post
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
