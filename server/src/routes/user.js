const express = require("express");
const router = express.Router();

const db = require("../services/database/sqlite");
const { handleCreateUser, handleGetUser } = require("../controllers/user");
const { getUserRow } = require("../models/user");
const authMiddleware = require("../middleware/auth");

router.post("/create", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required fields" });
  }

  handleCreateUser(req, res);
});

router.get("/me", authMiddleware, (req, res) => {
  console.log({ req });
  handleGetUser(req, res);
});

module.exports = router;
0,0