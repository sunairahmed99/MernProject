const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true, 'name required'],
        unique:[true, 'category already registered']
    },
    value:{
        type:String,
        required:[true, 'name required'],
        unique:[true, 'category already registered']
    }
})

const brand = mongoose.model('brand',brandSchema)

module.exports = brand