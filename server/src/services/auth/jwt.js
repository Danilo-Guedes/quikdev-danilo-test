const jwt = require("jsonwebtoken");


async function createUserJWT(user) {
  const { id, name, email } = user;

  const payload = {
    id,
    name,
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || 'AnRandomSaltText', {
    expiresIn: "7d",
    // expiresIn: "5000",
  });

  console.log({token});

  return token;
}

module.exports = { createUserJWT };