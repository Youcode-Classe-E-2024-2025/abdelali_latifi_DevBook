const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Récupérer tous les livres
router.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des livres:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// Récupérer un livre par son ID
router.get('/api/books/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du livre:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    res.json(results[0]);
  });
});

// Créer un nouveau livre
router.post('/api/books', (req, res) => {
  const { author, title, description } = req.body;
  
  if (!author || !title) {
    return res.status(400).json({ error: 'L\'auteur et le titre sont requis' });
  }
  
  db.query(
    'INSERT INTO books (author, title, description) VALUES (?, ?, ?)',
    [author, title, description || ''],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la création du livre:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.status(201).json({ id: result.insertId, author, title, description });
    }
  );
});

// Mettre à jour un livre
router.put('/api/books/:id', (req, res) => {
  const id = req.params.id;
  const { author, title, description } = req.body;
  
  if (!author || !title) {
    return res.status(400).json({ error: 'L\'auteur et le titre sont requis' });
  }
  
  db.query(
    'UPDATE books SET author = ?, title = ?, description = ? WHERE id = ?',
    [author, title, description || '', id],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour du livre:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Livre non trouvé' });
      }
      res.json({ id, author, title, description });
    }
  );
});

// Supprimer un livre
router.delete('/api/books/:id', (req, res) => {
  const id = req.params.id;
  
  db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression du livre:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    res.status(204).end();
  });
});

module.exports = router;
