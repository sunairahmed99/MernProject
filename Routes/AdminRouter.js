const express = require('express');
const { protect, restricto } = require('../Controllers/AuthController');
const { createproduct, updateproduct } = require('../Controllers/ProductController');
const { getallproduct } = require('../Controllers/AdminController');
const { getallorder, updateorder } = require('../Controllers/OrderController');

const AdminRouter = express.Router()

AdminRouter.route('/addproduct').post(protect,restricto('admin'),createproduct)
AdminRouter.route('/updateproduct/:id').patch(protect,restricto('admin'),updateproduct)
AdminRouter.route('/getpro').get(protect,restricto('admin'),getallproduct)
AdminRouter.route('/getorder').get(protect,restricto('admin'),getallorder)
AdminRouter.route('/updateord/:id').patch(protect,restricto('admin'),updateorder)

module.exports = AdminRouter