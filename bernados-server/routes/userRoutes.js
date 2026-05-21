const express = require('express');
// import functions from the user controller
const { getUsers, createUser, updateUser, deleteUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Routes for base path ('/users')
router.route('/')
  .get(getUsers)
  .post(createUser);

// Routes for individual user modifications ('/users/:id')
router.route('/:id')
  .put(updateUser)
  .delete(deleteUser);

// Route for handling user login authentication ('/users/login')
router.post('/login', loginUser);

module.exports = router;