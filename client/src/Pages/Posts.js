import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { StateContext } from "../helpers/StateContext";

import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(StateContext);

  const fetchAllPost = async () => {
    await axios.get("http://localhost:8800/posts").then((response) => {
      setPosts(response.data);
    });
  };

  useEffect(() => {
    console.log("Checking the authState");
    console.log(user);
    fetchAllPost();
  }, []);

  const handleLike = async (PostId) => {
    try {
      await axios
        .post(
          "http://localhost:8800/likes",
          { PostId: PostId },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          console.log("success");

          setPosts(
            posts.map((post) => {
              if (post.id === PostId) {
                if (response.data.Liked) {
                  const newPost = { ...post, Likes: [...post.Likes, 0] };
                  console.log(newPost.Likes);
                  return newPost;
                } else {
                  const likes = post.Likes;
                  likes.pop();
                  return { ...post, Likes: likes };
                }
              } else {
                return post;
              }
            })
          );
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (postId) => {
    console.log("posti ID: " + postId);
    try {
      await axios
        .delete("http://localhost:8800/posts/" + postId, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          console.log("in then of delete");
          setPosts(
            posts.filter((post) => {
              return post.id !== postId;
            })
          );
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        margin: "50px 150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            cursor: "pointer",
            border: "1px solid black",
            marginBottom: "10px",
            borderRadius: "25px",
            width: "70%",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#712cf9",
                padding: "10px",
                borderRadius: "25px 25px 0px 0px",
              }}
              onClick={() => {
                navigate(`/posts/${post.id}`);
              }}
            >
              <h1 style={{ margin: "0px", color: "white" }}>{post.title}</h1>
            </div>
            <div
              style={{ padding: "10px" }}
              onClick={() => {
                navigate(`/posts/${post.id}`);
              }}
            >
              <p>{post.psotText}</p>
            </div>
            <div
              style={{
                backgroundColor: "#712cf9",
                borderRadius: "0px 0px 25px 25px",
                padding: "0px 10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                {user.id ? (
                  <button
                    style={{
                      margin: "10px 0px",
                      borderRadius: "25px",
                    }}
                    onClick={() => handleLike(post.id)}
                  >
                    Like :3
                  </button>
                ): null}
                {post.username === user.username && (
                  <>
                    <button
                      style={{
                        margin: "10px 0px",
                        borderRadius: "25px",
                      }}
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
                <div
                  style={{
                    margin: "10px 0px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Likes: {Object.keys(post.Likes).length}
                </div>
              </div>
              <p
                style={{
                  color: "white",
                }}
              >
                from: {post.username}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
