const express = require('express');
const listsController = require('../controllers/listController');
const router = express.Router();
const { authenticate } = require('../controllers/authController');

router.get('/', authenticate, listsController.getAllLists);
router.get('/:id', authenticate, listsController.getListById);
router.post('/', authenticate, listsController.createList);
router.put('/:id', authenticate, listsController.updateList);
router.delete('/:id', authenticate, listsController.deleteList);

module.exports = router;
