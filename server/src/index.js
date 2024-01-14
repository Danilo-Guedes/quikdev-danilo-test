const express = require("express");
const cors = require("cors");
const app = express();

//middlewares

app.use(cors());

const db = require("./services/database/sqlite");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/api/hello", (req, res) => {
  return res.send("Hello World!");
});
