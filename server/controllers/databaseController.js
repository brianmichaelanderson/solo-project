require('dotenv').config();
const db = require('../database/databasePool');

db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query:', err);
    } else {
        console.log('Current time from database:', res.rows);
    }
});
