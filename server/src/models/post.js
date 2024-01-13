// Create the Post table fn

const createTable = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Post (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            title VARCHAR(100),
            description TEXT,
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

module.exports = { createTable };