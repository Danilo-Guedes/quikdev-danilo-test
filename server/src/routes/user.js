const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  console.log({ req });
  console.log("body", req.body);
  console.log("name:", name);
  console.log("email:", email);
  console.log("password:", password);
  console.log("confirmPassword:", confirmPassword);
  res.send("User created successfully");
});

router.get("/hello2", (req, res) => {
  res.send("Hello World 2!");
});

module.exports = router;
