const jwt = require('jsonwebtoken');

const JWT_SECRET = 'votre_cle_secrete_jwt'; // À remplacer par une clé sécurisée dans un environnement de production

const auth = (req, res, next) => {
  // Récupérer le token du header Authorization
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
  }
  
  const token = authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ error: 'Accès refusé. Format de token invalide.' });
  }
  
  try {
    // Vérifier le token
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next(); // Autoriser l'accès à la route
  } catch (error) {
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};

module.exports = { auth, JWT_SECRET };
