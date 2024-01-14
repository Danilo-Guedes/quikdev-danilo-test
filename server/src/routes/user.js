const express = require("express");
const User = require("../models/user");
const router = express.Router();

const { handleCreateUser } = require("../controllers/user");

router.post("/create", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send("Missing required fields");
  }

  req.userData = { name, email, password, confirmPassword };

  handleCreateUser(req, res);
});

router.get("/hello2", (req, res) => {
  res.send("Hello World 2!");
});

module.exports = router;
