const express = require("express");
const app = express();
const cors = require("cors")

const db = require("./models");

//middleware
app.use(express.json())
app.use(cors())

//Router
const postRouter = require("./routes/Post")
app.use("/posts", postRouter)

const commentsRouter = require("./routes/Comments")
app.use("/comments", commentsRouter)

const usersRouter = require("./routes/Users")
app.use("/auth", usersRouter)

const likesRouter = require("./routes/Likes")
app.use("/likes", likesRouter)

db.sequelize.sync().then(() => {
  app.listen(8800, () => {
    console.log("API is running on port 8800");
  });
});
