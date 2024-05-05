const express = require('express');
const { AddShipAddress, getalladdress, deladd } = require('../Controllers/ShippingaddressController');
const { protect } = require('../Controllers/AuthController');

const shipaddressRouter = express.Router()


shipaddressRouter.route('/add').post(AddShipAddress)
shipaddressRouter.route('/get').get(getalladdress)
shipaddressRouter.route('/del/:id').delete(deladd)

module.exports = shipaddressRouter