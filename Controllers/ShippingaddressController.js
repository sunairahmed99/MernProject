const shipaddress = require("../Models/ShipAddressSchema")
const tryCatch = require('../Utils/tryCatch');

exports.AddShipAddress = tryCatch(async(req,res,next)=>{

    let newadd = await shipaddress.create(req.body)

    res.status(200).json({
        status:"success",
        data:newadd
    })


})

exports.getalladdress = tryCatch(async(req,res,next)=>{

    let queryObj = {...req.query}
    let querystr = JSON.stringify(queryObj)

    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/, match => `$${match}`)

    let newadd = await shipaddress.find(JSON.parse(querystr))

    res.status(200).json({
        status:"success",
        data:newadd
    })
})

exports.deladd = tryCatch(async(req,res,next)=>{

    let newadd = await shipaddress.findByIdAndDelete(req.params.id)

    res.status(200).json({
        status:"success",
        data:newadd
    })
})