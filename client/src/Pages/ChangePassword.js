import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const ChangePassword = () => {
  const [passwords, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPassword({ ...passwords, [e.target.name]: e.target.value });
  };

  const changePassword = async () => {
    console.log(passwords);

    await axios
      .put("http://localhost:8800/auth/changePassword", passwords, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("success");
          navigate("/posts")
        }
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Old password"
        name="oldPassword"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="New password"
        name="newPassword"
        onChange={handleChange}
      />
      <button onClick={changePassword}>Change the password</button>
    </div>
  );
};

export default ChangePassword;
