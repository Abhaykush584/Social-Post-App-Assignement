import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    try {
      if (isLogin) {
        const res = await API.post("/auth/login", form);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        await API.post("/auth/signup", form);
        setIsLogin(true);
      }
    } catch (err) {
      alert("Auth failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>{isLogin ? "Login" : "Signup"}</h2>

      {!isLogin && (
        <input
          placeholder="Username"
          onChange={e =>
            setForm({ ...form, username: e.target.value })
          }
        />
      )}

      <input
        placeholder="Email"
        onChange={e =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={submit}>
        {isLogin ? "Login" : "Signup"}
      </button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        Switch to {isLogin ? "Signup" : "Login"}
      </p>
    </div>
  );
};

export default Auth;



