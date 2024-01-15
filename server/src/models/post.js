// Create the Post table fn

const createTable = (db) => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Post (
            id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL,
            title VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
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

const getPostRows = async (db) => {
  const getPostQuery = `
  SELECT Post.*, User.name, User.email
  FROM Post
  INNER JOIN User ON Post.user_id = User.id
  ORDER BY Post.id DESC;
`;

  return new Promise((resolve, reject) => {
    db.all(getPostQuery, (err, rows) => {
      if (err) {
        console.error("Error getting posts listing:", err.message);
        reject(err);
      } else {
        console.log("Posts retrieved successfully.");

        const posts = rows.map((row) => {
          const user = {
            name: row.name,
            email: row.email,
          };

          delete row.name;
          delete row.email;

          return {
            ...row,
            user,
          };
        });

        resolve(posts);
      }
    });
  });
};

module.exports = { createTable, insertPostIntoDb, getPostRows };
