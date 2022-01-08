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
    address:{
        type:String,
        maxLength:150,
        default:''
    },
    phoneNo : {
        type:Number,
        maxLength:12,
        minlength:10,
        default:null
    },
    accountType:{
        type:String,
        default : 'standard'
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
    passwordModifiedAt:Date,
    profileStatus:{
        type:String,
        default:'incomplete'
    },
    cart:[{
            _id:false,
            productId:{
                type:mongoose.Schema.ObjectId,
            },
            category:String,
            quantity:Number,
        }]
},
{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.passwordModifiedAt = Date.now() - 5000
    next()
})

userSchema.methods.hasChangedPasswordAfter = function(time){
    if(this.passwordModifiedAt ){
        const timeStamp = this.passwordModifiedAt.getTime() / 1000
        return timeStamp > time
    }
    return false
}

//Create models after instance methods and querymiddlewares
const User = mongoose.model('User',userSchema)


module.exports = User

