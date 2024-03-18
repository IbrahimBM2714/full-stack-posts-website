import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";

// import { AuthContext } from "../helpers/AuthContext";

import { StateContext } from "../helpers/StateContext";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { setUser } = useContext(StateContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    const data = {
      username: loginForm.username,
      password: loginForm.password,
    };

    try {
      axios.post("http://localhost:8800/auth/login", data).then((response) => {
        console.log(response.data);
        if (response.data.error) alert("Incorrect Credentials");
        else {
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data.id);
          // localStorage.setItem("status", true)
          console.log("response.data: " + response.data);
          setUser({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        height: "80vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>This is the login page</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "500px",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
            style={{
              height: "50px",
            }}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            style={{
              height: "50px"
            }}
          />
          <button
          style={{height: "30px"}}
          onClick={handleLogin}>Login!</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
