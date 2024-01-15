const bcrypt = require('bcrypt');
// Create the User table fn
const createTable = (db) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY,
        name TEXT(100) NOT NULL, 
        email TEXT(191) NOT NULL, 
        hashed_password TEXT(191) NOT NULL
      );
    `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating users table:", err.message);
    } else {
      console.log("Users table created successfully.");
    }
  });
};

const insertUserIntoDb = async (db, user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the user's password

  const insertUserIntoDbQuery = `
    INSERT INTO User (name, email, hashed_password) VALUES (?, ?, ?)
  `;

  db.run(insertUserIntoDbQuery, [user.name, user.email, hashedPassword], (err) => {
    if (err) {
      console.error("Error creating user:", err.message);
      throw err;
    } else {
      console.log("User created successfully.");
    }
  });
};

const getUserRow = (db, user) => {
  const getUserRowQuery = `
    SELECT * FROM User WHERE email = ?
  `;

  return new Promise((resolve, reject) => {
    db.get(getUserRowQuery, [user.email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Export the User model
module.exports = { createTable, insertUserIntoDb, getUserRow };
