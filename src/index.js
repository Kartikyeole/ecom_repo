import 'dotenv/config'
import express from 'express';
import sqlite3 from 'sqlite3';
const app = express();
const PORT = process.env.PORT;

// Connect to SQLite database
const db = new sqlite3.Database('mydatabase.db');

// Create a table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT
    )
  `);

  // Insert a sample item
  const sampleItem = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
  sampleItem.run('Sample Item', 'This is a sample item in the database.');
  sampleItem.finalize();
});

// Route to fetch items from the database
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';

  db.all(query, (err, items) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(items);
    res.json(items); 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
