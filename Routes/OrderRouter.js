const express = require('express')
const { createOrder, getallorder, delorder, getordertoken} = require('../Controllers/OrderController')
const { protect } = require('../Controllers/AuthController')

const OrderRouter = express.Router()

OrderRouter.route('/add').post(createOrder)
OrderRouter.route('/get').get(getallorder)
OrderRouter.route('/getToken/:ordercode').get(getordertoken)
OrderRouter.route('/delorder/:id').delete(delorder)

module.exports = OrderRouter