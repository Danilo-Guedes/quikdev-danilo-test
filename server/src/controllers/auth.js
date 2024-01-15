const db = require("../services/database/sqlite");
const { getUserRow } = require("../models/user");
const bcrypt = require('bcrypt');

async function handleUserLogin(req, res) {
  const {  email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ error: true, message : "Missing required fields" });
  }

  try {
    const row = await getUserRow(db, req.body);

    console.log({row});
    
    if (!row) {
        return res.status(400).json({ error: true, message : "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, row.hashed_password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: true, message : "Invalid credentials" });
    }
    
    return res.send("User logged in successfully");


  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleUserLogin };
