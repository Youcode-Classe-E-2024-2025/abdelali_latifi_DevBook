const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const BookController = require('../controllers/BookController');
const CategoryController = require('../controllers/CategoryController');
const path = require('path');

// Page home
router.get('/', (req, res) => {
    res.render('home', { user: req.session.user || null });
  });
  
// Page d'inscription
router.get('/register', (req, res) => {
  res.render('register'); // Vue d'inscription
});

// Page de connexion
router.get('/login', (req, res) => {
  res.render('login'); // Vue de connexion
});

// Inscription
router.post('/register', UserController.register);


// Connexion
router.post('/login', UserController.login);

// Déconnexion
router.get('/logout', UserController.logout);

// Tableau de bord utilisateur (après inscription)
router.get('/userDashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('userDashboard', { user: req.session.user });
});


// Tableau de bord admin (après connexion admin)
router.get('/adminDashboard', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  res.render('adminDashboard', { user: req.session.user });
});


router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.store);
router.post('/categories/:id/update', CategoryController.update);
router.post('/categories/:id/delete', CategoryController.destroy);


module.exports = router;
