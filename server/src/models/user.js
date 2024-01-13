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

// Export the User model
module.exports = { createTable };
