const db = require('../db');

exports.getAllbooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

exports.getBookById = (req, res) => {
  db.query('SELECT * FROM books WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

exports.createBook = (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO books (author, title, descreption) VALUES (?, ?, ?)', [author, title, descreption], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, author, title, descreption });
  });
};

exports.updateBook = (req, res) => {
  const { name, email } = req.body;
  db.query('UPDATE books SET author = ?, title = ?, descreption = ? WHERE id = ?', [author, title, descreption, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'User updated' });
  });
};

exports.deleteBook = (req, res) => {
  db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'User deleted' });
  });
};
