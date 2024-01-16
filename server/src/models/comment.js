// Create the Comment table fn

const createTable = (db) => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Comment (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            post_id INTEGER,
            description TEXT,
            FOREIGN KEY (user_id) REFERENCES User(id)
            FOREIGN KEY (post_id) REFERENCES Post(id)
        );
    `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating posts table:", err.message);
    } else {
      console.log("Posts table created successfully.");
    }
  });
};

const insertCommentIntoDb = (db, { userId, postId, description }) => {

  const insertQuery = `
        INSERT INTO Comment (user_id, post_id, description)
        VALUES (?, ?, ?);
    `;

  return new Promise((resolve, reject) => {
    db.run(insertQuery, [userId, postId, description], function (err) {
      if (err) {
        console.error("Error inserting comment into db:", err.message);
        reject(err);
      } else {
        resolve("Comment inserted successfully.");
      }
    });
  });
};

module.exports = { createTable, insertCommentIntoDb };
