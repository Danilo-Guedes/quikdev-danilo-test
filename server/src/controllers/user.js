const db = require("../services/database/sqlite");
const { insertUserIntoDb } = require("../models/user");

async function handleCreateUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: true, message : "Passwords do not match" });
  }

  try {
    await insertUserIntoDb(db, req.body);
    res.send("User created successfully");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleCreateUser };
