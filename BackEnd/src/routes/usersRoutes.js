const express = require('express');
const { getAllUsers, postRegistrationUserToDb } = require('../controllers/RegistrationUserController');
const { postLoginUser } = require('../controllers/usersLoginController');
const { verifyToken } = require('../controllers/VerifyUserTokenController');
const { addMenutoDb, editMenuToDb, deleteMenu } = require('../controllers/AdminAddAndEditMenu');
const { authenticateToken } = require('../controllers/authenticateToken');
const { getAllMenu } = require('../controllers/getAllMenuController');
const { editRoleUser, deleteUserData } = require('../controllers/AdminEditRoleUser');
const { AddMejaToDb, getAlltable } = require('../controllers/AdminAddTable');
const { submitOrder } = require('../controllers/Waiters/submitOrder');
const { getAlldataCookfinished } = require('../controllers/Waiters/getAlldataCookfinished');
const { changeStatusOrderToServedController } = require('../controllers/Waiters/changeStatusOrderToServed');
const { getAllMyDataOrders } = require('../controllers/Waiters/getAllMyDataOrders');
const { getConfirmOrders, handleConfirmedOrder } = require('../controllers/Chef/getConfirmOrders');
const { handleDoneCooking, getCookingOrders } = require('../controllers/Chef/getCookingOrders');
const { handleUpdateStockMenu } = require('../controllers/Chef/handleUpdateStockMenu');
const { getPaymentOrders } = require('../controllers/Cashier/getPaymentOrders');
const { handlePaymentTransaksion } = require('../controllers/Cashier/handlePaymentTransaksion');
const { getTransactionHistory } = require('../controllers/getTransaktionHistory');
const { PesananSaatIni } = require('../controllers/AdminDashboard');
const { AdminPendapatan } = require('../controllers/AdminPendapatan');
const { getTableOrdersData } = require('../controllers/getTableOrdersData');
const router = express.Router();

router.get('/verify-token', verifyToken);
router.get('/get-all-menu', getAllMenu);
router.get('/get-all-table-data', getAlltable);
router.get('/getTransaktionHistory', authenticateToken, getTransactionHistory);

router.post('/registration', postRegistrationUserToDb);
router.post('/login', postLoginUser); 
router.post('/Admin/getOrdersDataTable',authenticateToken, getTableOrdersData); 

// router admin
router.get('/admin/get-all-users', authenticateToken, getAllUsers); //untuk admin nanti jangan lupa tambahkan authenticatetoken
router.post('/admin/add-menu', authenticateToken, addMenutoDb);
router.post('/admin/edit-menu', authenticateToken, editMenuToDb);
router.post('/admin/delete-menu', authenticateToken, deleteMenu);
router.post('/admin/edit-role-user', authenticateToken, editRoleUser);
router.post('/admin/delete-user', authenticateToken, deleteUserData);
router.post('/Admin/Add-table', authenticateToken, AddMejaToDb);
router.post('/Admin/Dashboard/PesananSaatIni', authenticateToken, PesananSaatIni);
router.post('/Admin/Dashboard/Pendapatan', authenticateToken, AdminPendapatan);

// router waiters
router.post('/Waiters/OrderMenu', authenticateToken, submitOrder);
router.post('/Waiters/delivery', authenticateToken, changeStatusOrderToServedController);
router.post('/Waiters/MyOrders', authenticateToken, getAllMyDataOrders);
router.get('/Waiters/OrderFinishedCooking', authenticateToken, getAlldataCookfinished);

// router chef
router.get('/Chef/getConfirmOrders', authenticateToken, getConfirmOrders);
router.get('/Chef/getCookingOrders', authenticateToken, getCookingOrders);
router.post('/Chef/handleConfirmedOrder', authenticateToken, handleConfirmedOrder);
router.post('/Chef/handleDoneCooking', authenticateToken, handleDoneCooking);
router.post('/Chef/UpdateStockMenu', authenticateToken, handleUpdateStockMenu);

// router cashier
router.get('/Cashier/getPaymentOrders', authenticateToken, getPaymentOrders);
router.post('/cashier/transaksion', authenticateToken, handlePaymentTransaksion);

module.exports = router;
