const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({

    title:{
        type:String,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
    },
    brand:{
        type:String,
    },
    price:{
        type:Number,
        min:[10, 'price not less than 10'],
    },
    discountPercentage:{
        type:Number,
        min:[0, 'not less than 0'],
        max:[100, 'not greater than 100']
    },
    rating:{
        type:Number,
        min:[0, 'not less than 0'],
        max:[5, 'not greater than 5'],

    },
    stock:{
        type:Number,
        min:[0, 'not less than 0'],
    },
    thumbnail:{
        type:String,
    },
    images:{
        type:[String],
    },
    delete:{
        type:Boolean
    },
    proid:{
        type:String,
    },
    qty:{
        type:Number,
    },
    
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    }
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
})

cartSchema.virtual('id').get(function(){
    return this._id
})

const carts = mongoose.model('carts',cartSchema)

module.exports = carts