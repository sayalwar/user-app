const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Replace with your actual MySQL password
  database: 'nileshdb'
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

// ✅ This is the new route to return all data
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

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
