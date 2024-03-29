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

const getPostsWithComments = async (db) => {
  const getPostQuery = `
    SELECT Post.*, User.name, User.email, Comment.description as comment
    FROM Post
    INNER JOIN User ON Post.user_id = User.id
    LEFT JOIN Comment ON Comment.post_id = Post.id
    ORDER BY Post.id DESC;
  `;

  return new Promise((resolve, reject) => {
    db.all(getPostQuery, (err, rows) => {
      if (err) {
        console.error("Error getting posts with comments:", err.message);
        reject(err);
      } else {

        const posts = rows.reduce((acc, row) => {

          const user = {
            name: row.name,
            email: row.email,
          };

          delete row.name;
          delete row.email;

          const post = acc.find((p) => p.id === row.id);

          if (post) {
            post.comments.push(row.comment);
          } else {
            acc.push({
              ...row,
              user,
              comments: row.comment ? [row.comment] : [],
            });
          }

          return acc;
        }, []);

        resolve(posts);
      }
    });
  });
};

module.exports = { createTable, insertPostIntoDb, getPostsWithComments };
