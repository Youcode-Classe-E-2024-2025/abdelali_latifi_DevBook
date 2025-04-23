const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');

router.get('/', BookController.getAllbooks);
router.get('/:id', BookController.getBookById);
router.post('/', BookController.createBook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

module.exports = router;
