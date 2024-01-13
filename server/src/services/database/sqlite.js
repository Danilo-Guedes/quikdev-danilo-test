const sqlite3 = require('sqlite3').verbose();
const {dbPath} = require('./utils');

console.log({sqlite3});

const db = new sqlite3.Database(dbPath,  (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
