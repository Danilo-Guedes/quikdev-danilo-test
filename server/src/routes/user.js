const express = require("express");
const User = require("../models/user");
const router = express.Router();

const { handleCreateUser } = require("../controllers/user");

router.post("/create", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({error: true, message : "Missing required fields"});
  }

  handleCreateUser(req, res);
});

module.exports = router;
