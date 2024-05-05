const category = require("../Models/CategorySchema");
const tryCatch = require('../Utils/tryCatch');

exports.getallcategory = tryCatch(async(req,res,next)=>{

    let newcat = await category.find()

    res.status(200).json({
        status:"success",
        data:newcat
    })
})

exports.createcategory = tryCatch(async(req,res,next)=>{

    let newcat = await category.create(req.body)

    res.status(200).json({
        status:"success",
        data:newcat
    })
})