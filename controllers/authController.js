const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')

const signToken = (payload)=>{
    token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
    return token
}

exports.signupUser = (req,res,next)=>{

    const{name, email, password, passwordConfirm,} = req.body

    let newUser = new User({name,email,password,passwordConfirm})

    newUser.save()
    .then(doc=>{
        //Sign token
        const token = signToken({id:doc._id})

    //send token in a cookie
        res.cookie('jwt',token,{maxAge:60*60*1000*24,httpOnly:true})
        res.status(201).json({
            status:'success',
            data:{
                message:'Signed up user'
            }
        })
    })
    .catch(err=>{
        next(err)
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
            message:'Logged In Successfully',
            token
        }
    })
}

exports.changePassword = async (req,res,next) => {
    try{
        const {userId} = res.locals
        const {oldPassword,newPassword,reNewPassword} = req.body

        const user = await User.findById(userId).select('+password')

        if(!user || ! await bcrypt.compare(oldPassword,user.password)){
            next(new Error('Incorrect Password'))
            return
        }

        user.password = newPassword;
        user.passwordConfirm = reNewPassword

        await user.save()

        const token = signToken({id:user._id})

        //send token in a cookie
        res.cookie('jwt',token,{maxAge:60*60*1000*24,httpOnly:true})
    
        res.status(200).json({
            status:'ok',
            data:{
                message:'Password changed',
                token
            }
        })
    }catch(err){
        next(err)
    }
}

exports.checkLoginStatus = async (req,res,next)=>{
    if(req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)
            const user = await User.findById(decoded.id)

            if(!user) return next()

            if(user.hasChangedPasswordAfter(decoded.iat)) return next()

            res.locals.loggedIn = true
            res.locals.userId = decoded.id
            res.locals.username = user.name.split(' ')[0]
            res.locals.admin = user.accountType === 'admin' ? true : false 
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

            if(user.hasChangedPasswordAfter(decoded.iat)) res.redirect('/users/login')
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
