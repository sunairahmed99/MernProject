const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    title:{
        type:String,
        required:[true, 'title required'],
        unique:[true, 'already registerd this name'],
    },
    description:{
        type:String,
        required:[true, 'description required'],
    },
    category:{
        type:String,
        required:[true, 'category required'],
    },
    brand:{
        type:String,
        required:[true, 'brand required'],
    },
    price:{
        type:Number,
        required:[true, 'price required'],
        min:[10, 'price not less than 10'],
    },
    discountPercentage:{
        type:Number,
        required:[true, 'discountPercentage required'],
        min:[0, 'not less than 0'],
        max:[100, 'not greater than 100']
    },
    rating:{
        type:Number,
        required:[true, 'rating required'],
        min:[0, 'not less than 0'],
        max:[5, 'not greater than 5'],

    },
    stock:{
        type:Number,
        required:[true, 'Stock required'],
        min:[0, 'not less than 0'],
    },
    thumbnail:{
        type:String,
        required:[true, 'thumbnail required'],
    },
    images:{
        type:[String],
        required:[true, 'images required'],
    },
    delete:{
        type:Boolean,
        default:false,
    }
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
})

productSchema.virtual('id').get(function(){
    return this._id
})

const products = mongoose.model('products',productSchema)

module.exports = products