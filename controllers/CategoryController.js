const Category = require('../models/Categorie');

class CategoryController {
  // Récupérer toutes les catégories
  async index(req, res) {
    try {
      const categories = await Category.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des catégories.' });
    }
  }

  // Récupérer une seule catégorie par ID
  async show(req, res) {
    try {
      const id = req.params.id;
      const category = await Category.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ error: 'Catégorie non trouvée.' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération de la catégorie.' });
    }
  }

  // Créer une nouvelle catégorie
  async store(req, res) {
    try {
      const { name } = req.body;
      const newCategoryId = await Category.createCategory(name);
      res.status(201).json({ message: 'Catégorie créée.', id: newCategoryId });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la catégorie.' });
    }
  }

  // Mettre à jour une catégorie
  async update(req, res) {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const updated = await Category.updateCategory(id, name);
      if (updated === 0) {
        return res.status(404).json({ error: 'Catégorie non trouvée.' });
      }
      res.json({ message: 'Catégorie mise à jour.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie.' });
    }
  }

  // Supprimer une catégorie
  async destroy(req, res) {
    try {
      const id = req.params.id;
      const deleted = await Category.deleteCategory(id);
      if (deleted === 0) {
        return res.status(404).json({ error: 'Catégorie non trouvée.' });
      }
      res.json({ message: 'Catégorie supprimée.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie.' });
    }
  }
}

module.exports = new CategoryController();
