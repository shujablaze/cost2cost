const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs') 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provide Name']
    },
    email:{
        type:String,
        required:[true,'Please Provide Email'],
        lowercase:true,
        unique:true,
        validate:[validator.isEmail,'Invalid Email']
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please Confirm Password'],
        validate:{
            validator:function(el){
                return this.password===el
            },
            message:'Passwords does not match'
        }
    },
    cart:[{
            productId:mongoose.Schema.ObjectId,
            category:String,
            quantity:Number
        }]
},
{
    toObject:{virtauls:true},
    toJSON:{virtauls:true}
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
    next()
})

//Create models after instance methods and querymiddlewares
const User = mongoose.model('User',userSchema)


module.exports = User

