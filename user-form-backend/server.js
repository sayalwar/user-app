const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use environment variables provided by Railway, or fallback to localhost for local testing
const db = mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'CIexmBtkqHwghaRAUCwMELXuszfzbaFC',      // add your local MySQL password here if testing locally
  database: 'railway',
  port: 58673
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      res.status(500).send('Error inserting user');
      return;
    }
    res.send('User added successfully');
  });
});

app.get('/all', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving users');
      return;
    }
    res.json(results);
  });
});

// Use Railway provided port or default to 3001 locally
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
