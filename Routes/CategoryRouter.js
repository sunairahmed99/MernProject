const express = require('express');
const { getallcategory, createcategory } = require('../Controllers/CategoryController');

const CategoryRouter = express.Router()

CategoryRouter.route('/').get(getallcategory).post(createcategory)

module.exports = CategoryRouter