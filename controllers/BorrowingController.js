const Borrowing = require('../models/Borrowing');

class BorrowingController {
  // Obtenir tous les emprunts
  static async index(req, res) {
    try {
      const borrowings = await Borrowing.getAllBorrowings();
      res.status(200).json(borrowings);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des emprunts', error: error.message });
    }
  }

  // Obtenir un emprunt par ID
  static async show(req, res) {
    try {
      const id = req.params.id;
      const borrowing = await Borrowing.getBorrowingById(id);
      if (!borrowing) {
        return res.status(404).json({ message: 'Emprunt non trouvé' });
      }
      res.status(200).json(borrowing);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'emprunt', error: error.message });
    }
  }

  // Créer un nouvel emprunt
  static async store(req, res) {
    const { user_id, book_id, borrowed_at, due_date } = req.body;
    try {
      const id = await Borrowing.createBorrowing(user_id, book_id, borrowed_at, due_date);
      res.status(201).json({ message: 'Emprunt créé avec succès', borrowingId: id });
    } catch (error) {
      res.status(400).json({ message: 'Erreur lors de la création de l\'emprunt', error: error.message });
    }
  }

  // Marquer un emprunt comme retourné
  static async returnBook(req, res) {
    const id = req.params.id;
    const { returned_at } = req.body;
    try {
      const result = await Borrowing.updateBorrowingReturn(id, returned_at);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Emprunt non trouvé ou déjà retourné' });
      }
      res.status(200).json({ message: 'Livre marqué comme retourné' });
    } catch (error) {
      res.status(400).json({ message: 'Erreur lors du retour du livre', error: error.message });
    }
  }

  // Supprimer un emprunt
  static async destroy(req, res) {
    const id = req.params.id;
    try {
      const result = await Borrowing.deleteBorrowing(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Emprunt non trouvé' });
      }
      res.status(200).json({ message: 'Emprunt supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'emprunt', error: error.message });
    }
  }

  // Emprunts en retard
  static async late(req, res) {
    const currentDate = new Date().toISOString().split('T')[0];
    try {
      const lateBorrowings = await Borrowing.getLateBorrowings(currentDate);
      res.status(200).json(lateBorrowings);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des emprunts en retard', error: error.message });
    }
  }

  // Emprunts par date
  static async byDate(req, res) {
    const { date } = req.params;
    try {
      const results = await Borrowing.getBorrowingsByDate(date);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des emprunts par date', error: error.message });
    }
  }

  // Top 10 des livres empruntés par mois
  static async topBooks(req, res) {
    const { month, year } = req.params;
    try {
      const results = await Borrowing.getTopBooksByMonth(month, year);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des livres les plus empruntés', error: error.message });
    }
  }
}

module.exports = BorrowingController;
