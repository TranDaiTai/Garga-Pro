const express = require("express");

const router = express.Router();
const authController = require('../controllers/authController')
const {authMiddleware} = require('../middleware/middleware')

router.post("/login",authController.login) ;

router.post("/refresh",authController.refreshToken) 

router.post("/logout",authMiddleware,authController.logout) 

router.get('/verify',authController.verify)

module.exports = router;
