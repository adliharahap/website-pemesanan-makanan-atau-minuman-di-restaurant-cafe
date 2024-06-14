const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const db = require('./src/databases');

app.use(cors());

app.get('/', (req, res) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});