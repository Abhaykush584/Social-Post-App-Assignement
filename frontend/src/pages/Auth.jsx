import React from "react";
import { useState } from "react";
import API from "../services/api";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");

      if (isSignup) {
        await API.post("/auth/signup", form);
        setIsSignup(false);
      } else {
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password
        });
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      {isSignup && (
        <input
          placeholder="Username"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
      )}

      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSubmit}>
        {isSignup ? "Create Account" : "Login"}
      </button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Signup"}
      </p>
    </div>
  );
};

export default Auth;
