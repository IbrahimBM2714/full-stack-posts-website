const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

const { validateToken } = require("../middleware/authMiddleware");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  await bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json({ username: username, password: hash });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "user not found" });

  bcrypt.compare(password, user.password).then((result) => {
    if (!result) return res.json({ error: "username or password is wrong" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "Bolognese"
    );

    return res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/check", (req, res) => {
  res.json(req.user);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const userInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(userInfo);
});

router.put("/changePassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  // res.json(user)
  bcrypt.compare(oldPassword, user.password).then((result) => {
    if (!result) return res.json({ error: "Wrong password" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("changed password successfully");
    });
  });
});

module.exports = router;
