// Create the Post table fn

const createTable = (db) => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Post (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            title VARCHAR(100),
            description TEXT,
            file_path VARCHAR(200),
            FOREIGN KEY (user_id) REFERENCES User(id)
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

const insertPostIntoDb = (db, values) => {
  const insertPostQuery = `
        INSERT INTO Post (title, description, user_id, file_path)
        VALUES (?, ?, ?, ?);
    `;

  console.log("values antes do Db", values);

  const { title, description, userId, filePath } = values;

  return new Promise((resolve, reject) => {
    db.run(insertPostQuery, [title, description, userId, filePath], (err) => {
      if (err) {
        console.error("Error inserting post:", err.message);
        reject(err);
      } else {
        console.log("Post inserted successfully.");
        resolve();
      }
    });
  });
};

module.exports = { createTable, insertPostIntoDb };
