const express = require('express');
<<<<<<< HEAD
const {
    register,
    login,
} = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
=======
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
>>>>>>> 9c7ea033cb6d6cf6876dba6cf1cb4d03565fbbe2
