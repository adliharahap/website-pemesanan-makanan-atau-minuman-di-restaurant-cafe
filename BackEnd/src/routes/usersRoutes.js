// src/routes/userRoutes.js
const express = require('express');
const { getAllUsers, postRegistrationUserToDb } = require('../controllers/RegistrationUserController');
const { postLoginUser } = require('../controllers/usersLoginController');
const { verifyToken } = require('../controllers/VerifyUserTokenController');
const { addMenutoDb } = require('../controllers/AdminAddMenu');
const { authenticateToken } = require('../controllers/authenticateToken');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/verify-token', verifyToken);

router.post('/registration', postRegistrationUserToDb);
router.post('/login', postLoginUser); 

// add menu admin
router.post('/admin/add-menu', authenticateToken, addMenutoDb);

module.exports = router;
