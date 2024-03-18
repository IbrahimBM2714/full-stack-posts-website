import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    psotText: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePost = () => {
    console.log(form.psotText);
    try {
      axios
        .post("http://localhost:8800/posts", form, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then(() => {
          navigate("/");
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Create a post</h1>
        <div
        style={{
          display: "flex",
          flexDirection: 'column',
          width: "500px",
          gap: "10px"
        }}
        >
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            style={{
              height: "50px",
            }}
          />
          <textarea
            placeholder="Post Text"
            name="psotText"
            onChange={handleChange}
            style={{
              height: "200px"
            }}
          />
          <button
          style={{
            height: '30px'
          }}
          onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
