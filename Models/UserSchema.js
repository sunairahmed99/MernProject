const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true, 'name required'],
    },
    email:{
        type:String,
        required:[true, 'email required'],
        unique:[true, 'email already registered'],
        validate:[validator.isEmail, 'invalid email syntax']
    },
    password:{
        type:String,
        required:[true, 'password required'],
        minlength:[4, 'password not less than 4 characters'],
        select:false,
    },
    conformpassword:{
        type:String,
        required:[true, 'password required'],
        minlength:[4, 'password not less than 4 characters'],
        validate:{
            validator:function(val){
                return val === this.password
            },
            message:'password conform password not match'
        }
    },
    role:{
        type:String,
        default:'user',
    },
    passwordchange:{
        type:Date
    },
    passresettok:String,
    passresetexp:Date
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

userSchema.virtual('id').get(function(){
    return this._id
})

userSchema.pre('save',async function(next){

    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password,12)
    this.conformpassword = undefined 
    next()
})

userSchema.methods.checkpassword = async function(newpassword,oldpassword){

    console.log(newpassword, oldpassword)
    return await bcrypt.compare(newpassword,oldpassword)
}

userSchema.methods.currentpasswordchange = function(tokentime){

    if(this.passwordchange){

        let time = parseInt(this.passwordchange.getTime()/1000,10)

        return tokentime < time
    }

    return false

    
}

userSchema.methods.createpasswordtoken = function(){

    let rantoken = crypto.randomBytes(30).toString('hex')
    this.passresettok = crypto.createHash('sha256').update(rantoken).digest('hex');
    this.passresetexp = Date.now() + 10 * 60 * 1000

    return rantoken

}

const users = mongoose.model('users',userSchema)

module.exports = users
