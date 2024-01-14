// Create the User table fn
const createTable = (db) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY,
        name TEXT(100) NOT NULL, 
        email TEXT(191) NOT NULL 
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
  const insertUserIntoDbQuery = `
    INSERT INTO User (name, email) VALUES (?, ?)
  `;

  db.run(insertUserIntoDbQuery, [user.name, user.email], (err) => {
    if (err) {
      console.error("Error creating user:", err.message);
      throw err;
    } else {
      console.log("User created successfully.");
    }
  });
};

// Export the User model
module.exports = { createTable, insertUserIntoDb };
