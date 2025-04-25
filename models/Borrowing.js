const db = require('../config/database');

class Borrowing {
  // Obtenir tous les emprunts
  static async getAllBorrowings() {
    const [rows] = await db.execute('SELECT * FROM borrowings');
    return rows;
  }

  // Obtenir un emprunt par ID
  static async getBorrowingById(id) {
    const [rows] = await db.execute('SELECT * FROM borrowings WHERE id = ?', [id]);
    return rows[0];
  }

  // Créer un nouvel emprunt
  static async createBorrowing(user_id, book_id, borrowed_at, due_date) {
    const [result] = await db.execute(
      'INSERT INTO borrowings (user_id, book_id, borrowed_at, due_date) VALUES (?, ?, ?, ?)',
      [user_id, book_id, borrowed_at, due_date]
    );
    return result.insertId;
  }

  // Mettre à jour un emprunt (ex: retourner le livre)
  static async updateBorrowingReturn(id, returned_at) {
    const [result] = await db.execute(
      'UPDATE borrowings SET returned_at = ?, status = ? WHERE id = ?',
      [returned_at, 'returned', id]
    );
    return result;
  }

  // Supprimer un emprunt
  static async deleteBorrowing(id) {
    const [result] = await db.execute('DELETE FROM borrowings WHERE id = ?', [id]);
    return result;
  }

  // Requête personnalisée : emprunts en retard non retournés
  static async getLateBorrowings(currentDate) {
    const [rows] = await db.execute(
      'SELECT * FROM borrowings WHERE returned_at IS NULL AND due_date < ?',
      [currentDate]
    );
    return rows;
  }

  // Requête personnalisée : emprunts d'une date spécifique
  static async getBorrowingsByDate(date) {
    const [rows] = await db.execute(
      'SELECT * FROM borrowings WHERE DATE(borrowed_at) = ?',
      [date]
    );
    return rows;
  }

  // Requête personnalisée : top 10 livres empruntés durant un mois
  static async getTopBooksByMonth(month, year) {
    const [rows] = await db.execute(
      `SELECT book_id, COUNT(*) AS borrow_count 
       FROM borrowings 
       WHERE MONTH(borrowed_at) = ? AND YEAR(borrowed_at) = ? 
       GROUP BY book_id 
       ORDER BY borrow_count DESC 
       LIMIT 10`,
      [month, year]
    );
    return rows;
  }
}

module.exports = Borrowing;
