import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { StateContext } from "../helpers/StateContext";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    id: 0,
  });
  const [posts, setPosts] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(StateContext);

  useEffect(() => {
    axios.get("http://localhost:8800/auth/" + id).then((response) => {
      setUserDetails({
        username: response.data.username,
        id: response.data.id,
      });
    });
    axios
      .get("http://localhost:8800/posts/userPosts/" + id)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      });
  }, []);

  return (
    <>
      <div>Username: {userDetails.username} </div>

      {user.username === userDetails.username && (
        <button onClick={() => navigate("/changePassword")}>
          Change password
        </button>
      )}

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.psotText}</p>
        </div>
      ))}
    </>
  );
};

export default Profile;
