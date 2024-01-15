const db = require("../services/database/sqlite");
const { insertUserIntoDb, getUserRow } = require("../models/user");

async function handleCreateUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Passwords do not match" });
  }

  try {
    const existingUser = await getUserRow(db, { email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          error: true,
          message: "The Email provided already has a user associated",
        });
    }

    await insertUserIntoDb(db, req.body);
    res.send("User created successfully");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleCreateUser };
