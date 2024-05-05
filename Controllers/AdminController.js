const products = require("../Models/ProductSchema")
const tryCatch = require('../Utils/tryCatch');


exports.getallproduct = tryCatch(async(req,res,next)=>{

    let newpro = await products.find()

    res.status(200).json({
        status:"success",
        data:newpro
    })
})

exports.createproduct = tryCatch(async(req,res,next)=>{

    let newpro = await products.create(req.body);

    res.status(200).json({
        status:"success",
        data:newpro
    })
})

exports.updateproduct = tryCatch(async(req,res,next)=>{

    let newpro = await products.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        status:"success",
        data:newpro
    })
})