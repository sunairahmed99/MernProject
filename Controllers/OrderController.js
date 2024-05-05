const orders = require("../Models/OrderSchema");
const tryCatch = require('../Utils/tryCatch');


exports.createOrder = tryCatch(async(req,res,next)=>{

    let neworder = await orders.create(req.body);

    res.status(200).json({
        status:"success",
        data:neworder
    })
})

exports.getallorder = tryCatch(async(req,res,next)=>{

    let query =  orders.find()

    if(req.query){

        let queryObj = {...req.query}

        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/, match => `$${match}`)

         query = orders.find(JSON.parse(queryStr)).populate('product_id').populate('add_id')
    }

    let neworder = await query
    
    res.status(200).json({
        status:"success",
        data:neworder
    })
})

exports.getordertoken = tryCatch(async(req,res,next)=>{

    let order = req.params.ordercode
    console.log(order)

    let neword = await  orders.findOne({ordercode:order})
    console.log(neword)

    res.status(200).json({
        status:"success",
        data:neword
    })
})

exports.updateorder = tryCatch(async(req,res,next)=>{

    let neword = await orders.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        status:"success",
        data:neword
    })
})

exports.delorder = tryCatch(async(req,res,next)=>{

  
    let delord = await orders.findByIdAndDelete(req.params.id)

    res.status(200).json({
        status:"success",
        data:delord
    })
})
