const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'aravind', // Change if necessary
    database: 'form_data'
};

const db = mysql.createConnection(dbConfig);

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');

    db.query('SELECT 1', (err, results) => {
        if (err) {
            console.error('Error running test query:', err);
        } else {
            console.log('Test query results:', results);
        }
        db.end();
    });
});
