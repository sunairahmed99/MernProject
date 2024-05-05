const products = require("../Models/ProductSchema");
const AppError = require("../Utils/AppError");
const tryCatch = require("../Utils/tryCatch");


exports.getallproduct = tryCatch(async(req,res,next)=>{

    let queryObj = {...req.query}

    let querystr = JSON.stringify(queryObj);

    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/, match => `$${match}`)

    let query = products.find(JSON.parse(querystr))

    if(req.query.fields){

        let field = req.query.fields.split(',').join(' ')
        query = query.select(field)
    }

    if(req.query._sort){
        
        let sortby = req.query._sort.split(',').join(' ')
        query = query.sort(sortby)
    }

    let page = req.query.page * 1 || 1
    let limit = req.query.limit * 1 || 50
    let skip = (page - 1) * limit

    if(req.query.page){
        let count = await products.countDocument()

        if(skip > count) throw next(new AppError('page not found',404))

        query = query.skip(skip).limit(limit)
    }

    let newproduct = await query

    res.status(200).json({
        status:"success",
        data:newproduct
    })

})

exports.createproduct = tryCatch(async(req,res,next)=>{

    let newproduct = await products.create(req.body)

    res.status(200).json({
        status:"success",
        data:newproduct
    })
})

exports.getproduct = tryCatch(async(req,res,next)=>{

    let newproduct = await products.findById(req.params.id)

    res.status(200).json({
        status:"success",
        data:newproduct
    })
})

exports.updateproduct = tryCatch(async(req,res,next)=>{

    let newproduct = await products.findByIdAndUpdate(req.params.id,req.body,{
        runValidators:true,
        new:true
    })

    res.status(200).json({
        status:"success",
        data:newproduct
    })
})