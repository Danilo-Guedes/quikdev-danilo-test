const sqlite3 = require('sqlite3').verbose();
const {dbPath} = require('./utils');
const User = require('../../models/user');
const Post = require('../../models/post');
const Comment = require('../../models/comment');

// console.log({sqlite3});

const db = new sqlite3.Database(dbPath,  sqlite3.OPEN_READWRITE ,(err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create all 3 tables
User.createTable(db);
Post.createTable(db);
Comment.createTable(db);

module.exports = db;
