const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");


const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/fake_bucket', express.static('fake_bucket'));

//ROUTES
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

//DB INSTANCE
const db = require("./services/database/sqlite");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
