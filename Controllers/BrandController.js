const brand = require("../Models/BrandSchema");
const tryCatch = require('../Utils/tryCatch');

exports.getallbrand = tryCatch(async(req,res,next)=>{

    let newbrand = await brand.find()

    res.status(200).json({
        status:"success",
        data:newbrand
    })
})

exports.createbrand = tryCatch(async(req,res,next)=>{

    let newbrand = await brand.create(req.body)

    res.status(200).json({
        status:"success",
        data:newbrand
    })
})