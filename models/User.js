const db = require('../config/database');

class User {
  static async getAllUsers() {
    const [rows] = await db.execute('SELECT * FROM users');
    // Exclure les mots de passe par sécurité si cette liste est exposée
    return rows.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
  }

  // Obtenir un utilisateur par son ID
  static async getUserById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
     if (rows.length === 0) {
        return null; // Ou lancer une erreur si préféré
    }
    // Exclure le mot de passe
    const { password, ...userWithoutPassword } = rows[0];
    return userWithoutPassword;
  }

  // Créer un utilisateur sans hacher le mot de passe
  static async createUser(name, email, hashedPassword, role = 'client') { // Recevoir le mot de passe déjà haché
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role] // Insérer le mot de passe haché
    );
    return result.insertId;
  }
  
  // Méthode pour vérifier les identifiants lors du login
  static async verifyCredentials(email, password) {
    console.log(`Vérification des identifiants pour: ${email}`);
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  
    if (rows.length === 0) {
      console.log(`Utilisateur non trouvé: ${email}`);
      throw new Error('Email ou mot de passe incorrect.');
    }
  
    const user = rows[0]; // Contient le hash du mot de passe depuis la DB
  
    // Comparer directement le mot de passe fourni avec celui stocké dans la base de données
    if (password !== user.password) {
      console.log(`Mot de passe incorrect pour: ${email}`);
      throw new Error('Email ou mot de passe incorrect.');
    }
  
    console.log(`Identifiants valides pour: ${email}`);
    // Retourner l'utilisateur sans le mot de passe hashé
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
}

module.exports = User;
