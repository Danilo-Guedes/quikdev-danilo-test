const db = require("../services/database/sqlite");
const { getUserRowByEmail } = require("../models/user");
const bcrypt = require("bcrypt");
const { createUserJWT } = require("../services/auth/jwt");

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!password || !email) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required fields" });
  }

  try {
    const row = await getUserRowByEmail(db, req.body);

    if (!row) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, row.hashed_password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid credentials" });
    }

    const userData = {
      id: row.id,
      name: row.name,
      email: row.email,
    };

    const token = await createUserJWT(userData);

    return res.json({
      error: false,
      message: "User logged in successfully",
      token,
      user: userData,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleUserLogin };
