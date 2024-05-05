const express = require('express');
const { RegisterUser, loginuser, protect, getallUser, forgotpassword, resetpassword } = require('../Controllers/AuthController');

const UserRouter = express.Router()


UserRouter.route('/register').post(RegisterUser)
UserRouter.route('/login').post(loginuser)
UserRouter.route('/getuser').get(protect,getallUser)
UserRouter.route('/forgot/password').post(forgotpassword)
UserRouter.route('/reset/password/:token').patch(resetpassword)

module.exports = UserRouter