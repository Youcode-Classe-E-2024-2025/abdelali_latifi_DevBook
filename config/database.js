const mysql = require('mysql2');

// Créer la connexion à la base de données
const pool = mysql.createPool({
  host: 'localhost',      // Adresse de ton serveur MySQL
  user: 'root',           // Nom d'utilisateur MySQL
  password: '',           // Mot de passe MySQL
  database: 'books'  // Nom de ta base de données
});

// Créer une promesse pour que la connexion soit utilisée dans une approche OOP
const promisePool = pool.promise();

module.exports = promisePool;
