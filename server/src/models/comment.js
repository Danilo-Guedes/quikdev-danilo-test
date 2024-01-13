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

module.exports = { createTable };
