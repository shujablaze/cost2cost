const User = require('../models/User')

exports.getPersonalInfo = async (req,res,next) => {
    try{
        const {userId} = res.locals

        const user = await User.findById(userId)
        res.status('200').render('personal_info',{data:user})

    }catch(err){
        next(err)
    }
}


exports.updateProfile = async (req,res,next) => {
    try{
        const {name,address,phoneNo} = req.body
        const {userId} = res.locals

        if(name === '' || address === '' || !phoneNo){
            next(new Error('Error: Incomplete profile'))
            return
        }
        if(phoneNo.length < 10){
            next(new Error('Error: Invalid Mobile No'))
            return
        }

        profileStatus = 'complete'

        await User.findByIdAndUpdate(userId,{name,address,phoneNo,profileStatus},{
            runValidators:true
        })

        res.status('200').json({
            status : 'ok'
        })

    }catch(err){
        next(err)
    }
}