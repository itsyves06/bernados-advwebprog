const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  register,
  login,
} = require('../controllers/userController');
const authentication = require('../middleware/authentication.js');
const authorize= require('../middleware/authorization.js');

router.post('/register', register);
router.post('/login', login);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;