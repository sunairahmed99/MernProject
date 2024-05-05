const mongoose = require('mongoose');
const validator = require('validator');

const addressSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true, 'name required'],
    },
    phone:{
        type:String,
        required:[true, 'phone number required']
    },
    email:{
        type:String,
        required:[true, 'email required'],
        validate:[validator.isEmail, 'invalid syntax'],
    },
    country:{
        type:String,
    },
    address:{
        type:String,
        required:[true, 'address required']
    },
    city:{
        type:String,
        required:[true, 'city required'],
    },
    state:{
        type:String,
        required:[true, 'state required']
    },
    code:{
        type:String,
        required:[true, 'code required'],
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    }

})

const shipaddress = mongoose.model('shipaddress',addressSchema)

module.exports = shipaddress