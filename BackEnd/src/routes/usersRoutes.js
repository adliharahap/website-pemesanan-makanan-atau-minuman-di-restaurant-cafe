const express = require('express');
const { getAllUsers, postRegistrationUserToDb } = require('../controllers/RegistrationUserController');
const { postLoginUser } = require('../controllers/usersLoginController');
const { verifyToken } = require('../controllers/VerifyUserTokenController');
const { addMenutoDb, editMenuToDb, deleteMenu } = require('../controllers/AdminAddAndEditMenu');
const { authenticateToken } = require('../controllers/authenticateToken');
const { getAllMenu } = require('../controllers/getAllMenuController');
const { editRoleUser, deleteUserData } = require('../controllers/AdminEditRoleUser');
const router = express.Router();

router.get('/verify-token', verifyToken);
router.get('/get-all-menu', getAllMenu);

router.post('/registration', postRegistrationUserToDb);
router.post('/login', postLoginUser); 

// router admin
router.get('/admin/get-all-users', authenticateToken, getAllUsers); //untuk admin nanti jangan lupa tambahkan authenticatetoken
router.post('/admin/add-menu', authenticateToken, addMenutoDb);
router.post('/admin/edit-menu', authenticateToken, editMenuToDb);
router.post('/admin/delete-menu', authenticateToken, deleteMenu);
router.post('/admin/edit-role-user', authenticateToken, editRoleUser);
router.post('/admin/delete-user', authenticateToken, deleteUserData);

module.exports = router;
