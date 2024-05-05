const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({

    ordercode:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    totalprice:{
        type:Number,
        required:true
    },
    totalitem:{
        type:Number,
        required:true
    },
    status:{
        type:String,
    },
    product_id:{
        type:[mongoose.Schema.ObjectId],
        ref:'products'
    },
    products:[
        
            {

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
            }

        },
    ],
    
    add_id:{
        type:mongoose.Schema.ObjectId,
        ref:'shipaddress'
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    }

})

const orders = mongoose.model('orders',orderSchema)

module.exports = orders