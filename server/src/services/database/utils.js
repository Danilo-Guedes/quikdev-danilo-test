const path = require("path");

const dbPath = path.resolve(__dirname, "../../../database.db");

console.log(dbPath);

module.exports = { dbPath };
