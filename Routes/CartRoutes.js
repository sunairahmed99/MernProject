const express = require('express');
const { AddtoCart, getCart, updateCart, delcart } = require('../Controllers/CartController');
const { protect } = require('../Controllers/AuthController');

const cartRouter = express.Router()


cartRouter.route('/addcart').post(AddtoCart)
cartRouter.route('/getcart').get(getCart)
cartRouter.route('/updatecart/:id').patch(updateCart)
cartRouter.route('/delcart/:id').delete(delcart)

module.exports = cartRouter