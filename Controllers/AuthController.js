const users = require("../Models/UserSchema");
const AppError = require("../Utils/AppError");
const tryCatch = require('../Utils/tryCatch');
const ForgotEmail = require('../Utils/Email');
let crypto = require('crypto');

const jwt = require('jsonwebtoken');

exports.getallUser = tryCatch(async(req,res,next)=>{

    let user = req.user._id
    

    let newuser = await users.findById(user)
    console.log(newuser)

    res.status(200).json({
        status:"success",
        data:newuser
    })
})

exports.RegisterUser = tryCatch(async(req,res,next)=>{

    let newuser = await users.create({

        'name':req.body.name,
        'email':req.body.email,
        'password':req.body.password,
        'conformpassword':req.body.cpassword
    })

    let token = jwt.sign({id:newuser.id},process.env.SECRETKEY,{
        expiresIn:process.env.EXPIRES_IN
    })

    res.status(200).json({
        status:"success",
        token,
        data:newuser
    })
})

exports.loginuser = tryCatch(async(req,res,next)=>{

    const{email,password} = req.body

    if(!email || !password){
        
        return next(new AppError('please provide email and password',404))
    }

    let user = await users.findOne({email:email}).select('password')

    if(!user){
        return next(new AppError('email and password wrong',401))
    }

    if(!(await user.checkpassword(password,user.password))){

        return next(new AppError('email and password wrong',401))
    }

    let userdet = await users.findById(user.id)

    let token = jwt.sign({id:user.id},process.env.SECRETKEY,{
        expiresIn:process.env.EXPIRES_IN
    })

    res.status(200).json({
        status:"success",
        token:token,
        data:userdet
    })
})

exports.protect = tryCatch(async(req,res,next)=>{

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        token = req.headers.authorization.split(' ')[1]
    }    

        if(!token){
            return next(new AppError('user not found',404))
        }

        let decode;

        try{

             decode = jwt.verify(token,process.env.SECRETKEY)

        }catch(error){
            return next(new AppError('user invalid',401))

        }
        
        let user = await users.findById(decode.id)
        
        if(!user){
            return next(new AppError('user not belong to this token',404))
        }

        if(user.currentpasswordchange(decode.iat)){

            return next(new AppError('please login again',404))
        }

        req.user = user       
        next()
})

exports.restricto = (...roles)=>{
    return((req,res,next)=>{
        if(!roles.includes(req.user.role)) 

        return next(new AppError('dont have permission to acces this route',401))

        next()
    })

}

exports.forgotpassword = tryCatch(async(req,res,next)=>{

    let email = req.body.email

    if(!email){
        return next(new AppError('please provide email',401))
    }

    let user = await users.findOne({email:email})

    if(!user){
        return next(new AppError('user not found this email',401))
    }

    if(user.role === 'admin'){
        return next(new AppError('cant forgot this email',401))
    }

    console.log(user)

    let resettoken = user.createpasswordtoken()

    await user.save({validateBeforeSave : false})

    let reseturl = `${req.protocol}://${req.get('host')}/reset/password/${resettoken}`;

    let message = `forgot password link if you want to forgot password click this link:${reseturl}`

    try{

        await ForgotEmail({

            email:user.email,
            subject:'password reset link',
            text:message
        })

        res.status(200).json({
            status:"success",
            message:'email sent successfully to your email'
        })

    }catch(error){
         console.log(error)
         user.passresettok = undefined
         user.passresetexp = undefined
         await user.save({validateBeforeSave:false})

       return next(new AppError('server down try later',500))
    }
})

exports.resetpassword = tryCatch(async(req,res,next)=>{

    let token = req.params.token

    let resettoken = crypto.createHash('sha256').update(token).digest('hex')

    let user = await users.findOne({passresettok:resettoken, passresetexp:{$gt:Date.now()}})

    if(!user){
        return next(new AppError('token invalid or expired forgotpass again',401))
    }

    user.password = req.body.password
    user.conformpassword = req.body.cpassword
    user.passresettok = undefined
    user.passresetexp = undefined
    await user.save()

    let tokenn = jwt.sign({id:user.id},process.env.SECRETKEY,{
        expiresIn:process.env.EXPIRES_IN
    })

    res.status(200).json({
        status:'success',
        tokenn,
        data:user
    })
})

