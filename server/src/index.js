const express = require('express');
const app = express();

const db = require('./services/database/sqlite');

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

