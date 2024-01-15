const db = require("../services/database/sqlite");
const { insertUserIntoDb, getUserRowByEmail, getUserRowById } = require("../models/user");

async function handleCreateUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Passwords do not match" });
  }

  try {
    const existingUser = await getUserRowByEmail(db, { email });
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

async function handleGetUser(req, res) {
  const user = await getUserRowById(db, req.body.user);

  console.log(user);

  if (!user) {
    res.status(400).json({ error: true, message: "User Not Found" });
  } else {
    res.status(200).json(user);
  }
}

module.exports = { handleCreateUser, handleGetUser };
