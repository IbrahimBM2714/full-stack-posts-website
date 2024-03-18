import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Posts from "./Pages/Posts";
import SinglePost from "./Pages/SinglePost";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreatePost from "./Pages/CreatePost";
import Profile from "./Pages/Profile";
import ChangePassword from "./Pages/ChangePassword";
import Navbar from "./Pages/Navbar";

import { StateProvider } from "./helpers/StateContext";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <StateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Posts />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
