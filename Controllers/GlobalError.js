const AppError = require("../Utils/AppError")


const handleDuplicateErrors = err =>{

    console.log(err.keyValue.title)
    if(err.keyValue.title){
        return new AppError('title already registered',404)
    }
    if(err.keyValue.email){
        return new AppError('email already registered',404)
    }
}

const handleValidationErrors = err =>{
    
    const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

const handleJWTError = err =>{

    return new AppError('Please log in again', 401);
}


const DevelopmentErrors = (err,res)=>{

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack,
    })
}

const handleWrongDetail = err =>{

    return new AppError('wrong credential',401)
}

const ProductionErrors = (err,res)=>{

    if(err.isOperational){

        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })

    }
    else{

        res.status(500).json({
            status:'error',
            message:'something went wrong'
        })

    }

}

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(process.env.DB_ENV === 'Development'){
        DevelopmentErrors(err,res)
    }
    else if(process.env.DB_ENV === 'Production'){

        let error = {...err}

        if(err.code === 11000) error = handleDuplicateErrors(error)
        if (err.name === 'ValidationError')error = handleValidationErrors(error);
        if(err.statusCode === 401) error = handleWrongDetail(error)
        if (err.name === 'JsonWebTokenError') error = handleJWTError();

        ProductionErrors(error,res)

    }    
}