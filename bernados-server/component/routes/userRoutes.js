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

const { 
  registerValidation, 
  loginValidation, 
  userValidation 
} = require('../middleware/validationMiddleware');

const { loginLimiter } = require('../middleware/loginLimiter');
const authentication = require('../middleware/authentication.js');
const authorize = require('../middleware/authorization.js');

router.post('/register', registerValidation, register);

router.post('/login', loginLimiter, loginValidation, login);

router.get('/', authentication, authorize('Admin'), getAllUsers);
router.get('/:id', authentication, getUserById);
router.post('/', authentication, authorize('Admin'), userValidation, createUser);
router.put('/:id', authentication, userValidation, updateUser);
router.delete('/:id', authentication, authorize('Admin'), deleteUser);

module.exports = router;