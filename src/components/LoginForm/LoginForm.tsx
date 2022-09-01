import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context"; 
import "./LoginForm.scss"

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const submitHandler = async (username: string, password: string) => {
    let route = "";
    if (isLoginMode) {
      route = "login";
    } else {
      route = "signup";
    }
    const response = await fetch(`http://localhost:4000/${route}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.token) {
      auth.login(data.username, data.token);
      navigate("/");
    } else {
      setError(data.response);
    }
  };

  return (
    <div className="form">
      <h2>Thank you for sharing where you park!</h2>
      <h3>{isLoginMode ? "Login!" : "Sign up!"}</h3>
      <input
        type="text"
        placeholder="Enter username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => submitHandler(username, password)}>
        {isLoginMode ? "Login!" : "Create account!"}
      </button>
      <Link to={"/login"} onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode ? "Dont have an account? Sign up" : "Have an account? Sign in"}
      </Link>
      <p>{error}</p>
    </div>
  );
};

export default LoginForm;
