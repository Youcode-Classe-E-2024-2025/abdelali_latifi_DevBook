const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',      // Adresse de ton serveur MySQL
  user: 'root',           // Nom d'utilisateur MySQL
  password: '',           // Mot de passe MySQL
  database: 'books'  // Nom de ta base de données
});

const promisePool = pool.promise();

module.exports = promisePool;
