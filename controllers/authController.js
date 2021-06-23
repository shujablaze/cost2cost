const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {promisify} =require('util')


const signToken = (payload)=>{
    token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
    return token
}

exports.signupUser=(req,res)=>{

    const{name, email, password, passwordConfirm,} = req.body

    let newUser = new User({name,email,password,passwordConfirm})

    newUser.save()
    .then(doc=>{
        res.status(201).json({
            status:'success',
            data:{
                message:'Signed up user'
            }
        })
    })
    .catch(err=>{
        res.status(400).json({
            status:'failed',
            data:{
                data:err
            }
        })
    })
}

exports.loginUser=async (req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email}).select('+password')
    
    
    //Checkig if username and password are correct
    if(!user||! await bcrypt.compare(password,user.password)){
        res.status(401).json({
            status:'failed',
            data:{
                message:"Username or Password Incorrect"
            }
        })
        return
    }

    //Sign token
    const token = signToken({id:user._id})

    //send token in a cookie
    res.cookie('jwt',token,{maxAge:60*60*1000*24,httpOnly:true})
    res.status(200).json({
        status:'success',
        data:{
            message:'Logged In Successfully'
        }
    })
}

exports.checkLoginStatus = async (req,res,next)=>{
    if(req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)

            const user = await User.findById(decoded.id)

            if(!user) return next()

            res.locals.loggedIn = true
            res.locals.userId = decoded.id
            res.locals.username = user.name.split(' ')[0]
        }
        catch{
            return next();
        }
    }
    next()
}

exports.protectedRoute = async (req,res,next)=>{
    if(req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)

            const user = await User.findById(decoded.id)

            if(!user) return res.redirect('/users/login')

            //Allowing access
            return next()
        }
        catch{
            return res.redirect('/users/login')
        }
    }
    res.redirect('/users/login')
}

exports.logoutUser = (req,res)=>{
    res.cookie('jwt',"",{maxAge:50000})
    res.redirect('/')
} 