const db = require('../config/database');

class Book {
  // Récupérer tous les livres
  static async getAllBooks() {
    const [rows] = await db.execute('SELECT * FROM books');
    return rows;
  }

  // Récupérer un livre par son ID
  static async getBookById(id) {
    const [rows] = await db.execute('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
  }

  
  // Créer un nouveau livre
  static async createBook(title, stock, page_count, genre, author, category_id) {
    const [result] = await db.execute(
      'INSERT INTO books (title, stock, page_count, genre, author, category_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, stock, page_count, genre, author, category_id]
    );
    return result.insertId; // retourne l'ID du livre inséré
  }

  // Mettre à jour un livre existant
  static async updateBook(id, title, stock, page_count, genre, author, category_id) {
    const [result] = await db.execute(
      `UPDATE books 
       SET title = ?, stock = ?, page_count = ?, genre = ?, author = ?, category_id = ? 
       WHERE id = ?`,
      [title, stock, page_count, genre, author, category_id, id]
    );
    return result.affectedRows; // retourne 1 si la mise à jour a été faite
  }

  // Supprimer un livre par son ID
  static async deleteBook(id) {
    const [result] = await db.execute(
      'DELETE FROM books WHERE id = ?',
      [id]
    );
    return result.affectedRows; // retourne 1 si la suppression a été faite
  }
}

module.exports = Book;
