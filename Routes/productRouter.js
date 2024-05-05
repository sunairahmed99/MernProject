const express = require('express');
const { getallproduct, createproduct, getproduct, updateproduct } = require('../Controllers/ProductController');
const { protect } = require('../Controllers/AuthController');

const productRouter = express.Router()

productRouter.route('/').get(getallproduct).post(createproduct)
productRouter.route('/:id').get(getproduct).patch(updateproduct)

module.exports = productRouter