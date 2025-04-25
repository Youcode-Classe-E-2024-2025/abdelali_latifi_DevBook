const User = require('../models/User'); // <-- IMPORTER LE VRAI MODÈLE


class UserController {
  // Obtenir tous les utilisateurs
  static async getAllUsers() {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  }

  // Obtenir un utilisateur par son ID
  static async getUserById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  
  static async createUser(name, email, password, role = 'client') {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the plain text password
    const [result] = await db.execute(
      // --- CORRECTED SQL ---
      // Use the actual column name 'password' from your CREATE TABLE statement
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      // --- END CORRECTION ---
      // Make sure you insert the HASHED password, not the original plain text one
      [name, email, hashedPassword, role]
    );
    return result.insertId;
  }

  static async register(req, res) {
    console.log('--- Contrôleur: POST /register ---');
    console.log('Request Body:', req.body);

    if (!req.body) {
      console.error("Erreur: req.body est undefined!");
      return res.status(400).json({ message: "Corps de la requête manquant." });
    }

    const { name, email, password, role = 'client' } = req.body;

     if (!name || !email || !password) {
        return res.status(400).json({ message: 'Nom, email et mot de passe sont requis.' });
    }

    try {
      // Appelle createUser du modèle User (qui est importé)
      const userId = await User.createUser(name, email, password, role);
      console.log(`Utilisateur créé avec l'ID: ${userId}`);

      // Récupérer l'utilisateur (sans mot de passe si possible)
      const user = await User.getUserById(userId); // Méthode du modèle
      if (!user) {
        return res.status(500).json({ message: "Impossible de récupérer l'utilisateur après création." });
      }

      // Stocker dans la session (sans le mot de passe)
      const { password: _, ...userSessionData } = user;
      req.session.user = userSessionData;
      console.log('Utilisateur enregistré dans la session:', req.session.user);

      res.redirect('/userDashboard');

    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
       if (error.code === 'ER_DUP_ENTRY') {
           return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
       }
      res.status(500).json({ message: "Une erreur s'est produite lors de l'inscription." });
    }
  }

   // Méthode de login
   static async login(req, res) {
    console.log('--- Contrôleur: POST /login ---');
    console.log('Corps de la requête (login):', req.body);

     if (!req.body) {
       console.error("Erreur: req.body est undefined dans login!");
       return res.status(400).json({ message: "Corps de la requête manquant." });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Erreur: email ou mot de passe manquant');
      return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    try {
      // Appeler la méthode verifyCredentials du *modèle User* (importé en haut)
      console.log('Appel de User.verifyCredentials...');
      const user = await User.verifyCredentials(email, password); // 'User' ici référence le modèle importé

      console.log('Utilisateur vérifié:', user);

      // Enregistrer l'utilisateur dans la session
      req.session.user = user;
      console.log('Utilisateur enregistré dans la session:', req.session.user);

      // Redirection en fonction du rôle
       if (user.role === 'admin') {
           res.redirect('/adminDashboard');
       } else {
           res.redirect('/userDashboard');
       }

    } catch (error) {
      // L'erreur vient maintenant directement de User.verifyCredentials si la vérification échoue
      console.log('Erreur pendant la connexion (contrôleur):', error.message);
      return res.status(401).json({ message: error.message });
    }
  }

  // Déconnexion d'un utilisateur
  static async logout(req, res) { // Ajouter res ici pour pouvoir rediriger
    console.log('--- Contrôleur: GET /logout ---');
    try {
       // Utiliser la méthode statique logout du modèle (si elle existe)
       // ou simplement détruire la session ici.
       // La version simple est de détruire la session directement ici.
        req.session.destroy(err => {
            if (err) {
                console.error("Erreur lors de la destruction de la session:", err);
                // Envoyer une réponse d'erreur même si la déconnexion échoue
                return res.status(500).send("Erreur lors de la déconnexion");
            }
            console.log("Session détruite, redirection vers /login");
            res.redirect('/login'); // Rediriger après la destruction de la session
        });
    } catch(error) {
       console.error("Erreur inattendue lors de la déconnexion:", error);
       res.status(500).send("Erreur lors de la déconnexion");
    }
 }
 
}

module.exports = UserController; // <-- EXPORTER LA BONNE CLASSE

