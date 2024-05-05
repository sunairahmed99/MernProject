const express = require('express');
const { getallbrand, createbrand } = require('../Controllers/BrandController');

const BrandRouter = express.Router()

BrandRouter.route('/').get(getallbrand).post(createbrand)

module.exports = BrandRouter