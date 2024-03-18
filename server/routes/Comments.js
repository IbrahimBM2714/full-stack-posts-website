const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

const { validateToken } = require("../middleware/authMiddleware");

router.get("/", async(req, res) =>{
  const comments = await Comments.findAll();
  res.json(comments)
})

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });

  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const user = req.user.username;
  comment.username = user;
  await Comments.create(comment);
  res.json(comment);
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Comments.destroy({
    where: {
      id: id
    }
  })
  res.json({message: "deleted"})
});

module.exports = router;
