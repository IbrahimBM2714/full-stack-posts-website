import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    try {
      axios.post("http://localhost:8800/auth", form).then(() => {
        console.log("success");
        navigate("/login");
      });
    } catch (e) {
      console.log(e);
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
        <h1
          style={{
            textAlign: "center",
          }}
        >
          This is the the registration page
        </h1>
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
              height: "50px",
            }}
          />
          <button
            style={{
              height: "30px",
            }}
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
