const Book = require('../models/Book');

class BookController {
  // Obtenir la liste de tous les livres
  static async index(req, res) {
    try {
      const books = await Book.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des livres', error: error.message });
    }
  }

  // Obtenir un livre par ID
  static async show(req, res) {
    try {
      const id = req.params.id;
      const book = await Book.getBookById(id);
      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du livre', error: error.message });
    }
  }

  // Créer un nouveau livre
  static async store(req, res) {
    const { title, stock, page_count, genre, author, category_id } = req.body;
    try {
      const newBookId = await Book.createBook(title, stock, page_count, genre, author, category_id);
      res.status(201).json({ message: 'Livre créé avec succès', bookId: newBookId });
    } catch (error) {
      res.status(400).json({ message: 'Erreur lors de la création du livre', error: error.message });
    }
  }

  // Mettre à jour un livre
  static async update(req, res) {
    const id = req.params.id;
    const { title, stock, page_count, genre, author, category_id } = req.body;
    try {
      const affected = await Book.updateBook(id, title, stock, page_count, genre, author, category_id);
      if (affected === 0) {
        return res.status(404).json({ message: 'Livre non trouvé ou aucun changement' });
      }
      res.status(200).json({ message: 'Livre mis à jour avec succès' });
    } catch (error) {
      res.status(400).json({ message: 'Erreur lors de la mise à jour du livre', error: error.message });
    }
  }

  // Supprimer un livre
  static async destroy(req, res) {
    const id = req.params.id;
    try {
      const affected = await Book.deleteBook(id);
      if (affected === 0) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.status(200).json({ message: 'Livre supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du livre', error: error.message });
    }
  }
}

module.exports = BookController;
