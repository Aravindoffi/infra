const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// MySQL connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'aravind', // Change if necessary
    database: 'form_data'
};

let db;

function handleDisconnect() {
    db = mysql.createConnection(dbConfig);

    db.connect(err => {
        if (err) {
            console.error('Error connecting to the database:', err);
            setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds
        } else {
            console.log('Connected to the MySQL database.');
        }
    });

    db.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection lost. Reconnecting...');
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// API endpoint for form submission
app.post('/submit', (req, res) => {
    const { name, age, country, hobby } = req.body;

    if (!name || !age || !country || !hobby) {
        console.error('Missing form fields');
        return res.status(400).send('Missing form fields');
    }

    const query = 'INSERT INTO submissions (name, age, country, hobby) VALUES (?, ?, ?, ?)';
    db.query(query, [name, age, country, hobby], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            return res.status(500).send('An error occurred.');
        }
        res.send('Form submitted successfully!');
    });
});

// API endpoint for updating an entry
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { age } = req.body;

    if (!age) {
        console.error('Missing age field');
        return res.status(400).send('Missing age field');
    }

    const query = 'UPDATE submissions SET age = ? WHERE id = ?';
    db.query(query, [age, id], (err, result) => {
        if (err) {
            console.error('Error updating data in the database:', err);
            return res.status(500).send('An error occurred.');
        }
        res.send('Record updated successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running at 3000/`);
});
