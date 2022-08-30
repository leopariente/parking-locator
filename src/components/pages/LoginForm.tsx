import React, { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = async (username: string, password: string) => {
    let route = "";
    if (isLogin) {
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
    if(data.token) {
      console.log(data);
    }
  };

  return (
    <div>
      <h1>Hello!</h1>
      <h3>{isLogin ? "Login!" : "Sign up!"}</h3>
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
        {isLogin ? "Login!" : "Create account!"}
      </button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Dont have an account? Sign up" : "Have an account? Sign in"}
      </button>
    </div>
  );
};

export default LoginForm;
