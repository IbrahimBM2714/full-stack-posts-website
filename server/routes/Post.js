const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");

const { validateToken } = require("../middleware/authMiddleware");

router.post("/", validateToken, async (req, res) => {
  const body = req.body;
  const user = req.user.username;
  const userId = req.user.id;
  body.username = user;
  body.UserId = userId;
  await Posts.create(body);
  res.json(body);
});

router.get("/", async (req, res) => {
  const allThemPosts = await Posts.findAll({ include: [Likes] });
  res.json(allThemPosts);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const singlePost = await Posts.findByPk(id);
  res.json(singlePost);
});

router.get("/userPosts/:id", async (req, res) => {
  const id = req.params.id;
  const userPosts = await Posts.findAll({ where: { UserId: id } });
  res.json(userPosts);
});

router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json({ message: newTitle });
});

router.put("/postText", validateToken, async (req, res) => {
  const { newPostText, id } = req.body;
  await Posts.update({ psotText: newPostText }, { where: { id: id } });
  res.json({message: newPostText})
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Posts.destroy({ where: { id: id } });

  res.json({ message: "Deleted successfully" });
});

module.exports = router;
