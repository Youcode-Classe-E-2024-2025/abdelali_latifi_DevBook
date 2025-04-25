const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

// Inscription d'un nouvel utilisateur
router.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validation des entrées
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    
    // Vérifier si l'utilisateur existe déjà
    db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], async (err, results) => {
      if (err) {
        console.error('Erreur de base de données:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      
      if (results.length > 0) {
        return res.status(409).json({ error: 'Cet email ou nom d\'utilisateur existe déjà' });
      }
      
      // Hasher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Insérer le nouvel utilisateur
      db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error('Erreur lors de la création de l\'utilisateur:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
          }
          
          // Créer et assigner un token
          const token = jwt.sign({ id: result.insertId, username }, JWT_SECRET, { expiresIn: '1h' });
          
          res.status(201).json({
            message: 'Utilisateur créé avec succès',
            token
          });
        }
      );
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Connexion d'un utilisateur
router.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation des entrées
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }
    
    // Vérifier si l'utilisateur existe
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Erreur de base de données:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }
      
      const user = results[0];
      
      // Vérifier le mot de passe
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }
      
      // Créer et assigner un token
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      
      res.json({
        message: 'Connexion réussie',
        token
      });
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Vérifier si l'utilisateur est connecté
router.get('/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ authenticated: false });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ authenticated: false });
  }
  
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    res.json({ 
      authenticated: true, 
      user: { 
        id: verified.id, 
        username: verified.username 
      } 
    });
  } catch (error) {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;
