import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

// import { AuthContext } from "../helpers/AuthContext";

import { StateContext } from "../helpers/StateContext";

const SinglePost = () => {
  const [post, setPost] = useState([]);
  const [commentText, setCommentText] = useState();
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const { user } = useContext(StateContext);

  const navigate = useNavigate();

  // console.log("this is the authState: ");
  // console.log(authState);

  const fetchSinglePost = async () => {
    await axios.get("http://localhost:8800/posts/" + id).then((response) => {
      setPost(response.data);
      console.log(response.data);
    });

    await axios.get("http://localhost:8800/comments/" + id).then((response) => {
      setComments(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    console.log(id);

    fetchSinglePost();
  }, []);

  const handleCommentText = (e) => {
    setCommentText(e.target.value);
  };

  const handleSendComment = async () => {
    console.log("this is hte coment text: " + commentText);

    if (commentText === undefined) {
      return alert("comment can't be empty");
    }

    const data = {
      commentContent: commentText,
      PostId: id,
    };

    try {
      await axios
        .post("http://localhost:8800/comments", data, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if (response.data.error) {
            alert("please login to add a comment");
          } else {
            setComments([...comments, response.data]);
            setCommentText("");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    try {
      axios
        .delete(`http://localhost:8800/comments/${id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then(() => {
          console.log("boom shaka laka");
        });
      setComments(
        comments.filter((comment) => {
          return comment.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updatePost = (option) => {
    if (option === 1) {
      console.log("this is the first option");
      const newTitle = prompt("Enter the new title");
      console.log("newTi: " + newTitle);
      if (newTitle !== null) {
        axios
          .put(
            "http://localhost:8800/posts/title",
            { newTitle: newTitle, id: id },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          )
          .then(() => {
            setPost({
              ...post,
              title: newTitle,
            });
          });
      }
    } else {
      const newPostText = prompt("Enter the new post text");
      if (newPostText !== null) {
        axios
          .put(
            "http://localhost:8800/posts/postText",
            { newPostText: newPostText, id: id },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          )
          .then(() => {
            setPost({
              ...post,
              psotText: newPostText,
            });
          });
      }
    }
  };

  return (
    <div
      style={{
        margin: "50px 150px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: "1px solid black",
          borderRadius: "25px",
        }}
      >
        <div
          style={{
            backgroundColor: "#712cf9",
            borderRadius: "25px 25px 0px 0px",
            color: "white",
          }}
        >
          <h1
            onClick={() => {
              if (user.username === post.username) {
                updatePost(1);
              }
            }}
          >
            {post.title}
          </h1>
        </div>
        <div
          style={{
            padding: "10px",
          }}
        >
          <p
            onClick={() => {
              if (user.username === post.username) {
                updatePost(2);
              }
            }}
          >
            {post.psotText}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#712cf9",
            textAlign: "end",
            paddingRight: "10px",
            color: "white",
            borderRadius: "0px 0px 25px 25px",
          }}
        >
          <p
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`/profile/${post.UserId}`);
            }}
          >
            By: {post.username}
          </p>
        </div>
      </div>
      <div
        style={{
          borderRadius: "25px",
          border: "1px solid black",
          paddingBottom: "20px"
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "25px 25px 0px 0px",
          }}
        >
          <h2
            style={{
              margin: "0",
              padding: "10px",
            }}
          >
            Comments
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            gap: "10px",
            backgroundColor: "white",
          }}
        >
          {comments.map((comment) => (
            <div
              style={{
                border: "1px solid black",
                borderRadius: "25px",
                // padding: "10px 20px",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  backgroundColor: "#712cf9",
                  borderRadius: "25px 25px 0px 0px",
                }}
              >
                <h3
                  style={{
                    margin: "0",
                    padding: "10px",
                    color: "white",
                  }}
                >
                  {comment.username}
                </h3>
              </div>
              <div
                style={{
                  padding: "10px",
                }}
              >
                <p>{comment.commentContent}</p>
                {comment.username === user.username && (
                  <button
                    style={{
                      borderRadius: "25px",
                    }}
                    onClick={() => {
                      handleDelete(comment.id);
                    }}
                  >
                    Delete comment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {user.status && (
          <div
            style={{
              padding: "10px",
            }}
          >
            <input
              type="text"
              placeholder="comment"
              onChange={handleCommentText}
              style={{
                padding: "10px",
                borderRadius: "25px 0px 0px 25px",
              }}
            />
            <button
              style={{
                borderRadius: "0px 25px 25px 0px",
                padding: "10px",
              }}
              onClick={handleSendComment}
            >
              Send comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
