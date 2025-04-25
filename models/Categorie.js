const db = require('../config/database');

class Category {
  // Récupérer toutes les catégories
  static async getAllCategories() {
    const [rows] = await db.execute('SELECT * FROM categories');
    return rows;
  }

  // Récupérer une catégorie par son ID
  static async getCategoryById(id) {
    const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

   // Créer une nouvelle catégorie
   static async createCategory(name) {
    const [result] = await db.execute(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );
    return result.insertId; // retourne l'ID de la catégorie insérée
  }

  // Mettre à jour une catégorie existante
  static async updateCategory(id, name) {
    const [result] = await db.execute(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );
    return result.affectedRows; // retourne 1 si la mise à jour a été faite
  }

  // Supprimer une catégorie par son ID
  static async deleteCategory(id) {
    const [result] = await db.execute(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
    return result.affectedRows; // retourne 1 si la suppression a été faite
  }
 
}

module.exports = Category;
