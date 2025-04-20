const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bhavya@sakec_17420',
  database: 'ai_surveillance',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// User Registration Endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving user to database');
    }
    res.status(201).send('User created successfully');
  });
});

// User Login Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    if (results.length === 0) {
      return res.status(400).send('User not found');
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  });
}); 

// Get Profile Endpoint
app.get('/get-profile', (req, res) => {
  // Get token from Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Authorization: Bearer <token>
  
  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const userId = decoded.id;

    // Fetch user profile from the database
    const query = 'SELECT username, email FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database error');
      }

      if (results.length === 0) {
        return res.status(404).send('User not found');
      }

      const user = results[0];
      res.json({ username: user.username, email: user.email });
    });
  } catch (err) {
    console.error(err);
    return res.status(403).send('Invalid token');
  }
});

// Change Password Endpoint
app.post('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const userId = decoded.id;

    const query = 'SELECT password FROM users WHERE id = ?';
    db.query(query, [userId], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database error');
      }

      if (results.length === 0) {
        return res.status(404).send('User not found');
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).send('Current password is incorrect');
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
      db.query(updateQuery, [hashedNewPassword, userId], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Failed to update password');
        }

        res.send('Password updated successfully');
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(403).send('Invalid token');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
