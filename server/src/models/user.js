const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database connection
const db = new sqlite3.Database('path/to/your/sqlite.db');

// Create the User table
db.run(`
    CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY,
        name TEXT(100), 
        email TEXT(191) 
    )
`);

// Export the User model
module.exports = db;
