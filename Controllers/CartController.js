const carts = require("../Models/CartSchema");
const tryCatch = require('../Utils/tryCatch');

exports.AddtoCart = tryCatch(async(req,res,next)=>{

    let newcart = await carts.create(req.body);

    res.status(200).json({
        status:"success",
        data:newcart
    })
})

exports.getCart = tryCatch(async(req,res,next)=>{

    let queryObj = {...req.query}

    let querystr = JSON.stringify(queryObj)

    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/, match => `$${match}`)

    let getcart = await carts.find(JSON.parse(querystr))

    res.status(200).json({
        status:"success",
        data:getcart
    })
})

exports.updateCart = tryCatch(async(req,res,next)=>{

    let newcart = await carts.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    console.log(newcart)

    res.status(200).json({
        status:"success",
        data:newcart
    })
})

exports.delcart = tryCatch(async(req,res,next)=>{

     let newcart = await carts.findByIdAndDelete(req.params.id)

     res.status(200).json({
        status:"success",
        data:newcart
     })
})