const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

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

const category = mongoose.model('category',categorySchema)

module.exports = category